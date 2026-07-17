"use client";
import { useState } from "react";
import {Plus,FileText} from "lucide-react";
import {useEmployeeProfileQuery,useLogOutEmployeeMutation,useUpdateEmployeeProfileImgMutation} 
from "@/store/employeeProfile";
import { Button } from "@/components/ui/button";
import { useAddEmployeeReqMutation, useEmployeeRequestQuery } from "@/store/employeeApi";
import dynamic from "next/dynamic";
const  Header = dynamic(() => import('@/components/common/header'))
const  CreateEmployeeReq = dynamic(() => import('@/components/employeeDashboard/createEmployeeReq'))
const  Loader = dynamic(() => import('@/components/common/loader'))
const  RequestCard = dynamic(() => import('@/components/employeeDashboard/requestCard'))

const EmployeeDashboard = () => {
  const { data: Profile } = useEmployeeProfileQuery(undefined);
  const [logOutUser] = useLogOutEmployeeMutation();
  const [updateEmployeeProfileImg] = useUpdateEmployeeProfileImgMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEmployeeReq, { isLoading: Adding }] = useAddEmployeeReqMutation();
  const { data: OwnRequest, isLoading: OwnRequestLoading } = useEmployeeRequestQuery(undefined);
  const employeeReq = OwnRequest?.data;

  if (OwnRequestLoading) {  
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] font-quicksand">
        <Header
          Profile={Profile}
          logOutUser={logOutUser}
          navigate={"/login"}
          updateProfileImg={updateEmployeeProfileImg}
          isAdmin={false}
        />
        <div className="flex items-center justify-center min-h-[70vh]">
          <Loader />
        </div>
      </div>
    );
  }

  if (!employeeReq) {
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
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-3xl border border-gray-800/50 p-12 max-w-2xl w-full text-center">
              <div className="w-24 h-24 rounded-full bg-teal-500/10 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-teal-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">No Request Found</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                You haven't submitted any employee request yet. Create your first request to get started.
              </p>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all hover:scale-105 cursor-pointer"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Employee Request
              </Button>
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
    );
  }

  return (
   <RequestCard
   employeeReq={employeeReq}
   Profile={Profile}
   logOutUser={logOutUser}
   setIsModalOpen={setIsModalOpen}
   isModalOpen={isModalOpen}
   />
  );
};

export default EmployeeDashboard;