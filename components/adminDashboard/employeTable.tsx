'use client'
import { avatars } from "@/lib/avatars";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { formatDate } from "../common/formatDate";



const EmployeeTable = ({filteredEmployees}:any) => {
    const router = useRouter()

   
   
   


  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#0f0f0f] border-b border-gray-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Department</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">Email</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Salary</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider hidden xl:table-cell">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/30">
            {filteredEmployees?.map((employee: any) => (
              <tr
                key={employee.id}
                onClick={() => router.push(`/admin-employees/${employee.id}`)}
                className="hover:bg-purple-600/5 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                      {employee?.profile_image? (
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
                                     
                    <div>
                      <p className="font-medium text-white group-hover:text-purple-400 transition-colors">
                        {employee.name}
                      </p>
                      <p className="text-sm text-gray-400 sm:hidden">{employee.department}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 hidden sm:table-cell">
                  <span className="text-gray-300">{employee.department}</span>
                </td>
                <td className="px-6 py-4 hidden lg:table-cell">
                  <span className="text-gray-400 text-sm">{employee.email}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-white font-semibold">${employee.salary.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-right hidden xl:table-cell">
                  <span className="text-gray-400 text-sm">{formatDate(employee.joinDate)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeTable
