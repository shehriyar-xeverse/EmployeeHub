import {User,Briefcase,Calendar,Mail,Building2,Plus,Clock,CheckCircle,XCircle,AlertCircle,FileText} from "lucide-react";
import React from 'react'
import Header from "../common/header";
import { Button } from "../ui/button";
import Image from "next/image";
import CreateEmployeeReq from "./createEmployeeReq";
import { useAddEmployeeReqMutation } from "@/store/employeeApi";
import { formatDate } from "../common/formatDate";
import { useUpdateEmployeeProfileImgMutation } from "@/store/employeeProfile";

const RequestCard = ({employeeReq,Profile,logOutUser,setIsModalOpen,isModalOpen}:any) => {
    const requestStatus = employeeReq?.status || null;
    const [addEmployeeReq, { isLoading: Adding }] = useAddEmployeeReqMutation();
    const [updateEmployeeProfileImg] = useUpdateEmployeeProfileImgMutation();
      

      const statusMap: any = {
        Pending: {
          icon: Clock,
          color: "text-yellow-400",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
          dotColor: "bg-yellow-400",
        },
        Approved: {
          icon: CheckCircle,
          color: "text-green-400",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
          dotColor: "bg-green-400",
        },
        Rejected: {
          icon: XCircle,
          color: "text-red-400",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
          dotColor: "bg-red-400",
        },
      };
    
      const statusInfo = requestStatus ? statusMap[requestStatus] : null;
      const StatusIcon = statusInfo?.icon || null;


  return (
     <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] font-quicksand">
          <Header
            Profile={Profile}
            logOutUser={logOutUser}
            navigate={"/login"}
            updateProfileImg={updateEmployeeProfileImg}
            isAdmin={false}
          />
    
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {requestStatus !== "Pending" && requestStatus !== "Approved" && requestStatus !== "Rejected" && (
              <Button
                onClick={() => setIsModalOpen(true)}
                className=" flex items-center gap-2 h-[52px] font-semibold px-6 rounded-xl transition-all hover:scale-105 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 cursor-pointer mb-6"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Employee</span>
                <span className="sm:hidden">Add</span>
              </Button>
            )}
    
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {employeeReq?.name || "Employee"}
              </h1>
              <p className="text-gray-400 mt-1">Here's your profile overview</p>
            </div>
    
            {/* Status Card */}
            {statusInfo && (
              <div className={`mb-6 p-5 rounded-2xl border ${statusInfo.border} ${statusInfo.bg}`}>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${statusInfo.bg} border ${statusInfo.border}`}>
                      <StatusIcon className={`w-6 h-6 ${statusInfo.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Request Status</p>
                    
                    </div>
                  </div>
               
                </div>
              </div>
            )}
            
             <iframe
        src={employeeReq?.file_url}
        className="w-full h-full  border border-gray-100"
        title="PDF Document Viewer"
      />
    
            {/* Profile Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  Profile Details
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: User, label: "Full Name", value: employeeReq?.name },
                    { icon: Mail, label: "Email", value: employeeReq?.email },
                    { icon: Building2, label: "Department", value: employeeReq?.department },
                    { icon: Briefcase, label: "Salary", value: `$${employeeReq?.salary?.toLocaleString()}` },
                    { icon: Calendar, label: "Submitted On", value: formatDate(employeeReq?.created_at) },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300">
                      <div className="p-2 bg-purple-500/10 rounded-lg">
                        <item.icon className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">{item.label}</p>
                        <p className="text-sm text-gray-200 font-medium">{item.value || "N/A"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    
              {/* Account Status */}
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-400" />
                  Account Status
                </h3>
    
                <div className="space-y-4">
                  <div className="flex flex-col items-center text-center p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center overflow-hidden">
                        {employeeReq?.profile_image ? (
                          <Image
                            src={employeeReq.profile_image}
                            alt="profile"
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl font-bold text-white">{employeeReq?.name?.charAt(0) || "U"}</span>
                        )}
                      </div>
                      {statusInfo && (
                        <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full ${statusInfo.bg} border-2 border-[#1a1a1a]`}>
                          <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-white mt-3">{employeeReq?.name || "N/A"}</p>
                    <p className="text-xs text-gray-400">{employeeReq?.email || "N/A"}</p>
                  </div>
    
                  <div className="space-y-2">
                    {[
                      { label: "Department", value: employeeReq?.department },
                      { label: "Salary", value: `$${employeeReq?.salary?.toLocaleString()}` },
                      { label: "Status", value: statusInfo?.label, isStatus: true },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                        <span className="text-sm text-gray-400">{item.label}</span>
                        <span className={`text-sm font-medium ${item.isStatus ? statusInfo?.color : "text-white"}`}>
                          {item.isStatus ? (
                            <span className="flex items-center gap-1.5">
                              {statusInfo && <StatusIcon className="w-3.5 h-3.5" />}
                              {item.value}
                            </span>
                          ) : (
                            item.value || "N/A"
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
    
          {isModalOpen && (
            <CreateEmployeeReq
              setIsModalOpen={setIsModalOpen}
              addEmployeeReq={addEmployeeReq}
              isLoading={Adding}
              data={Profile}
            />
          )}
        </div>
  )
}

export default RequestCard
