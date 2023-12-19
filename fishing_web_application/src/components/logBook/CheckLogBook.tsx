"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { cn } from "@/lib/utils";
import CheckCatchTable from "../dataTables/checkCatchTable/CheckCatchTable";



const checkLogBookFormSchema = z.object({
  userName: z
    .string()
    .min(3, "A felhasználónév minimum 3 karaktert hosszúságú!"),
});

type user = {
  id: string;
  userName: string;
};

const CheckLogBook = () => {
  const [users, setUsers] = useState<user[]>([]);
  const [catches, setCatches] = useState<any[]>([]);
  type formSchema = z.infer<typeof checkLogBookFormSchema>;
  const defaultValues: Partial<formSchema> = {
    userName: "",
  };
  const form = useForm<formSchema>({
    resolver: zodResolver(checkLogBookFormSchema),
    defaultValues,
  });

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

  const submitHandler = async (values: z.infer<typeof checkLogBookFormSchema>) => {
    console.log("Aha")
    const response = await fetch("/api/logBookHandler/checkLogBook?userId="+values.userName);
      if (response.ok) {
        const data = await response.json();
        const transformedData: any = [];
        data.catches.forEach((fish: any) => {
          transformedData.push({
            id: fish.catchId,
            fishName: fish.fish.fishName,
            fishImageUrl: fish.fish.fishImageUrl,
            date: new Date(fish.createdAt),
            weight: fish.weight + " " + fish.weightUnit,
            weightUnit: fish.weightUnit,
            length: fish.length + " " + fish.lengthUnit,
            lengthUint: fish.lengthUnit,
            waterAreaCode: fish.waterArea.waterAreaCode,
            waterAreaName: fish.waterArea.waterAreaName,
          });
        });
        setCatches(transformedData);
      }else{
        setCatches([])
      }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="space-y-8 w-full sm:w-[450px]"
        >
          <div>
            <h2 className="text-lg font-medium pb-2">Napló ellenőrzése</h2>
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
         <Button type="submit" className="w-full sm:w-auto">
            Ellenőrzés
          </Button>
        </form>
      </Form>
      <CheckCatchTable data={catches}/>
    </>
    
  );
};

export default CheckLogBook