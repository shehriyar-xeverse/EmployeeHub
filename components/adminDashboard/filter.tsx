import { Plus, Search, LayoutGrid, List, Filter as FilterIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

interface FilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setIsModalOpen: (open: boolean) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  totalResults: number;
}

const Filter = ({  
  searchTerm,
  setSearchTerm,
  setIsModalOpen,
  sortOrder,
  setSortOrder,
  viewMode,
  setViewMode,
  totalResults,
}: FilterProps) => {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-5 mb-6 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search employees by name, email, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-3 bg-[#0a0a0a] border border-gray-700/50 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all h-[52px]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1 rounded-lg hover:bg-gray-800/50 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="flex-1 lg:w-[200px]">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full h-[52px] min-h-[52px] max-h-[52px] bg-[#0a0a0a] border border-gray-700/50 text-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/50 cursor-pointer hover:border-gray-600 transition-all">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-purple-400" />
                  <SelectValue placeholder="Sort Employees" />
                </div>
              </SelectTrigger>

              <SelectContent className="bg-[#1a1a1a] border border-gray-700/50 text-gray-200 rounded-xl">
                <SelectItem
                  value="default"
                  className="cursor-pointer hover:bg-purple-600/20 hover:text-white focus:bg-purple-600/20 focus:text-white data-[highlighted]:bg-purple-600/20 data-[highlighted]:text-white"
                >
                   Default
                </SelectItem>
                <SelectItem
                  value="name-asc"
                  className="cursor-pointer hover:bg-purple-600/20 hover:text-white focus:bg-purple-600/20 focus:text-white data-[highlighted]:bg-purple-600/20 data-[highlighted]:text-white"
                >
                   Name: A → Z
                </SelectItem>
                <SelectItem
                  value="name-desc"
                  className="cursor-pointer hover:bg-purple-600/20 hover:text-white focus:bg-purple-600/20 focus:text-white data-[highlighted]:bg-purple-600/20 data-[highlighted]:text-white"
                >
                   Name: Z → A
                </SelectItem>
                <SelectItem
                  value="salary-asc"
                  className="cursor-pointer hover:bg-purple-600/20 hover:text-white focus:bg-purple-600/20 focus:text-white data-[highlighted]:bg-purple-600/20 data-[highlighted]:text-white"
                >
                   Salary: Low → High
                </SelectItem>
                <SelectItem
                  value="salary-desc"
                  className="cursor-pointer hover:bg-purple-600/20 hover:text-white focus:bg-purple-600/20 focus:text-white data-[highlighted]:bg-purple-600/20 data-[highlighted]:text-white"
                >
                   Salary: High → Low
                </SelectItem>
                <SelectItem
                  value="department"
                  className="cursor-pointer hover:bg-purple-600/20 hover:text-white focus:bg-purple-600/20 focus:text-white data-[highlighted]:bg-purple-600/20 data-[highlighted]:text-white"
                >
                   Department
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex bg-[#0a0a0a] border border-gray-700/50 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-purple-600/20 text-purple-400 ring-1 ring-purple-500/30"
                  : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/30"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 rounded-lg transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-purple-600/20 text-purple-400 ring-1 ring-purple-500/30"
                  : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/30"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 flex items-center gap-2 whitespace-nowrap h-[52px] cursor-pointer font-semibold px-6 rounded-xl transition-all hover:scale-105 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Employee</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>


      <div className="mt-4 flex items-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
          <span className="text-gray-400">
            <span className="text-white font-semibold">{totalResults}</span> employee{totalResults !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>
    </div>
  );
};

export default Filter;