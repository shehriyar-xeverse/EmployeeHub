"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAdminProfileQuery } from "@/store/admin";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ProfileSidebar } from "../adminProfile/profileSidebar";

export function LogOutButton() {
  const { 
    data: Profile,
  error,
  isLoading,
  isFetching, } = useAdminProfileQuery(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

 console.log({
  Profile,
  error,
  isLoading,
  isFetching,
});

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const userData = Profile?.data;
  const initials = userData?.name
    ? userData.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <>
      <Button
        ref={triggerRef}
        variant="ghost"
        size="icon"
        className="rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 relative group flex-shrink-0"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open profile"
      >
        <div className="relative">
          <div
            className={`absolute inset-0 bg-purple-500/20 blur-xl rounded-full transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
          ></div>
          <Avatar className="border-2 border-gray-700 hover:border-purple-500 transition-colors duration-300 relative z-10 w-10 h-10">
            <AvatarImage
              src={ userData?.profile_image || "/userAvatar.png"}
              alt={userData?.name || "User"}
            />
            <AvatarFallback className="bg-gradient-to-br from-purple-600
             to-purple-800 text-white font-semibold font-quicksand">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </Button>
      {mounted &&
        createPortal(
          <ProfileSidebar
            ref={sidebarRef}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            userData={userData}
            initials={initials}
          />,
          document.body,
        )}
    </>
  );
}
