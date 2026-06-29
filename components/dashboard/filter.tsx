import React from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  LogOut,
  Users,
  ArrowUpDown,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
const Filter = ({ searchTerm, setSearchTerm, setIsModalOpen }: any) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 
              w-4 h-4"
          />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2 whitespace-nowrap  h-13 cursor-pointer text-md font-semibold "
        >
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>
    </div>
  );
};

export default Filter;
