"use client"
import {
  LogOutIcon,
  UserIcon,
  MailIcon,
  CalendarIcon,
  ChevronRightIcon,
  Building2Icon,
} from "lucide-react";
import { formatDate } from "../common/formatDate";
import { Button } from "../ui/button";
import Link from "next/link";

const UserDetails = ({userData,logOut}:any) => {
  const adminProfile  = true
  return (
    <>
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
    
                  {adminProfile && (
                    <Link 
                    className="w-full h-8  bg-[#0a0a0a] rounded-xl p-4 border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300  text-white"
                    href="/admin-notification">
                      Go to Notifications
                      </Link>
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
    </>
  )
}

export default UserDetails
