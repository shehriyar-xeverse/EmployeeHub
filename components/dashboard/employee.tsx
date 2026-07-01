"use client";
import { Users, Mail, Building2, DollarSign, MapPin, Calendar, MoreVertical, User, Briefcase } from "lucide-react";
import { useRouter } from "next/navigation";
import { avatars } from "@/lib/avatars";
import { useState } from "react";

const Employee = ({ filteredEmployees, isLoading, error, viewMode , setIsModalOpen}: any) => {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getRandomAvatar = (id: number) => {
    return avatars[id % avatars.length];
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-[#1a1a1a] rounded-2xl border border-gray-800/50 p-6 animate-pulse">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-700"></div>
              <div className="mt-4 h-5 bg-gray-700 rounded w-3/4"></div>
              <div className="mt-2 h-4 bg-gray-700 rounded w-2/3"></div>
              <div className="mt-3 flex gap-2">
                <div className="h-6 bg-gray-700 rounded-full w-20"></div>
                <div className="h-6 bg-gray-700 rounded-full w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl border border-red-500/20 p-12 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h3 className="text-red-400 text-xl font-semibold">Failed to Load Employees</h3>
        <p className="text-gray-400 mt-2">Please try refreshing the page</p>
      </div>
    );
  }

  if (filteredEmployees?.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-16 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Users className="w-12 h-12 text-purple-400" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-2">No Employees Found</h3>
        <p className="text-gray-400 max-w-md mx-auto">
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all  cursor-pointer"
        >
          Add Employee
        </button>
      </div>
    );
  }

// grid view
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredEmployees?.map((employee: any) => (
          <div
            key={employee.id}
            onClick={() => router.push(`/employees/${employee.id}`)}
            onMouseEnter={() => setHoveredId(employee.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group bg-gradient-to-br from-[#1a1a1a] to-[#121212] border border-gray-800/50 rounded-2xl p-6 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:via-purple-500/0 group-hover:to-purple-500/5 transition-all duration-500"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={getRandomAvatar(employee.id)}
                  alt={employee.name}
                  className="w-20 h-20 rounded-full object-cover relative z-10 border-2 border-gray-700 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-110"
                />
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
    );
  }

  // List View
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#0f0f0f] border-b border-gray-800/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:table-cell">Department</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden md:table-cell">Position</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">Email</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Salary</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider hidden xl:table-cell">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/30">
            {filteredEmployees?.map((employee: any) => (
              <tr
                key={employee.id}
                onClick={() => router.push(`/employees/${employee.id}`)}
                className="hover:bg-purple-600/5 transition-colors cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={getRandomAvatar(employee.id)}
                      alt={employee.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-700 group-hover:border-purple-500 transition-colors"
                    />
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
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="text-gray-400 text-sm">{employee.position || '—'}</span>
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
  );
};

export default Employee;