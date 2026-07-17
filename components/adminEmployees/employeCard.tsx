import React from "react";
import Image from "next/image";
import { formatDate } from "../common/formatDate";
import { Button } from "../ui/button";
import { handleDownload } from "@/hooks/fileDownload";
import { Download, FileText } from "lucide-react";

const EmployeeCard = ({
  employee,
  setSelectedEmployee,
  setIsEditModal,
  setIsDeleteModalOpen,
}: any) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/20";
      case "on leave":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";
      case "inactive":
        return "bg-red-500/20 text-red-400 border-red-500/20";
      default:
        return "bg-teal-500/20 text-teal-400 border-teal-500/20";
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 overflow-hidden shadow-2xl shadow-teal-500/5">
      <div className="relative  px-6 py-8 sm:px-8 ">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative group">
            <div className="absolute inset-0  rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
            {employee?.profile_image ? (
              <Image
                src={employee?.profile_image || "/userAvatar.png"}
                alt={employee.name}
                width={200}
                height={200}
                className="w-20 h-20 rounded-full object-cover relative z-10 border-2 border-gray-700 group-hover:border-teal-500 transition-all duration-300 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              <Image
                src={"/userAvatar.png"}
                alt={employee.name}
                width={200}
                height={200}
                className="w-20 h-20 rounded-full object-cover relative z-10 border-2 border-gray-700 group-hover:border-teal-500 transition-all duration-300 group-hover:scale-110"
                loading="lazy"
              />
            )}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <h2 className="text-2xl font-bold text-white">{employee.name}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor("active")}`}
              >
                {employee?.status || "Active"}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
              <span className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-xs border border-teal-500/20 flex items-center gap-1">
                {/* <Building2 className="w-3 h-3" /> */}
                {employee?.department}
              </span>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20 flex items-center gap-1">
                {/* <DollarSign className="w-3 h-3" />$ */}
                {employee?.salary?.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center sm:justify-end">
            <Button
              onClick={() => {
                setSelectedEmployee(employee);
                setIsEditModal(true);
              }}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition-all flex items-center gap-2 shadow-lg cursor-pointer"
            >
              Edit
            </Button>
            <Button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all flex items-center gap-2 border border-red-500/20 cursor-pointer"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-800/50 px-6 sm:px-8">
        <div className="flex gap-6 overflow-x-auto">
          <button
            className={`py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap 
                        border-teal-500 text-teal-400`}
          >
            Overview
          </button>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-[#0a0a0a] rounded-xl p-3 text-center border border-gray-800/50">
            <p className="text-2xl font-bold text-teal-400">
              {employee?.salary?.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">Salary</p>
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
          <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 ">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                Email Address
              </p>
              <p className="text-gray-200 font-medium mt-1 truncate">
                {employee?.email}
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 ">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                Department
              </p>
              <p className="text-gray-200 font-medium mt-1">
                <span className="text-gray-200 font-medium mt-1 truncates">
                  {employee.department}
                </span>
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 ">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                Salary
              </p>
              <p className="text-2xl font-bold text-white mt-1">
                ${employee.salary?.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 ">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                Join Date
              </p>
              <p className="text-gray-200 font-medium mt-1">
                {formatDate(employee?.created_at)}
              </p>
            </div>
          </div>

          <div
            className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl 
            transition-all hover:shadow-lg "
          >
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





        {employee?.employee_file && (
                        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-800 bg-[#0a0a0a]">
                          <div className="flex flex-col gap-4 border-b border-gray-800 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/20">
                                <FileText className="h-5 w-5 text-teal-400" />
                              </div>
        
                              <div>
                                <h3 className="text-sm font-semibold text-white">
                                  Employee Document
                                </h3>
                                <p className="text-xs text-gray-400">
                                  Preview the uploaded document or download it.
                                </p>
                              </div>
                            </div>
                            <Button
                              onClick={() => handleDownload(employee?.employee_file)}
                              className="flex items-center gap-2 bg-teal-600 text-white
                               hover:bg-teal-500  cursor-pointer"
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          </div>
                          <div className="p-4">
                            <iframe
                              src={`${employee?.employee_file}#toolbar=0&navpanes=0&scrollbar=0`}
                              title="Employee Document"
                              className="w-full max-w-[320px] h-[200px] rounded-lg border border-gray-700 bg-white"
                            />
                          </div>
                        </div>
                      )}
         {/* <div className="p-4">
              <iframe
            src={`${employee?.employee_file}#toolbar=0&navpanes=0&scrollbar=0`}
                title="Employee Document"
                className="w-full max-w-[320px] h-[200px] rounded-lg border border-gray-700 bg-white"
              />
                  </div>

        <Button
          onClick={() => handleDownload(employee?.employee_file)}
          className=" h-12 bg-teal-800  hover:bg-teal-600  text-white px-4 py-4 rounded  cursor-pointer  "
        >
          Download Document
        </Button> */}
      </div>
    </div>
  );
};

export default   React.memo(EmployeeCard);
