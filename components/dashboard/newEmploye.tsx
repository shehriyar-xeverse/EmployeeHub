import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const NewEmploye = ({ setIsModalOpen }: any) => {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent backdrop-blur-sm bg-opacity-50">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6  border border-gray-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Add New Employee
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer "
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary ($)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="75000"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={() => setIsModalOpen(false)}
                variant="outline"
                className="flex-1  h-10 cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white h-10 cursor-pointer"
              >
                Add Employee
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEmploye;
