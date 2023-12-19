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
import { useToast } from "@/components/ui/use-toast";
import { updatePostFormSchema } from "@/data/schema";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";

interface ModifyPostFormProps {
  eventId: string;
  title: string;
  description: string;
  refreshData: () => void
}

const ModifyPostForm: React.FC<ModifyPostFormProps> = ({
  title,
  description,
  eventId,
  refreshData,
}) => {
  const { toast } = useToast();

  type formSchema = z.infer<typeof updatePostFormSchema>;

  const defaultValues: Partial<formSchema> = {
    eventId: eventId,
    title: title,
    description: description,
  };

  const form = useForm<formSchema>({
    resolver: zodResolver(updatePostFormSchema),
    defaultValues,
  });

  const submitHandler = async(values: z.infer<typeof updatePostFormSchema>) => {
    const data = {
      eventId: eventId,
      title: values.title,
      description: values.description,
    };

    const response = await fetch("/api/postHandler", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast({
        variant: "destructive",
        title: "Sikertelen módosítás!",
        description: (await response.json()).message,
        className: "w-[90%]",
      });
    } else {
      toast({
        variant: "default",
        title: "Sikeres módosítás",
        description: (await response.json()).message,
        className: "bg-green-600 w-[90%] text-white",
      });
      refreshData()
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
            name="title"
            render={({ field }) => (
              <FormItem className="pr-2 w-full">
                <FormLabel>Bejegyzés címe</FormLabel>
                <FormControl>
                  <Input placeholder="Víterületek karbantartása" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bejegyzés törzse</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A víterületek karbantartása nagyon fontos..."
                    className="resize-none h-[300px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Itt adhatod meg a bejegyzést tartalmát.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full sm:w-auto">
            Módosítás
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ModifyPostForm;
