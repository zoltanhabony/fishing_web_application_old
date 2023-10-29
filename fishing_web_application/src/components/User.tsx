"use client";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, LogOut, User as UserIcon } from "lucide-react";

const User = () => {
  const { data: session } = useSession();
  return (
    <div className="h-full flex items-center justify-end mr-3 z-10">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="user-image" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="pl-2 pr-2 text-sm text-gray-500">
        {session?.user.userName}
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="w-auto p-[5px] rounded hover:bg-gray-100 ">
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Fiókkezelés</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem >
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: `${window.location.origin}/sign-in`,
              })
            }
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default User;

/*
<div>
            <pre>{session?.user.email}</pre>
            <pre>{session?.user.role}</pre>
            <Button className="mb-5" type="submit" onClick={() => signOut({
                redirect: true, 
                callbackUrl: `${window.location.origin}/sign-in`
            })}>Sign out</Button>
        </div>
    )
*/
