"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { X, User, Mail, Building2, DollarSign, Briefcase } from "lucide-react";
import { EmployeeForm } from "@/types/employee";
import { toast } from "sonner";
import React, { useEffect } from "react";
import { useUpdateEmployeeMutation } from "@/store/employeeApi";

const UpdateModal = ({ setIsEditModal, employee }: any) => {
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeForm>();
  const onSubmit = async (data: EmployeeForm) => {
    try {
      await updateEmployee({
        id: employee.id,
        updatedData: data,
      }).unwrap();

      toast.success("Employee Successfully Updated!", {
        position: "top-center",
        duration: 3000,
        style: {
          background: '#1a1a1a',
          border: '1px solid #374151',
          color: '#fff',
        },
      });
      reset();
      setIsEditModal(false);
    } catch (error: any) {
      toast.error(error.message || "Update failed", { 
        position: 'top-center',
        style: {
          background: '#1a1a1a',
          border: '1px solid #374151',
          color: '#fff',
        },
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        email: employee.email,
        department: employee.department,
        salary: employee.salary,
      });
    }
  }, [employee, reset]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-[#1a1a1a]/95 backdrop-blur-sm z-10 flex items-center justify-between p-6 border-b border-gray-800/50">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
              Update Employee
            </h2>
            <p className="text-sm text-gray-400 mt-1">Edit employee information</p>
          </div>
          <Button
            onClick={() => setIsEditModal(false)}
            className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <User className="w-4 h-4 text-teal-400" />
                Full Name *
              </label>
              <input
                type="text"
                required
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-3 bg-[#0a0a0a] border ${
                  errors.name ? 'border-red-500' : 'border-gray-700/50'
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400" />
                Email Address *
              </label>
              <input
                type="email"
                required
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: "Only Gmail addresses are allowed",
                  },
                })}
                className={`w-full px-4 py-3 bg-[#0a0a0a] border ${
                  errors.email ? 'border-red-500' : 'border-gray-700/50'
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all`}
                placeholder="john@gmail.com"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-400" />
                Department *
              </label>
              <select
                required
                {...register("department", { required: "Department is required" })}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Design">Design</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div className="space-y-1.5 ">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-teal-400" />
                Salary (USD) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="1000"
                {...register("salary", { 
                  required: "Salary is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Salary must be positive" }
                })}
                className={`w-full px-4 py-3 bg-[#0a0a0a] border ${
                  errors.salary ? 'border-red-500' : 'border-gray-700/50'
                } rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all`}
                placeholder="60000"
              />
              {errors.salary && (
                <p className="text-red-400 text-xs mt-1">{errors.salary.message}</p>
              )}
            </div>
          </div>
          <div className="flex gap-3 pt-4 border-t border-gray-800/50">
            <Button
              type="button"
              onClick={() => setIsEditModal(false)}
              className="flex-1 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 
              rounded-xl text-gray-300 font-medium transition-colors cursor-pointer  h-10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 rounded-xl text-white font-medium transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer h-10"
            >
              {isLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Updating...
                </>
              ) : (
                'Update Employee'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(UpdateModal);