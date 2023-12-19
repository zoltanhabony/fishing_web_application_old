import SignInForm from "@/components/form/SignInForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="block ">
      <div className="relative w-full h-[70px] flex items-center justify-between p-3">
        <div className=" relative flex items-center justify-center">
          <img src="/32.png" alt="" className="" />
          <Link className="text-md pl-3 cursor-pointer" href="/">Fishify</Link>
        </div>
        <Link
          href="/sign-up"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Regisztráció
        </Link>
      </div>
      <div className="absolute top-[70px] bottom-0 left-0 w-full  flex justify-center items-center">
        <div className="hidden md:flex w-[50%] h-full  justify-center items-center">
          <img
            src="/login.jpg"
            alt=""
            className="md:w-[100%] lg:w-[100%] xl:w-[85%] h-auto"
          />
        </div>
        <div className="w-full md:w-[50%] h-full  flex items-center justify-center p-5">
          <div className="w-[500px]">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
