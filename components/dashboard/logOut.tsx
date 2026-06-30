"use client"
import {
  LogOutIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogOutUserMutation } from "@/store/userApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function LogOutButton() {
    const [logOutUser] = useLogOutUserMutation();
      const router = useRouter();
  
    const logOut = async () => {
    try {
    await logOutUser().unwrap();
    router.replace("/login");
    toast.success("Successfully Logout" ,{
      position: "top-center",
    })
  } catch (error) {
    console.log(error);
     toast.error("login failed", {
      position: "top-center",
    })}
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full cursor-pointer "
        >
          <Avatar>
            <AvatarImage src="/userAvatar.png" alt="shadcn" />
            <AvatarFallback>user</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem
          onClick={logOut}
          className="cursor-pointer"
        >
          <LogOutIcon className="font-quicksand" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
