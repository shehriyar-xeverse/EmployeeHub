'use client'
import { avatars } from "@/lib/avatars";
import { useRouter } from "next/navigation"
import {  Mail, Building2, DollarSign,  Calendar,  Briefcase } from "lucide-react";
import Image from "next/image";
import { formatDate } from "../common/formatDate";


const EmployeeCard = ({filteredEmployees,setHoveredId}:any) => {
 const router = useRouter()
  
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
           {filteredEmployees?.map((employee: any) => (
             <div
               key={employee.id}
               onClick={() => router.push(`/admin-employees/${employee.id}`)}
               onMouseEnter={() => setHoveredId(employee.id)}
               onMouseLeave={() => setHoveredId(null)}
               className="group bg-gradient-to-br from-[#1a1a1a] to-[#121212] border border-gray-800/50 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden"
             >
               <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-purple-500/0 group-hover:to-purple-500/5 transition-all duration-500"></div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="relative">
                   <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                   {employee?.profile_image ? (
                      <Image
                     src={employee?.profile_image  || '/userAvatar.png'}
                     alt={employee.name}
                     width={200}
                     height={200}
                     className="w-20 h-20 rounded-full object-cover relative z-10 border-2 border-gray-700 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-110"
                   />
                   ) : (
                    <Image
                     src={'/userAvatar.png'}
                     alt={employee.name}
                     width={200}
                     height={200}
                     className="w-20 h-20 rounded-full object-cover relative z-10 border-2 border-gray-700 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-110"
                   />
                   )
                   }
                 
                   {employee.position && (
                     <div className="absolute -bottom-1 -right-1 z-20 w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center border-2 border-[#1a1a1a]">
                       <Briefcase className="w-3.5 h-3.5 text-white" />
                     </div>
                   )}
                 </div>
                 
                 <h3 className="mt-4 text-lg font-semibold text-gray-200 group-hover:text-purple-400 transition-colors">
                   {employee.name}
                 </h3>
                 
                 {employee.position && (
                   <p className="text-sm text-gray-400 mt-0.5">{employee.position}</p>
                 )}
                 
                 <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                   <Mail className="w-3.5 h-3.5" />
                   {employee.email}
                 </p>
                 
                 <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                   <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs border border-purple-500/20 flex items-center gap-1">
                     <Building2 className="w-3 h-3" />
                     {employee.department}
                   </span>
                   <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20 flex items-center gap-1">
                     <DollarSign className="w-3 h-3" />
                     ${employee.salary.toLocaleString()}
                   </span>
                 </div>
   
                 {employee.joinDate && (
                   <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                     <Calendar className="w-3 h-3" />
                     Joined {formatDate(employee.joinDate)}
                   </div>
                 )}
               </div>
             </div>
           ))}
         </div>
  )
}

export default EmployeeCard
