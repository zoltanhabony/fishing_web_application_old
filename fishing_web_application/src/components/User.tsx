"use client";
import { signOut, useSession } from "next-auth/react";
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
import { ChevronDown, LogOut, User, User as UserIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useEffect, useState } from "react";
import Profile from "./Profile";

const UserItem = () => {
  const { data: session, update } = useSession();
  const [user, setUser] = useState<any>({});

  

  useEffect(() => {
    async function getRequest() {
      const response = await fetch("/api/user/getUserData");
      if (response.ok) {
        const data = await response.json();
        setUser({
          userName: data.user.userName,
          email: data.user.email,
          createdAt: data.user.createdAt,
          logBookId: (data.user.LogBook ? data.user.LogBook.serialNumber : "nem rendelkezik fogási naplóval")
        });
        
      } else {
        setUser({});
      }
    }
    getRequest();
  }, []);

  return (
    <div className="h-full flex items-center justify-end mr-3 z-10">
      <Avatar>
        <AvatarImage src="" alt="user-image" />
        {session?.user.role === "ADMIN" ? (
          <AvatarFallback>A</AvatarFallback>
        ) : (
          <AvatarFallback>U</AvatarFallback>
        )}
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
            <Dialog>
              <DialogTrigger asChild>
                <div className="hover:bg-blue-50 text-sm pt-1 pb-1 rounded-sm pl-2 flex">
                  <User className="mr-2 h-4 w-4" />
                  <p>Profil</p>
                </div>
              </DialogTrigger>
              <DialogContent className="overflow-y-scroll max-h-screen items-center justify-center">
                <DialogHeader>
                  <DialogTitle className="relative">
                    Profil kártya
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <Profile userName={user.userName} email={user!.email} createdAt={user!.createdAt} logBookId={user!.logBookId} />
              </DialogContent>
            </Dialog>
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

export default UserItem;

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
