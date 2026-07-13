"use client";
import { MailIcon, XIcon, CameraIcon, CheckIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {  useUpdateProfileImgMutation } from "@/store/admin";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { forwardRef, useState, useRef } from "react";
import { ProfileSidebarProps } from "@/types/employee";
import UserDetails from "./userDetails";

export const  ProfileSidebar = forwardRef<HTMLDivElement, ProfileSidebarProps>(
  ({ isOpen, onClose, userData, initials,logOutUser,navigate,updateProfileImg }, ref) => {
    const router = useRouter();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false)
    

    const logOut = async () => {
      try {
        await logOutUser().unwrap();
        router.replace(navigate);
        router.refresh();
        toast.success("Successfully Logout", { position: "top-center" });
      } catch (error) {
        console.log(error);
        toast.error("Logout failed", { position: "top-center" });
      }
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    };

    const handleSaveImage = async () => {
      if (!selectedFile) {
        toast.error("Please select an image first", { position: "top-center" });
        return;
      }

      try {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("profile_image", selectedFile); 
        await updateProfileImg(formData).unwrap();
        toast.success("Profile image updated successfully!", { position: "top-center" });
        setImagePreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        router.refresh();
        setIsLoading(false)
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update profile image");
      }finally{
        setIsLoading(false)
      }
    };

    const handleCancelImage = () => {
      setImagePreview(null);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 99999 }}
            onClick={onClose}
          />
        )}

        <div
          ref={ref}
          className={`fixed top-0 right-0 h-full w-full
             sm:w-[380px] md:w-[420px] bg-gradient-to-br 
             from-[#1a1a1a] to-[#0f0f0f] border-l border-gray-800/80 
             shadow-2xl shadow-purple-500/10 transition-transform duration-300
              ease-out font-quicksand   ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            maxHeight: "100vh",
          }}
        >
          <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-800/50 bg-[#0f0f0f]/95 backdrop-blur-sm  overflow-y-hidden">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-white font-quicksand">
                Profile
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-purple-500/10 transition-colors cursor-pointer flex-shrink-0"
              onClick={onClose}
              aria-label="Close profile"
            >
              <XIcon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 pb-8 font-quicksand   overflow-hidden">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative flex flex-col items-center">
                
                <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none -z-10" />
                <div className="relative">
                  <Avatar className="w-24 h-24 border-[3px] border-purple-500 shadow-lg shadow-purple-500/20 transition-all duration-300">
                    <AvatarImage
                      src={
                        imagePreview ||
                        userData?.profile_image ||
                        "/userAvatar.png"
                      }
                      alt={userData?.name || "User"}
                      loading="lazy"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-800 text-white text-2xl font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>


                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />

                </div>

                <h3 className="mt-4 text-xl font-semibold text-white">
                  {userData?.name || "User Name"}
                </h3>

                <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                  <MailIcon className="w-3.5 h-3.5" />
                  {userData?.email}
                </p>

                {imagePreview && (
                  <div className="mt-5 flex gap-3 w-full max-w-xs z-50 relative">
                    <Button
                      type="button"
                      onClick={handleCancelImage}
                      className="flex-1 h-10 bg-gray-700 hover:bg-gray-600 text-white rounded-lg cursor-pointer"
                    >
                      Cancel
                    </Button>

                    <Button
                      type="button"
                      onClick={handleSaveImage}
                      disabled={isLoading}
                      className="flex-1 h-10  bg-purple-900 rounded-lg cursor-pointer"
                    >
                      {isLoading ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <CheckIcon className="w-4 h-4 mr-1" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <UserDetails userData={userData} logOut={logOut} />
          </div>
        </div>
      </>
    );
  },
);

ProfileSidebar.displayName = "ProfileSidebar";
