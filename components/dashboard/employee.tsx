import { Edit, Trash, Users } from "lucide-react";

const Employee = ({ filteredEmployees }: any) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Desktop Table */}
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
            {filteredEmployees.map((employee: any) => (
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
                    <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer">
                      <Edit size={18} />
                    </button>

                    <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100  cursor-pointer">
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {filteredEmployees.map((employee: any) => (
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
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-100 cursor-pointer">
                <Edit size={18} />
                Edit
              </button>

              <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-red-100 cursor-pointer">
                <Trash size={18} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="py-12 text-center">
          <Users className="mx-auto text-gray-300 w-12 h-12" />
          <p className="mt-3 text-gray-500">No employees found</p>
        </div>
      )}
    </div>
  );
};

export default Employee;
