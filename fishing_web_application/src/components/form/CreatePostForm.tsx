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
import { createPostFormSchema } from "@/data/schema";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";

const CreatePostForm = () => {
  const { toast } = useToast();

  type formSchema = z.infer<typeof createPostFormSchema>;

  const defaultValues: Partial<formSchema> = {
    title: "",
    description: "",
  };

  const form = useForm<formSchema>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues,
  });

  const submitHandler = async (
    values: z.infer<typeof createPostFormSchema>
  ) => {
    const data = {
      title: values.title,
      description: values.description,
    };

    console.log(data);

    const response = await fetch("/api/postHandler", {
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
            Létrehozás
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreatePostForm;
