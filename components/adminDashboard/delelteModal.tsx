"use client";
import { Trash2 } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useDeleteEmployeeMutation } from '@/store/employeeApi';
import { Spinner } from '../ui/spinner';
import { useRouter } from 'next/navigation';

const DeleteModal = ({ setIsDeleteModalOpen, employee,setIsDeleting,isDeleting}: any) => {
  const [deleteEmployee, { isLoading: deletingLoading }] = useDeleteEmployeeMutation();
  const router = useRouter();

 const handleDelete = async (id: number) => {
  try {
    setIsDeleting(true)
    const response = await deleteEmployee(id).unwrap();
    if(response.error){
      console.log("Delete Employee Failed",response?.error)
      return
    }
    toast.success("Employee Deleted Successfully", {position : 'top-center'});
    router.replace("/admin-dashboard");
  } catch (error) {
    toast.error("Delete Employee Failed", {position : 'top-center'});
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 w-full max-w-md shadow-2xl">
        <div className="p-6 text-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-500/20">
            <Trash2 className="w-10 h-10 text-red-400" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            Delete Employee?
          </h3>
          
          <p className="text-gray-400 mb-1">
            Are you sure you want to delete
          </p>
          <p className="text-purple-400 font-semibold text-lg mb-6">
            {employee?.name}
          </p>

          <div className="flex gap-3">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl text-gray-300 font-medium transition-colors cursor-pointer h-12"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(employee?.id)}
              disabled={deletingLoading}
              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-medium transition-all shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer h-12"
            >
              {deletingLoading  || isDeleting ? (
                <>
                  <Spinner className="w-4 h-4 text-white" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DeleteModal);