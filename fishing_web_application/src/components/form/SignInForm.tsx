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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import GoogleSingInButton from "../GoogleSignInButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icons } from "../ui/icon";
import { error } from "console";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({
    message: "Invalid email",
  }),

  password: z
    .string()
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    )
    .min(8, "Must be at least 8 characters in length"),
});

const SignUpForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [signInError, setSignInError] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    setIsLoading(true)

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
                <Input disabled={isLoading} placeholder="jhondoe@gmail.com" {...field} />
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
                <Input disabled={isLoading} type="password" placeholder="s3cr€t" {...field} />
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

export default SignUpForm;
