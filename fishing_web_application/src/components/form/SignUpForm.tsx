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

const formSchema = z
  .object({
    userName: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),
    email: z.string().min(1, { message: "Email is required" }).email({
      message: "Invalid email",
    }),
    firstName: z.string().min(3, {
      message: "Username must be at least 3 characters.",
    }),

    lastName: z.string().min(3, {
      message: "Username must be at least 3 characters.",
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        userName: values.userName,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password
      })
    })

    if(response.ok){
      route.push('/sign-in')
    }else{
      console.error('Registration failed')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-center items-center">
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem className="pr-5">
                <FormLabel>Felhasználónév</FormLabel>
                <FormControl>
                  <Input placeholder="jhondoe" {...field} />
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
                  <Input placeholder="jhondoe@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center items-center">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="pr-5">
                <FormLabel>Vezetéknév</FormLabel>
                <FormControl>
                  <Input placeholder="Jhon" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Utónév</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center items-center">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="pr-5">
                <FormLabel>Jelszó</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="s3cr€t" {...field} />
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
                  <Input type="password" placeholder="s3cr€t" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <Button className="mb-5" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <div className="flex flex-col justify-center items-center">
        <GoogleSingInButton>Bejelentkezés Google fiókkal</GoogleSingInButton>
      </div>
    </Form>
  );
};

export default SignUpForm;
