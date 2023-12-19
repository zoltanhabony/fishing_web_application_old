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
import {
  Calendar as CalendarIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createTournamentFormSchema } from "@/data/schema";
import { Textarea } from "../ui/textarea";



const createTournamentForm = () => {
  const { toast } = useToast();

  type formSchema = z.infer<typeof createTournamentFormSchema>;

  const defaultValues: Partial<formSchema> = {
    tournamentName: "",
    tournamentDescription: "",
    deadline: undefined,
    startDate: undefined,
    maxParticipants: "",
    tournamentType: "",
    fishType: "",
  };

  const form = useForm<formSchema>({
    resolver: zodResolver(createTournamentFormSchema),
    defaultValues,
  });

  const submitHandler =  async(
    values: z.infer<typeof createTournamentFormSchema>
  ) => {
    const data = {
      tournamentName: values.tournamentName,
      tournamentDescription: values.tournamentDescription,
      deadline: values.deadline,
      startDate: values.startDate,
      maxParticipants: values.maxParticipants,
      tournamentType: values.tournamentType,
      fishType: values.fishType,
    };
  
    console.log(data);

    const response = await fetch("/api/tournamentHandler", {
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
  
  

  return (
    <>
      <Form {...form}>
      <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="space-y-8 w-full sm:w-[500px]"
        >
          <FormField
            control={form.control}
            name="tournamentName"
            render={({ field }) => (
              <FormItem className="pr-2">
                <FormLabel className="text-slate-800">Versenynév</FormLabel>
                <FormControl>
                  <Input placeholder="A nagy verseny" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tournamentDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Versenyleírás</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A versenyek lehetőséget adnak a horgászoknak, hogy megmérettessék magukat..."
                    className="resize-none h-[300px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Itt adhatod meg a verseny leírását tartalmát.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-slate-800">Jelentkezési határidő</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="deadline"
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
                        <span>Jelentkezési határidő</span>
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
                        date <= new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Ez a dátum jelöli a jelentkezés határidejét
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-slate-800">Verseny kezdete</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="startDate"
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
                        <span>Kezdési időpont</span>
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
                        date <= new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Ez a dátum jelöli a verseny kezdési időpontját
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxParticipants"
            render={({ field }) => (
              <FormItem className="pr-2">
                <FormLabel className="text-slate-800">Résztvevők száma</FormLabel>
                <FormControl>
                  <Input placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="tournamentType"
            render={({ field }) => (
              <FormItem className="pr-2">
                <FormLabel className="text-slate-800">Versenykategória</FormLabel>
                <FormControl>
                  <Input placeholder="Bojlis, bármilyen, stb..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fishType"
            render={({ field }) => (
              <FormItem className="pr-2">
                <FormLabel className="text-slate-800">Haltípus</FormLabel>
                <FormControl>
                  <Input placeholder="Ponty, bármilyen, stb..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full sm:w-auto ">
            Létrehozás
          </Button>
        </form>
      </Form>
    </>
  );
};

export default  createTournamentForm;
