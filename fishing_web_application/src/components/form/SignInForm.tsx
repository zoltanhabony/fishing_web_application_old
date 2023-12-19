"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "../ui/icon";
const formSchema = z.object({
  email: z.string().min(1, { message: "Az email címet kötelező megadni!" }).email({
    message: "Invalid email",
  }),

  password: z
    .string()
    .regex(new RegExp(".*[a-z].*"), "A jelszónak tartalmaznia kell egy kisbetűt!")
    .regex(new RegExp(".*\\d.*"), "A jelszónak tartalmaznia kell egy számot!")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "A jelszónak tartalmaznia kell egy speciális karaktert! pl:!@#$"
    )
    .min(7, "A jelszónak minimum 8 karakter hosszúnak kell lennie!"),
});

const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [signInError, setSignInError] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    const data = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (data?.error) {
      setIsLoading(false)
      setSignInError(true)
    } else {
      setIsLoading(false)
      setSignInError(false)
      router.push("/dashboard");
    }
  };

  return (
       <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="horgaszjanos@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jelszó</FormLabel>
              <FormControl>
                <Input disabled={isLoading} type="password" placeholder="*********" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {signInError ? <p className="text-sm text-destructive">Hibás felhasználónév vagy jelszó</p>: ""}
        <div className="flex flex-col justify-center items-center">
          <Button disabled={isLoading} className="mb-5 w-full bg-sky-700" type="submit">
          {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Belépés
          </Button>
        </div>
      </form>
    </Form>

  );
};

export default SignInForm;
