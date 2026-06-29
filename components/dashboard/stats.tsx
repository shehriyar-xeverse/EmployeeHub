import React from "react";

const Stats = ({ mockEmployees }: any) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Total Employees</p>
          <p className="text-2xl font-bold text-gray-800">
            {mockEmployees.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Departments</p>
          <p className="text-2xl font-bold text-gray-800">
            {new Set(mockEmployees.map((e: any) => e.department)).size}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Avg Salary</p>
          <p className="text-2xl font-bold text-gray-800">
            $
            {Math.round(
              mockEmployees.reduce((acc: any, e: any) => acc + e.salary, 0) /
                mockEmployees.length,
            ).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Highest Salary</p>
          <p className="text-2xl font-bold text-gray-800">
            $
            {Math.max(
              ...mockEmployees.map((e: any) => e.salary),
            ).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
