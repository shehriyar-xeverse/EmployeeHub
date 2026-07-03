"use client";
import { Users} from "lucide-react";
import { useState } from "react";
import EmployeeTable from "./employeTable";
import EmployeeCard from "./employeeCard";

const Employee = ({ filteredEmployees, isLoading, error, viewMode , setIsModalOpen}: any) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);


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
  if (viewMode === "grid") return <EmployeeCard  filteredEmployees={filteredEmployees}   setHoveredId={setHoveredId} />

  // List View
  return <EmployeeTable   filteredEmployees={filteredEmployees}/>
};

export default Employee;