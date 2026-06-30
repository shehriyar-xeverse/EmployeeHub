"use client"

import { useDeleteEmployeeMutation } from "@/store/employeeApi";
import { Edit, Trash, Users } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import UpdateModal from "./updateModal";

const Employee = ({ filteredEmployees, isLoading, error }: any) => {
  const [deleteEmployee, {isLoading:deletingLoading}] =  useDeleteEmployeeMutation()
  const [editModal, setIsEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

 const handleDelete = async (id: number) => {
  try {
    await deleteEmployee(id).unwrap();
    toast.success("Employee Deleted Successfully", {position: "top-center"});
  } catch (error) {
    console.error(error);
    toast.error("Delete Employee Failed", {position: "top-center",});
  }
};

  return (
    <div>

    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Salary</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>

                    <p className="text-gray-500 font-medium">
                      Loading employees...
                    </p>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="py-20">
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-red-600 text-lg font-semibold">
                      Failed to load employees
                    </p>

                    <p className="text-gray-500">
                      Please try again later.
                    </p>
                  </div>
                </td>
              </tr>
            ) : filteredEmployees?.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-20">
                  <div className="flex flex-col items-center">
                    <Users className="w-12 h-12 text-gray-300" />

                    <h3 className="mt-4 text-lg font-semibold text-gray-700">
                      No Employees Found
                    </h3>

                    <p className="text-gray-500 mt-2">
                      There are no employees to display.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredEmployees?.map((employee: any) => (
                <tr
                  key={employee.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-semibold">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>

                      <span className="font-medium">{employee.name}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">{employee.email}</td>

                  <td className="px-6 py-4">
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs">
                      {employee.department}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    ${employee.salary.toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setIsEditModal(true);
                        }}
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                      onClick={() => handleDelete(employee.id)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer">
                       {deletingLoading ? <Spinner  className="w-4 h-4 text-gray-900" />  :<Trash size={18} /> } 
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


      <div className="md:hidden p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>

            <p className="text-gray-500">Loading employees...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-red-600 text-lg font-semibold">
              Failed to load employees
            </p>

            <p className="text-gray-500 mt-2">
              Please try again later.
            </p>
          </div>
        ) : filteredEmployees?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Users className="w-12 h-12 text-gray-300" />

            <h3 className="mt-4 text-lg font-semibold">
              No Employees Found
            </h3>

            <p className="text-gray-500 mt-2">
              There are no employees to display.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEmployees?.map((employee: any) => (
              <div key={employee.id} className="border rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold">
                    {employee.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold">{employee.name}</h3>
                    <p className="text-sm text-gray-500">{employee.email}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Department</span>

                    <span className="bg-teal-100 text-teal-700 px-2 py-1 rounded">
                      {employee.department}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">Salary</span>

                    <span className="font-semibold">
                      ${employee.salary.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setIsEditModal(true);
                  }}
                  className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-100 cursor-pointer"
                >
                  <Edit size={18} />
                  Edit
                </button>
                  <button
                  onClick={() => handleDelete(employee.id)}
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-red-100 cursor-pointer">
                  {deletingLoading ? (<Spinner  className="w-4 h-4 text-gray-900" />) : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {editModal && (<UpdateModal setIsEditModal={setIsEditModal} employee={selectedEmployee}/>)}
    </div>

  );
};


export default Employee