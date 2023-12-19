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
import { useRouter } from "next/navigation";

const registrationFormSchema = z
  .object({
    userName: z.string().min(3, {
      message: "A felhasználónévnek minimum 3 karaktert kell tartalmaznia!",
    }),
    email: z.string().min(1, { message: "Az email címet kötelező megadni!" }).email({
      message: "Érvénytelen e-mail cím",
    }),
    password: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "A jelszónak tartalmaznia kell egy nagybetűt!")
      .regex(new RegExp(".*[a-z].*"), "A jelszónak tartalmaznia kell egy kisbetűt!")
      .regex(new RegExp(".*\\d.*"), "A jelszónak tartalmaznia kell egy számot!")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "A jelszónak tartalmaznia kell egy speciális karaktert! pl:!@#$"
      )
      .min(7, "A jelszónak minimum 8 karakter hosszúnak kell lennie!"),

    confirmPassword: z
      .string()
      .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
      .regex(new RegExp(".*[a-z].*"), "One lowercase character")
      .regex(new RegExp(".*\\d.*"), "One number")
      .regex(
        new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
        "One special character"
      )
      .min(8, "Must be at least 8 characters in length"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords did not match",
  });

const SignUpForm = () => {
  const route = useRouter();

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registrationFormSchema>) => {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: values.userName,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      route.push("/sign-in");
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem className="pr-5">
              <FormLabel>Felhasználónév</FormLabel>
              <FormControl>
                <Input placeholder="horgaszjanos" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="horgaszjanos@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="pr-5">
              <FormLabel>Jelszó</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jelszó megerősítése</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mb-5 w-full bg-sky-700" type="submit">
          Belépés
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
