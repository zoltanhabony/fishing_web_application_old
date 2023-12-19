import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Toaster } from "../ui/toaster";
import { updateUserByAdminFormSchema } from "@/data/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";




interface UpdateUserByAdminFormProps  {
    userId: string
    userName: string,
    email:string,
    firstName: string,
    lastName: string,
    expiresDate: Date,
    haveAccessToPost: boolean,
    haveAccessToTournament: boolean,
    haveAccessToFishing: boolean,
}

const UpdateUserByAdminForm : React.FC<UpdateUserByAdminFormProps> = ({userId, userName, email, firstName, lastName, expiresDate, haveAccessToPost, haveAccessToTournament, haveAccessToFishing}) => {
  
  type formSchema = z.infer<typeof updateUserByAdminFormSchema>;
  const router = useRouter()

  const defaultValues: Partial<formSchema> = {
    userId: userId,
    userName: userName,
    email: email,
    firstName: firstName,
    lastName: lastName,
    expiresDate: expiresDate,
    haveAccessToPost: haveAccessToPost,
    haveAccessToTournament: haveAccessToFishing,
    haveAccessToFishing: haveAccessToTournament,
  };

  const submitHandler = async (
    values: z.infer<typeof updateUserByAdminFormSchema>
  ) => {
    const data = {
        userId: userId,
        userName: values.userName,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        expiresDate: values.expiresDate,
        haveAccessToPost: values.haveAccessToPost,
        haveAccessToTournament: values.haveAccessToFishing,
        haveAccessToFishing: values.haveAccessToTournament,
      };
      
      const response = await fetch("/api/user/userDataAccess", {
        method: "PUT",
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

  const form = useForm<formSchema>({
    resolver: zodResolver(updateUserByAdminFormSchema),
    defaultValues,
  });
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="space-y-8 w-full sm:w-[500px]"
        >
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem className="pr-2 w-full">
                  <FormLabel>Felhasználónév</FormLabel>
                  <FormControl>
                    <Input placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="pr-2 w-full">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="pr-2 w-full">
                  <FormLabel>Vezetéknév</FormLabel>
                  <FormControl>
                    <Input placeholder="25" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="pr-2 w-full">
                  <FormLabel>Utónév</FormLabel>
                  <FormControl>
                    <Input placeholder="25" {...field} />
                  </FormControl>
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
                  Napló érvényességi ideje
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
            name="haveAccessToPost"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Bejegyzések megtekintésének szabályozása</FormLabel>
                  <FormDescription>
                    Jelölje ki a négyzetet, ha megszeretné tiltani, hogy a felhasználó bejegyzésekhez hozzáférjen
                    szeretné!
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="haveAccessToTournament"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Versenyre jelentkezés szabályozása</FormLabel>
                  <FormDescription>
                    Jelölje ki a négyzetet, ha meg szeretné tiltani a versenyre való jelentkezés engedélyét
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="haveAccessToFishing"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Horgászat engedélyének szabályozása</FormLabel>
                  <FormDescription>
                    Jelölje ki a négyzetet, ha meg szeretné tiltani, hogy a felhasználó fogásokat rögzíthessen
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full sm:w-auto">
            Módosítás
          </Button>
        </form>
      </Form>
      <Toaster />
    </>
  );
};


export default UpdateUserByAdminForm