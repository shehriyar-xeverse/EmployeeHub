"use client";
import { useMemo, useState, useEffect } from 'react';
import { useGetAllEmployeesQuery } from '@/store/employeeApi';
import Header from '@/components/common/header';
import Filter from '@/components/dashboard/filter';
import Employee from '@/components/dashboard/employee';
import NewEmploye from '@/components/dashboard/newEmploye';
import Stats from '@/components/dashboard/stats';

const Dashboard = () => {
  const { data, isLoading, error } = useGetAllEmployeesQuery(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [animateStats, setAnimateStats] = useState(false);

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!data) return [];

    let employees = [...data].filter((emp: any) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (sortOrder) {
      case "salary-asc":
        employees.sort((a: any, b: any) => a.salary - b.salary);
        break;
      case "salary-desc":
        employees.sort((a: any, b: any) => b.salary - a.salary);
        break;
      case "name-asc":
        employees.sort((a: any, b: any) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        employees.sort((a: any, b: any) => b.name.localeCompare(a.name));
        break;
      case "department":
        employees.sort((a: any, b: any) => a.department.localeCompare(b.department));
        break;
      default:
        break;
    }

    return employees;
  }, [data, searchTerm, sortOrder]);

  // stats
  const stats = useMemo(() => {
    if (!data) return null;
    const total = data.length;
    const departments = new Set(data.map((emp: any) => emp.department)).size;
    const totalSalary = data.reduce(
  (acc: number, emp: any) => acc + parseFloat(emp.salary),
  0
);

const avgSalary =
  total > 0 ? Math.round(totalSalary / total) : 0;

const maxSalary =
  total > 0
    ? Math.max(...data.map((emp: any) => parseFloat(emp.salary)))
    : 0;
    return { total, departments, avgSalary, maxSalary, totalSalary };
  }, [data]);

 

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] font-quicksand flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-8 max-w-md w-full text-center backdrop-blur-sm">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-red-400 text-xl font-semibold mb-2">Failed to Load Data</h3>
          <p className="text-gray-400 mb-6">We couldn't fetch your employee data. Please try again.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-colors  cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] font-quicksand z-30  ">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stats &&  <Stats  stats={stats} animateStats={animateStats} />}

        <Filter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsModalOpen={setIsModalOpen}
          
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={filteredEmployees.length}
        />

        <Employee
          filteredEmployees={filteredEmployees}
          isLoading={isLoading}
          error={error}
          viewMode={viewMode}
          setIsModalOpen={setIsModalOpen}

        />
      </main>

      {isModalOpen && (
        <NewEmploye 
          setIsModalOpen={setIsModalOpen} 
        />
      )}
    </div>
  );
};

export default Dashboard;