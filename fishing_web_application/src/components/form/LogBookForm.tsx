"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { format } from "date-fns";
import { Calendar as CalendarIcon, CheckIcon, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";

const logBookFormSchema = z.object({
  userName: z
    .string()
    .min(3, "A felhasználónév minimum 3 karaktert hosszúságú!"),
  fisheryAuthority: z
    .string()
    .min(5, "Az egyesület neve minimun 5 karakter hosszúságú!"),
  expiresDate: z.date({
    required_error: "Az érvényességi idő kitöltése kötelező!",
  }),
  baseFee: z
    .string()
    .regex(new RegExp("^[0-9]*$"), "Csak számot tartalmazhat a mező!")
    .min(1, "Az alapdíj kitöltése kötelező!"),
  eszh: z
    .string()
    .regex(new RegExp("^[0-9]*$"), "Csak számot tartalmazhat a mező!")
    .min(
      1,
      "A mező kitöltése kötelező! Ha a felhasználó mentesül a fizetés alól, akkor 0-értéket írjon be!"
    ),
  currency: z.string().min(3, "A valuta mező kitöltése kötelező!"),
  userFirstName: z.string().min(2, "A vezetéknév megadása kötelező!"),
  userLastName: z.string().min(2, "Az utónév megadása kötelező!"),
  birthDate: z.date({ required_error: "A születési dátum megadása kötelező!" }),
});

type user = {
  id: string
  userName: string
 
};

type authority= {
  fisheryAuthorityId: string,
  fisheryAuthorityName: string,
};


type currency = {
  currencyId: string;
  currencyName: string;
  currencyAcronyms: string;
}

const LogBookForm = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [authorities, setAuthorities] = useState<authority[]>([]);
  const [currencies, setCurrencies] = useState<currency[]>([]);
  const { toast } = useToast();

  type formSchema = z.infer<typeof logBookFormSchema>;

  const defaultValues: Partial<formSchema> = {
    userName: "",
    fisheryAuthority: "",
    expiresDate: undefined,
    baseFee: "",
    eszh: "",
    currency: "",
    userFirstName: "",
    userLastName: "",
    birthDate: undefined,
  };

  const form = useForm<formSchema>({
    resolver: zodResolver(logBookFormSchema),
    defaultValues,
  });

  const submitHandler = async (values: z.infer<typeof logBookFormSchema>) => {
    const data = {
      userName: values.userName,
      fisheryAuthority: values.fisheryAuthority,
      expiresDate: values.expiresDate,
      baseFee: values.baseFee,
      eszh: values.eszh,
      currency: values.currency,
      userFirstName: values.userFirstName,
      userLastName: values.userLastName,
      birthDate: values.birthDate,
    };

    console.log(data)

    
    const response = await fetch("/api/logBookHandler", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Sikertelen létrehozás!",
        description: (await response.json()).message,
        className: "w-[90%]",
      });
    } else {
      toast({
        variant: "default",
        title: "Sikeres létrehozás",
        description: (await response.json()).message,
        className: "bg-green-600 w-[90%] text-white",
      });
    }
  
  };

  
  useEffect(() => {
    async function getRequest() {
      const response = await fetch("/api/currencyHandler");
      const data = await response.json();
      setCurrencies(data.currencies)
    }

    getRequest();
  }, []);

  const getUserHandler = (value: any) => {
    const getRequest = async () => {
      const response = await fetch("/api/user?userName=" + value);
      const data = await response.json();
      if (response.ok) {
        setUsers(data.users);
      }
    };

    getRequest();
  };
  
  const getAuthorityHandler = (value: any) => {
    const getRequest = async () => {
      const response = await fetch("/api/fisheryAuthorityHandler?authorityName=" + value);
      const data = await response.json();
      if (response.ok) {
        setAuthorities(data.authorities);
        
      }
    };

    getRequest();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="space-y-8 w-full sm:w-[450px]"
        >
          <div>
            <h2 className="text-lg font-medium pb-2">Felhasználói adatok</h2>
            <Separator />
          </div>
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Felhasználónév</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {
                        field.value
                          ? users.find(
                              (user) => user.id=== field.value
                            )?.userName
                          : "Válasszon felhasználót"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] h-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Felhasználó keresése..."
                        className="h-9"
                        onValueChange={getUserHandler}
                      />
                      <CommandEmpty>Nem található vízterület</CommandEmpty>
                      <CommandGroup className="overflow-scroll">
                        {users.map((user) => (
                          <CommandItem
                            value={user.userName}
                            key={user.id}
                            onSelect={() => {
                              form.setValue("userName", user.id);
                            }}
                          >
                            {user.userName}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                user.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userFirstName"
            render={({ field }) => (
              <FormItem className="pr-2">
                <FormLabel className="text-slate-800">Vezeték név</FormLabel>
                <FormControl>
                  <Input placeholder="Horgász" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="userLastName"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-slate-800">Utónév</FormLabel>
                <FormControl>
                  <Input placeholder="Árpád" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-slate-800">
                  Születési idő
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="birthDate"
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>Születési idő</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className=" w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      onSelect={field.onChange}
                      fromYear={1960}
                      toYear={2030}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Ez a dátum jelöli a fogási napló érvényességi idejét
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <h2 className="text-lg font-medium pb-2">Fogási napló adatai</h2>
            <Separator />
          </div>
          <FormField
            control={form.control}
            name="fisheryAuthority"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Egyesület</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {
                        field.value
                          ? authorities.find(
                              (authority) => authority.fisheryAuthorityId=== field.value
                            )?.fisheryAuthorityName
                          : "Válasszon egyesületet"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] h-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Egyesület keresése..."
                        className="h-9"
                        onValueChange={getAuthorityHandler}
                      />
                      <CommandEmpty>Nem található egyesület</CommandEmpty>
                      <CommandGroup className="overflow-scroll">
                        {authorities.map((authority) => (
                          <CommandItem
                            value={authority.fisheryAuthorityName}
                            key={authority.fisheryAuthorityId}
                            onSelect={() => {
                              form.setValue("fisheryAuthority", authority.fisheryAuthorityId);
                            }}
                          >
                            {authority.fisheryAuthorityName}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                authority.fisheryAuthorityId === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expiresDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-slate-800">
                  Érvényességi idő
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>Érvényességi idő</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className=" w-auto p-0">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      onSelect={field.onChange}
                      fromYear={1960}
                      toYear={2030}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Ez a dátum jelöli a fogási napló érvényességi idejét
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="baseFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800">Alap díj</FormLabel>
                <FormControl>
                  <Input placeholder="5500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eszh"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800">ESZH díj</FormLabel>
                <FormControl>
                  <Input placeholder="5500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Valuta</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="valuta" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[200px]">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.currencyId} value={currency.currencyId}>
                        {currency.currencyAcronyms + " - " + currency.currencyName}
                      </SelectItem>
                    ))}
                    </SelectContent>
                  </Select>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button type="submit" className="w-full sm:w-auto ">
            Létrehozás
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
};

export default LogBookForm;
