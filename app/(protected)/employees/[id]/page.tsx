"use client";
import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Mail, 
  Building2, 
  DollarSign,
  Calendar,
  User,
  Briefcase,
  MapPin,
  Phone,
  Award,
  Clock,
  MoreVertical,
  Download,
  Share2,
  Printer,
  Globe
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { useGetAllEmployeesQuery } from '@/store/employeeApi';
import UpdateModal from '@/components/dashboard/updateModal';
import DeleteModal from '@/components/dashboard/delelteModal';
import { avatars } from '@/lib/avatars';
import Header from '@/components/common/header';
import Image from 'next/image';

const EmployeeDetails = () => {
  const [editModal, setIsEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const params = useParams();
  const id = params.id;

  const getRandomAvatar = (id: number) => {
    return avatars[id % avatars.length];
  };
  
  const { data: employees, isLoading, error } = useGetAllEmployeesQuery(undefined);
  const employee = employees?.find((emp: any) => emp.id === Number(id));

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || '?';
  };

  const getStatusColor = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'on leave': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
      case 'inactive': return 'bg-red-500/20 text-red-400 border-red-500/20';
      default: return 'bg-purple-500/20 text-purple-400 border-purple-500/20';
    }
  };

  // Calculate tenure
  const getTenure = () => {
    if (!employee?.created_at) return 'N/A';
    const start = new Date(employee.created_at);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    if (years > 0) return `${years}y ${months}m`;
    return `${months}m`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] font-quicksand">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-8 animate-pulse">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-700"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-1/4"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-700/30 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] font-quicksand">
        <Header />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-red-500/20 p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-red-400 text-xl font-semibold mb-2">Employee Not Found</h3>
            <p className="text-gray-400">The employee you're looking for doesn't exist or has been removed</p>
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] font-quicksand">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
        <Link 
          href="/dashboard" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-all group mb-4"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Dashboard</span>
        </Link>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 overflow-hidden shadow-2xl shadow-purple-500/5">
          
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-transparent px-6 py-8 sm:px-8 border-b border-gray-800/50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all">
                  {getInitials(employee.name)}
                </div>
              </div>

              {/* Employee Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
                  <h2 className="text-2xl font-bold text-white">{employee.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(employee.status || 'active')}`}>
                    {employee.status || 'Active'}
                  </span>
                </div>
                <p className="text-purple-300 mt-1 flex items-center justify-center sm:justify-start gap-2">
                  <Briefcase className="w-4 h-4" />
                  {employee.position || 'Employee'} • ID: #{String(employee.id).padStart(4, '0')}
                </p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs border border-purple-500/20 flex items-center gap-1">
                    <Building2 className="w-3 h-3" />
                    {employee.department}
                  </span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs border border-green-500/20 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    ${employee.salary?.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-center sm:justify-end">
                <button
                  onClick={() => {
                    setSelectedEmployee(employee);
                    setIsEditModal(true);
                  }}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all flex items-center gap-2 border border-red-500/20 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-800/50 px-6 sm:px-8">
            <div className="flex gap-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  activeTab === 'overview' 
                    ? 'border-purple-500 text-purple-400' 
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                Overview
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'overview' && (
              <>
                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="bg-[#0a0a0a] rounded-xl p-3 text-center border border-gray-800/50">
                    <p className="text-2xl font-bold text-purple-400">{employee.salary?.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Salary</p>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-xl p-3 text-center border border-gray-800/50">
                    <p className="text-2xl font-bold text-blue-400">{getTenure()}</p>
                    <p className="text-xs text-gray-500 mt-1">Tenure</p>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-xl p-3 text-center border border-gray-800/50">
                    <p className="text-2xl font-bold text-green-400">Active</p>
                    <p className="text-xs text-gray-500 mt-1">Status</p>
                  </div>
                  <div className="bg-[#0a0a0a] rounded-xl p-3 text-center border border-gray-800/50">
                    <p className="text-2xl font-bold text-yellow-400">{employee.department}</p>
                    <p className="text-xs text-gray-500 mt-1">Department</p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5">
                    <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Email Address</p>
                      <p className="text-gray-200 font-medium mt-1 truncate">{employee.email}</p>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <Building2 className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Department</p>
                      <p className="text-gray-200 font-medium mt-1">
                        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20 inline-block">
                          {employee.department}
                        </span>
                      </p>
                    </div>
                  </div>



                  {/* Salary */}
                  <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5">
                    <div className="p-2 bg-yellow-500/10 rounded-lg group-hover:bg-yellow-500/20 transition-colors">
                      <DollarSign className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Annual Salary</p>
                      <p className="text-2xl font-bold text-white mt-1">
                        ${employee.salary?.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        ${Math.round(employee.salary / 12).toLocaleString()}/month
                      </p>
                    </div>
                  </div>

                  {/* Join Date */}
                  <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5">
                    <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                      <Calendar className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Join Date</p>
                      <p className="text-gray-200 font-medium mt-1">{formatDate(employee.created_at)}</p>
                    </div>
                  </div>


                  <div className="group flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5">
                    <div className="p-2 bg-gray-500/10 rounded-lg group-hover:bg-gray-500/20 transition-colors">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Employee ID</p>
                      <p className="text-gray-200 font-medium mt-1 font-mono">#{String(employee.id).padStart(4, '0')}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

        

            
          </div>
        </div>
      </main>

      {/* Modals */}
      {isDeleteModalOpen && (
        <DeleteModal 
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          employee={employee}
        />
      )}

      {editModal && (
        <UpdateModal 
          setIsEditModal={setIsEditModal} 
          employee={selectedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;