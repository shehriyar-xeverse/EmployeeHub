"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetAllEmployeesQuery } from "@/store/employeeApi";
import UpdateModal from "@/components/adminDashboard/updateModal";
import DeleteModal from "@/components/adminDashboard/delelteModal";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import LoadingEmployee from "@/components/adminEmployees/loadingEmloyee";
import ErrorHandler from "@/components/adminEmployees/errorHandler";
import EmployeeCard from "@/components/adminEmployees/employeCard";
import { useAdminProfileQuery, useLogOutAdminMutation, useUpdateProfileImgMutation } from "@/store/admin";

const EmployeeDetails = () => {
  const { data: Profile } = useAdminProfileQuery(undefined);
  const [updateProfileImg] = useUpdateProfileImgMutation()
  const [logOutUser] = useLogOutAdminMutation();
  const [editModal, setIsEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const redirected = useRef(false);

  const {
    data: employees,
    isLoading,
    error,
  } = useGetAllEmployeesQuery(undefined);
  const employee = employees?.find((emp: any) => emp.id === Number(id));

  useEffect(() => {
  if (!isLoading && employees && !employee && !redirected.current) {
    redirected.current = true;
    router.replace("/admin-dashboard");
  }
}, [employee, employees, isLoading, router]);
  if (isLoading || isDeleting) return <LoadingEmployee />;
  if (!employee) return null;
  if (error) return <ErrorHandler />;
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] font-quicksand">
      <Header
      Profile={Profile}
      logOutUser={logOutUser}
      navigate={'/admin-login'}
      updateProfileImg={updateProfileImg}
      isAdmin={true}
      
      />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/admin-dashboard"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-all group mb-4"
        >
          <span className="font-medium">Back to Dashboard</span>
        </Link>
        <EmployeeCard
          employee={employee}
          setSelectedEmployee={setSelectedEmployee}
          setIsEditModal={setIsEditModal}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      </main>
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleting={setIsDeleting}
          isDeleting={isDeleting}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          employee={employee}
        />
      )}
      {editModal && (
        <UpdateModal
          setIsEditModal={setIsEditModal}
          employee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
