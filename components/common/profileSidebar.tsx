"use client"
import {
  LogOutIcon,
  UserIcon,
  MailIcon,
  CalendarIcon,
  XIcon,
  ChevronRightIcon,
  Building2Icon,
  BriefcaseIcon
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLogOutUserMutation } from "@/store/userApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { forwardRef } from "react";
import { ProfileSidebarProps } from "@/types/employee";



export const ProfileSidebar = forwardRef<HTMLDivElement, ProfileSidebarProps>(
  ({ isOpen, onClose, userData, initials }, ref) => {
    const [logOutUser] = useLogOutUserMutation();
    const router = useRouter();

    const formatDate = (dateString: string) => {
      if (!dateString) return 'N/A';
      try {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch {
        return 'N/A';
      }
    };

    const logOut = async () => {
      try {
        await logOutUser().unwrap();
        router.replace("/login");
        router.refresh();
        toast.success("Successfully Logout", {
          position: "top-center",
        });
      } catch (error) {
        console.log(error);
        toast.error("Logout failed", {
          position: "top-center",
        });
      }
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
          className={`fixed top-0 right-0 h-full w-full sm:w-[380px] md:w-[420px] bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-l border-gray-800/80 shadow-2xl shadow-purple-500/10 transition-transform duration-300 ease-out font-quicksand ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            maxHeight: '100vh',
          }}>
          <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-800/50 bg-[#0f0f0f]/95 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
              <h2 className="text-lg font-semibold text-white font-quicksand">Profile</h2>
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
          <div className="flex-1 overflow-y-hidden p-6 pb-8 font-quicksand">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Avatar className="w-24 h-24 border-2 border-gray-700 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-105 relative z-10">
                  <AvatarImage src="/userAvatar.png" alt={userData?.name || 'User'} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-800 text-white text-2xl font-bold font-quicksand">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 z-20 bg-purple-600 rounded-full p-1.5 border-2 border-[#1a1a1a]">
                  <UserIcon className="w-3 h-3 text-white" />
                </div>
              </div>

              <h3 className="mt-4 text-xl font-semibold text-white font-quicksand">
                {userData?.name || 'User Name'}
              </h3>
              <p className="text-sm text-gray-400 flex items-center gap-1 mt-1 font-quicksand">
                <MailIcon className="w-3.5 h-3.5" />
                {userData?.email || 'user@example.com'}
              </p> 
            </div>
            <div className="space-y-4">
              <div className="bg-[#0a0a0a] rounded-xl p-4 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                    <UserIcon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-quicksand">Full Name</p>
                    <p className="text-sm text-gray-200 font-medium truncate font-quicksand">{userData?.name || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0a0a0a] rounded-xl p-4 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                    <MailIcon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-quicksand">Email Address</p>
                    <p className="text-sm text-gray-200 font-medium truncate font-quicksand">{userData?.email || 'N/A'}</p>
                  </div>
                </div>
              </div>
              <div className="bg-[#0a0a0a] rounded-xl p-4 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                    <CalendarIcon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-quicksand">Joined Date</p>
                    <p className="text-sm text-gray-200 font-medium truncate font-quicksand">
                      {formatDate(userData?.created_at || userData?.joinDate)}
                    </p>
                  </div>
                </div>
              </div>
              {userData?.department && (
                <div className="bg-[#0a0a0a] rounded-xl p-4 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                      <Building2Icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-quicksand">Department</p>
                      <p className="text-sm text-gray-200 font-medium truncate font-quicksand">{userData.department}</p>
                    </div>
                  </div>
                </div>
              )}

              {userData?.position && (
                <div className="bg-[#0a0a0a] rounded-xl p-4 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                      <BriefcaseIcon className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-quicksand">Position</p>
                      <p className="text-sm text-gray-200 font-medium truncate font-quicksand">{userData.position}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="my-6 border-t border-gray-800/50"></div>

            <Button
              onClick={logOut}
              className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-red-500/30 hover:shadow-red-500/40 flex items-center justify-center gap-2 cursor-pointer group font-quicksand"
            >
              <LogOutIcon className="w-4 h-4 group-hover:rotate-12 transition-transform flex-shrink-0" />
              <span>Logout</span>
              <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Button>

          </div>
        </div>
      </>
    );
  }
);

ProfileSidebar.displayName = 'ProfileSidebar';