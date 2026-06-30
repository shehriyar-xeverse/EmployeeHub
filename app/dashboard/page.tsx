"use client";
import { useMemo, useState } from "react";
import Stats from "@/components/dashboard/stats";
import Employee from "@/components/dashboard/employee";
import Filter from "@/components/dashboard/filter";
import NewEmploye from "@/components/dashboard/newEmploye";
import Image from "next/image";
import { LogOutButton } from "@/components/dashboard/logOut";
import Link from "next/link";
import { useGetAllEmployeesQuery } from "@/store/employeeApi";



const Dashboard = () => {
  const { data, isLoading, error } = useGetAllEmployeesQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const filteredEmployees = useMemo(() => {
  if (!data) return [];
  return data.filter((emp: any) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [data, searchTerm]);



  return (
    <div className="min-h-screen bg-gray-50 font-quicksand">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="">
                <Image
                  src="/logo.png"
                  alt="Employee Hub Logo"
                  width={40}
                  height={40}
                />
              </div>
              <h1 className="text-xl font-bold text-gray-800">Employee Hub</h1>
            </Link>

            <LogOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* <Stats mockEmployees={mockEmployees} /> */}
        <Filter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsModalOpen={setIsModalOpen}
        />
        <Employee
         filteredEmployees={filteredEmployees}
         isLoading={isLoading}
         error={error}
          />
      </main>

      {/* Modal */}
      {isModalOpen && <NewEmploye setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Dashboard;
