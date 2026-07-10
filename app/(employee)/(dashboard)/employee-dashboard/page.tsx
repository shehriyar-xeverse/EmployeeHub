  "use client";
  import { useState } from "react";
  import {
    User,
    Briefcase,
    Calendar,
    Mail,
    Building2,
    Plus,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Trash2,
    FileText,
  } from "lucide-react";
  import Header from "@/components/common/header";
  import {
    useEmployeeProfileQuery,
  
    useLogOutEmployeeMutation,
    useUpdateEmployeeProfileImgMutation,
  } from "@/store/employeeProfile";
  import { Button } from "@/components/ui/button";
  import { useAddEmployeeReqMutation, useDeleteEmployeeReqMutation, useEmployeeRequestQuery,  } from "@/store/employeeApi";
  import CreateEmployeeReq from "@/components/employeeDashboard/createEmployeeReq";
  import { formatDate } from "@/components/common/formatDate";
  import Image from "next/image";

  const EmployeeDashboard = () => {
    const { data: Profile } = useEmployeeProfileQuery(undefined);
    const [logOutUser] = useLogOutEmployeeMutation();
    const [updateEmployeeProfileImg] = useUpdateEmployeeProfileImgMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addEmployeeReq, { isLoading: Adding }] = useAddEmployeeReqMutation();
    const { data: OwnRequest  } = useEmployeeRequestQuery(undefined);
    


    const userData = Profile?.data;
    const employeeReq = OwnRequest?.data;
    const requestStatus = employeeReq?.status || null;

    
    const getStatusInfo = (status: string) => {
      const statusMap: any = {
        Pending: {
          icon: Clock,
          color: "text-yellow-400",
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/20",
          label: "Pending",
          dotColor: "bg-yellow-400",
        },
        Approved: {
          icon: CheckCircle,
          color: "text-green-400",
          bg: "bg-green-500/10",
          border: "border-green-500/20",
          label: "Approved",
          dotColor: "bg-green-400",
        },
        Rejected: {
          icon: XCircle,
          color: "text-red-400",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
          label: "Rejected",
          dotColor: "bg-red-400",
        },
      };
      return statusMap[status] || statusMap.Pending;
    };

    const statusInfo = requestStatus ? getStatusInfo(requestStatus) : null;
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


        {!employeeReq ? (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-3xl border border-gray-800/50 p-12 max-w-2xl w-full text-center backdrop-blur-sm">
                <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-12 h-12 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">
                  No Request Found
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  You haven't submitted any employee request yet. Create your first request to get started.
                </p>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:scale-105  cursor-pointer"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Employee Request
                </Button>
              </div>
            </div>
          </main>
          ) :(
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {requestStatus !== "Pending" && requestStatus !== "Approved"  && requestStatus !== "Rejected" &&(
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 flex items-center gap-2 h-[52px] font-semibold px-6 rounded-xl transition-all hover:scale-105 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40
                cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Employee</span>
                <span className="sm:hidden">Add</span>
              </Button>
            )} 
          </div>

        
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Welcome back, {employeeReq?.name || userData?.name || "Employee"}
            </h1>
            <p className="text-gray-400 mt-1">Here's your profile overview</p>
          </div>


          {statusInfo && (
            <div className={`mb-6 p-5 rounded-2xl border ${statusInfo.border} ${statusInfo.bg} backdrop-blur-sm transition-all duration-300`}>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${statusInfo.bg} border ${statusInfo.border}`}>
                    <StatusIcon className={`w-6 h-6 ${statusInfo.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Request Status</p>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full animate-pulse ${statusInfo.dotColor}`}></span>
                      <p className={`text-lg font-semibold ${statusInfo.color}`}>
                        {statusInfo.label}
                      </p>
                    </div>
                  </div>
                </div>
                
                {requestStatus === "Pending" && (
                  <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-yellow-400 font-medium">Awaiting Approval</span>
                  </div>
                )}
                {requestStatus === "Approved" && (
                  <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-xl border border-green-500/20">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-green-400 font-medium">Verified Account</span>
                  </div>
                )}
                {requestStatus === "Rejected" && (
                  <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-xl border border-red-500/20">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-red-400 font-medium">Contact Admin</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Profile*/}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" />
                Profile Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <User className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="text-sm text-gray-200 font-medium">
                      {employeeReq?.name || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Mail className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm text-gray-200 font-medium">
                      {employeeReq?.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Building2 className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="text-sm text-gray-200 font-medium">
                      {employeeReq?.department || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Salary</p>
                    <p className="text-sm text-gray-200 font-medium">
                      ${employeeReq?.salary?.toLocaleString() || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Calendar className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Submitted On</p>
                    <p className="text-sm text-gray-200 font-medium">
                      {formatDate(employeeReq?.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status Card */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-purple-400" />
                Account Status
              </h3>

              <div className="space-y-4">
                {/* Profile Image */}
                <div className="flex flex-col items-center text-center p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center overflow-hidden">
                      {employeeReq?.profile_image ? (
                        <Image
                          src={employeeReq.profile_image || "/userAvatar.png"}
                          alt="profile_image"
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-3xl font-bold text-white">
                          {employeeReq?.name?.charAt(0) || "U"}
                        </span>
                      )}
                    </div>
                    {statusInfo && (
                      <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full ${statusInfo.bg} border-2 border-[#1a1a1a]`}>
                        <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-medium text-white mt-3">
                    {employeeReq?.name || "N/A"}
                  </p>
                  <p className="text-xs text-gray-400">{employeeReq?.email || "N/A"}</p>
                </div>

                {/* Status Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                    <span className="text-sm text-gray-400">Department</span>
                    <span className="text-sm text-white font-medium">
                      {employeeReq?.department || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                    <span className="text-sm text-gray-400">Salary</span>
                    <span className="text-sm text-white font-medium">
                      ${employeeReq?.salary?.toLocaleString() || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                    <span className="text-sm text-gray-400">Status</span>
                    {statusInfo && (
                      <span className={`text-sm font-medium ${statusInfo.color} flex items-center gap-1.5`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusInfo.label}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status Messages */}
                {requestStatus === "Pending" && (
                  <div className="p-3 bg-yellow-500/5 rounded-xl border border-yellow-500/20">
                    <p className="text-xs text-yellow-400 text-center">
                      Your request is pending approval. You'll be notified once reviewed.
                    </p>
                  </div>
                )}
                {requestStatus === "Rejected" && (
                  <div className="p-3 bg-red-500/5 rounded-xl border border-red-500/20">
                    <p className="text-xs text-red-400 text-center">
                       Your request was rejected. Please contact admin for more details.
                    </p>
                  </div>
                )}
                {requestStatus === "Approved" && (
                  <div className="p-3 bg-green-500/5 rounded-xl border border-green-500/20">
                    <p className="text-xs text-green-400 text-center">
                       Your account has been verified. You can now access all features.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
            </main>
          )}

        {isModalOpen && (
          <CreateEmployeeReq
            setIsModalOpen={setIsModalOpen}
            addEmployeeReq={addEmployeeReq}
            isLoading={Adding}
            data={Profile}
          />
        )}
      </div>
    );
  };

  export default EmployeeDashboard;