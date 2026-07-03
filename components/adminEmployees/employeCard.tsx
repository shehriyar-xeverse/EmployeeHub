import React from "react";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Mail,
  Building2,
  DollarSign,
  Calendar,
  User,
  Briefcase,
} from "lucide-react";
import Image from "next/image";
import { formatDate } from "../common/formatDate";

const EmployeeCard = ({
  employee,
  setSelectedEmployee,
  setIsEditModal,
  setIsDeleteModalOpen,
}: any) => {
 

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase() || "?"
    );
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/20";
      case "on leave":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";
      case "inactive":
        return "bg-red-500/20 text-red-400 border-red-500/20";
      default:
        return "bg-purple-500/20 text-purple-400 border-purple-500/20";
    }
  };

  const getTenure = () => {
    if (!employee?.created_at) return "N/A";
    const start = new Date(employee.created_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    if (years > 0) return `${years}y ${months}m`;
    return `${months}m`;
  };
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 overflow-hidden shadow-2xl shadow-purple-500/5">
      <div className="relative bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-transparent px-6 py-8 sm:px-8 border-b border-gray-800/50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
            {/* <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all"> */}
            {employee?.employee_image ? (
              <Image
                src={employee?.employee_image || "/userAvatar.png"}
                alt={employee.name}
                width={200}
                height={200}
                className="w-20 h-20 rounded-full object-cover relative z-10 border-2 border-gray-700 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-110"
              />
            ) : (
              <Image
                src={"/userAvatar.png"}
                alt={employee.name}
                width={200}
                height={200}
                className="w-20 h-20 rounded-full object-cover relative z-10 border-2 border-gray-700 group-hover:border-purple-500 transition-all duration-300 group-hover:scale-110"
              />
            )}

            {/* </div> */}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <h2 className="text-2xl font-bold text-white">{employee.name}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status || "active")}`}
              >
                {employee?.status || "Active"}
              </span>
            </div>
            <p className="text-purple-300 mt-1 flex items-center justify-center sm:justify-start gap-2">
              <Briefcase className="w-4 h-4" />
              {employee?.position || "Employee"} • ID: #
              {String(employee.id).padStart(4, "0")}
            </p>
            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs border border-purple-500/20 flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {employee?.department}
              </span>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20 flex items-center gap-1">
                <DollarSign className="w-3 h-3" />$
                {employee?.salary?.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={() => {
                setSelectedEmployee(employee);
                setIsEditModal(true);
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 cursor-pointer"
            >
              <Edit className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all flex items-center gap-2 border border-red-500/20 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-800/50 px-6 sm:px-8">
        <div className="flex gap-6 overflow-x-auto">
          <button
            className={`py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap 
                        border-purple-500 text-purple-400`}
          >
            Overview
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-[#0a0a0a] rounded-xl p-3 text-center border border-gray-800/50">
            <p className="text-2xl font-bold text-purple-400">
              {employee?.salary?.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">Salary</p>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 text-center border border-gray-800/50">
            <p className="text-2xl font-bold text-blue-400">{getTenure()}</p>
            <p className="text-xs text-gray-500 mt-1">Tenure</p>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 text-center border border-gray-800/50">
            <p className="text-2xl font-bold text-green-400">Active</p>
            <p className="text-xs text-gray-500 mt-1">Status</p>
          </div>
          <div className="bg-[#0a0a0a] rounded-xl p-3 text-center border border-gray-800/50">
            <p className="text-2xl font-bold text-yellow-400">
              {employee.department}
            </p>
            <p className="text-xs text-gray-500 mt-1">Department</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5">
            <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
              <Mail className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                Email Address
              </p>
              <p className="text-gray-200 font-medium mt-1 truncate">
                {employee?.email}
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5">
            <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
              <Building2 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                Department
              </p>
              <p className="text-gray-200 font-medium mt-1">
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20 inline-block">
                  {employee.department}
                </span>
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5">
            <div className="p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
              <DollarSign className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                Annual Salary
              </p>
              <p className="text-2xl font-bold text-white mt-1">
                ${employee.salary?.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                ${Math.round(employee.salary / 12).toLocaleString()}/month
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5">
            <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
              <Calendar className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                Join Date
              </p>
              <p className="text-gray-200 font-medium mt-1">
                {formatDate(employee?.created_at)}
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5">
            <div className="p-2 bg-gray-500/10 rounded-lg group-hover:bg-gray-500/20 transition-colors">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                Employee ID
              </p>
              <p className="text-gray-200 font-medium mt-1 font-mono">
                #{String(employee?.id).padStart(4, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
