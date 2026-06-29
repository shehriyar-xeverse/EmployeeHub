"use client";
import { useState } from "react";
import Stats from "@/components/dashboard/stats";
import Employee from "@/components/dashboard/employee";
import Filter from "@/components/dashboard/filter";
import NewEmploye from "@/components/dashboard/newEmploye";
import Image from "next/image";
import { LogOutButton } from "@/components/dashboard/logOut";
import Link from "next/link";

//data
const mockEmployees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    department: "Engineering",
    salary: 75000,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    department: "Marketing",
    salary: 65000,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    department: "Sales",
    salary: 70000,
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    department: "HR",
    salary: 60000,
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    department: "Engineering",
    salary: 80000,
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredEmployees = mockEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
        <Stats mockEmployees={mockEmployees} />
        <Filter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsModalOpen={setIsModalOpen}
        />
        <Employee filteredEmployees={filteredEmployees} />
      </main>

      {/* Modal */}
      {isModalOpen && <NewEmploye setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Dashboard;
