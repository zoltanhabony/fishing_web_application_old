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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const authorityFormSchema = z.object({
  fisheryAuthorityName: z
    .string()
    .min(5, "Az egyesület nevének minimun 5 karakter kell tartalmazzon"),
  taxId: z
    .string()
    .regex(new RegExp("^[0-9]*$"), "Csak számot tartalmazhat")
    .min(11, "A mezőnek 11 számot kell tartalmaznia")
    .max(12),
  cityName: z
    .string()
    .min(3, "A város nevének minimum 3 karater husszúságúnak kell lennie"),
  streetName: z.string().min(1, "A közterület nevét kötelező kitölteni!"),
  streetNumber: z.string().min(1, "A közterület számát kötelező kitölteni!"),
  floor: z.string().optional(),
  door: z.string().optional(),
});

type city = {
  cityId: string;
  postalCode: number;
  cityName: string;
};

const FisheryAuthorityForm = () => {
  const { toast } = useToast();

  const [cities, setCities] = useState<city[]>([]);

  type formSchema = z.infer<typeof authorityFormSchema>;

  const defaultValues: Partial<formSchema> = {
    fisheryAuthorityName: "",
    taxId: "",
    cityName: "",
    streetName: "",
    streetNumber: "",
    floor: "",
    door: "",
  };

  const form = useForm<formSchema>({
    resolver: zodResolver(authorityFormSchema),
    defaultValues,
  });

  const submitHandler = async (values: z.infer<typeof authorityFormSchema>) => {
    const data = {
      fisheryAuthorityName: values.fisheryAuthorityName,
      taxId: values.taxId,
      cityName: values.cityName,
      streetName: values.streetName,
      streetNumber: values.streetNumber,
      floor: values.floor ? values.floor : undefined,
      door: values.door ? values.door : undefined,
    };

    console.log(data)

    const response = await fetch("/api/fisheryAuthorityHandler", {
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

    form.reset()
  };

  const getCityHandler = (value: any) => {
    const getRequest = async () => {
      const response = await fetch("/api/cityHandler?cityName=" + value);
      const data = await response.json();
      if (response.ok) {
        setCities(data.cities);
      }
    };

    getRequest();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="space-y-8 w-full sm:w-[500px]"
        >
          <FormField
            control={form.control}
            name="fisheryAuthorityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Egyesület név</FormLabel>
                <FormControl>
                  <Input placeholder="Egysület neve" {...field} />
                </FormControl>
                <FormDescription>
                  Ez a név fog szerepelni a fogási napló egyesület nevének
                  meghatározásánál.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adószám</FormLabel>
                <FormControl>
                  <Input placeholder="xxxxxxxxyzz" {...field} />
                </FormControl>
                <FormDescription>
                  A jelenleg használt adószám formátum, a 11 számjegyből áll.
                  <br />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cityName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Település neve</FormLabel>
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
                        {field.value
                          ? cities.find((city) => city.cityId === field.value)
                              ?.cityName
                          : "Válasszon települést"}

                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] h-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Település keresése..."
                        className="h-9"
                        onValueChange={getCityHandler}
                      />
                      <CommandEmpty>Nem található település</CommandEmpty>
                      <CommandGroup className="overflow-scroll">
                        {cities.map((city) => (
                          <CommandItem
                            value={city.cityName}
                            key={city.cityId}
                            onSelect={() => {
                              form.setValue("cityName", city.cityId);
                            }}
                          >
                            {city.postalCode + " - " + city.cityName}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                city.cityId === field.value
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
            name="streetName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Közterület neve</FormLabel>
                <FormControl>
                  <Input placeholder="Kis utca" {...field} />
                </FormControl>
                <FormDescription>
                  A közterület nevét a közterület jellegével adja meg
                  <br />
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-between">
            <FormField
              control={form.control}
              name="streetNumber"
              render={({ field }) => (
                <FormItem className="pr-2">
                  <FormLabel>Közterület száma</FormLabel>
                  <FormControl>
                    <Input placeholder="32" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem className="pr-2">
                  <FormLabel>Emelet</FormLabel>
                  <FormControl>
                    <Input placeholder="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="door"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Ajtó</FormLabel>
                  <FormControl>
                    <Input placeholder="10" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full sm:w-auto ">
            Létrehozás
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
};

export default FisheryAuthorityForm;
