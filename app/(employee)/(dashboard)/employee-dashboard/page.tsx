"use client";
import { useState } from "react";
import {
  User,
  Briefcase,
  Calendar,
  Mail,
  Building2,
  Plus,
} from "lucide-react";
import Header from "@/components/common/header";
import {
  useEmployeeProfileQuery,
  useLogOutEmployeeMutation,
  useUpdateEmployeeProfileImgMutation,
} from "@/store/employeeProfile";
import { Button } from "@/components/ui/button";
import { useAddEmployeeReqMutation } from "@/store/employeeApi";
import CreateEmployeeReq from "@/components/employeeDashboard/createEmployeeReq";
import { formatDate } from "@/components/common/formatDate";

const EmployeeDashboard = () => {
  const { data: Profile } = useEmployeeProfileQuery(undefined);
  const [logOutUser] = useLogOutEmployeeMutation();
  const [updateEmployeeProfileImg] = useUpdateEmployeeProfileImgMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEmployeeReq,  { isLoading:Adding }] = useAddEmployeeReqMutation();

  const userData = Profile?.data;
  

  const stats = {
    totalTasks: 12,
    completedTasks: 8,
    pendingTasks: 4,
    attendance: 92,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] font-quicksand">
      <Header
        Profile={Profile}
        logOutUser={logOutUser}
        navigate={"/login"}
        updateProfileImg={updateEmployeeProfileImg}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 flex items-center gap-2 whitespace-nowrap h-[52px] cursor-pointer font-semibold px-6 rounded-xl transition-all hover:scale-105 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 "
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Employee</span>
          <span className="sm:hidden">Add</span>
        </Button>

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            Welcome back, {userData?.name || "Employee"}
          </h1>
          <p className="text-gray-400 mt-1">
            Here's your work summary for today
          </p>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-5 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Tasks</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.totalTasks}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-purple-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-purple-400">
              <span>Assigned to you</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-5 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.completedTasks}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-green-400">
              <span>Tasks done</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-5 backdrop-blur-sm hover:border-yellow-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.pendingTasks}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-yellow-400">
              <span>In progress</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-5 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Attendance</p>
                <p className="text-2xl font-bold text-white mt-1">{stats.attendance}%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-xs text-blue-400">
              <span>This month</span>
            </div>
          </div>
        </div> */}

        {/* Profile Details Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              Profile Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <User className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Full Name</p>
                  <p className="text-sm text-gray-200 font-medium">
                    {userData?.name || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-gray-200 font-medium">
                    {userData?.email || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Building2 className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Department</p>
                  <p className="text-sm text-gray-200 font-medium">
                    {userData?.department || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Briefcase className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Position</p>
                  <p className="text-sm text-gray-200 font-medium">
                    {userData?.position || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Calendar className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Joined Date</p>
                  <p className="text-sm text-gray-200 font-medium">
                    {formatDate(userData?.createdAt || userData?.joinDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          {/* <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-400" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 group cursor-pointer">
                <span className="text-sm text-gray-200">View Profile</span>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 group cursor-pointer">
                <span className="text-sm text-gray-200">My Tasks</span>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 group cursor-pointer">
                <span className="text-sm text-gray-200">Attendance</span>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 group cursor-pointer">
                <span className="text-sm text-gray-200">Notifications</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
              </button>

              <button className="w-full flex items-center justify-between p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 group cursor-pointer">
                <span className="text-sm text-gray-200">Leave Request</span>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </button>
            </div>

            <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-purple-600/5 rounded-xl border border-purple-500/20">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                <p className="text-xs text-gray-400">You have <span className="text-purple-400 font-semibold">3</span> pending tasks</p>
              </div>
            </div>
          </div> */}
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
  );
};

export default EmployeeDashboard;
