"use client";
import { useMemo, useState, useEffect } from 'react';
import { useAddEmployeeMutation, useGetAllEmployeesQuery } from '@/store/employeeApi';
import Header from '@/components/common/header';
import Filter from '@/components/adminDashboard/filter';
import Employee from '@/components/adminDashboard/employee';
import AddEmployeeModal from '@/components/adminDashboard/addEmployee'
import Stats from '@/components/adminDashboard/stats';
import ErrorInterface from '@/components/adminDashboard/errorInterface';
import { useAdminProfileQuery, useLogOutAdminMutation, useUpdateProfileImgMutation } from '@/store/admin';

const Dashboard = () => {
  const [addEmployee, { isLoading:Adding }] = useAddEmployeeMutation();
    const { data:Profile } = useAdminProfileQuery(undefined);
  const [updateProfileImg] = useUpdateProfileImgMutation()
  const [logOutUser] = useLogOutAdminMutation();
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
      emp?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp?.department?.toLowerCase().includes(searchTerm.toLowerCase())
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
  if (error) return <ErrorInterface />

  

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] font-quicksand z-30  ">
          <Header
      Profile={Profile}
      logOutUser={logOutUser}
      navigate={'/admin-login'}
      updateProfileImg={updateProfileImg}
      isAdmin={true}
      />
      
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
        <AddEmployeeModal
          setIsModalOpen={setIsModalOpen} 
          addEmployee={addEmployee}
          isLoading={Adding}
          data={Profile}
        />
      )}
    </div>
  );
};

export default Dashboard;