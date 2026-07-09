"use client"

import Image from 'next/image';
import Link from 'next/link';
import {Bell} from 'lucide-react'
import { LogOutButton } from '../adminDashboard/logOut';
import { useGetNotificationsQuery } from '@/store/notifications';
import { useEffect, useState } from 'react';


const Header = ({Profile,logOutUser,navigate,updateProfileImg,isAdmin}:any) => {
    const [notifyCount, setNotifyCount] = useState(0)
    const { data: notifications } = useGetNotificationsQuery(undefined)

    


    useEffect(() => {
    const Counts = notifications?.filter((notify:any)  => notify?.status === 'pending').length
    setNotifyCount(Counts)
    },[notifications,notifyCount])

    

   
    
  
  return (
    <header className="bg-gradient-to-r from-[#0f0f0f] to-[#1a1a1a] border-b border-gray-800/80 sticky top-0 z-40 backdrop-blur-xl bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/admin-dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full animate-pulse"></div>
              <Image
                src="/lo.png"
                alt="Employee Hub Logo"
                width={40}
                height={40}
                className="relative z-10 transition-transform group-hover:scale-110 duration-300"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent">
                Employee Hub
              </h1>
              <p className="text-[10px] text-gray-500 tracking-wider uppercase">Management System</p>
            </div>
          </Link>
          
          <div className="flex items-center gap-6">
          
              {isAdmin && (
                    <Link className='relative'
            href={'/admin-notification'}
            >
            <Bell  className='w-7 h-7  text-purple-500'   />
            {(notifyCount !== 0) && (
              <span  className='text-gray-100 font-bold text-[11px] w-5  h-5 bg-green-900
              flex items-center justify-center 
              rounded-full  absolute -top-1 left-3 '>{notifyCount}</span>)
            }
            

            </Link>

                  )}
            <LogOutButton
            Profile={Profile}
            logOutUser={logOutUser}
            navigate={navigate}
            updateProfileImg={updateProfileImg}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;