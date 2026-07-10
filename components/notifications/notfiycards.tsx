"use client"
import { Bell, CheckCircle, X, User, Mail, DollarSign, Building2, Clock } from 'lucide-react';
import React, { useState } from 'react';
import { useApproveNotifyMutation, useRejectNotifyMutation } from '@/store/notifications';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useAdminProfileQuery } from '@/store/admin';
import Image from 'next/image';

const NotificationsCards = ({ filteredNotifications, isLoading }: any) => {
  const { data: Profile } = useAdminProfileQuery(undefined);
  const [approveNotify] = useApproveNotifyMutation();
  const [rejectNotify] = useRejectNotifyMutation();
  const [loading, setLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const adminId = Profile?.data.id;

  const handleApprove = async (id: any) => {
    try {
      setLoading(true);
      const response = await approveNotify({ id, adminId });
      if (response.error) {
        toast.error("Approved Failed", { position: 'top-center' });
        setLoading(false);
        return;
      }
      toast.success("Approved Notification", { position: 'top-center' });
      setLoading(false);
    } catch (error: any) {
      console.log("error", error?.message);
      toast.error(error.message || "Approved Failed", { position: 'top-center' });
      setLoading(false);
    }
  };

  const handleReject = async (id: any) => {
    try {
      setRejectLoading(true);
      const response = await rejectNotify({ id, adminId });
      if (response.error) {
        toast.error("Rejected Failed", { position: 'top-center' });
        setRejectLoading(false);
        return;
      }
      toast.success("Rejected Notification", { position: 'top-center' });
      setRejectLoading(false);
    } catch (error: any) {
      console.log("error", error?.message);
      toast.error(error.message || "Rejected Failed", { position: 'top-center' });
      setRejectLoading(false);
    }
  };


  return (
    <div>
      <div className="space-y-4">
        {filteredNotifications?.length === 0 ? (
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-16 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Bell className="w-12 h-12 text-purple-400" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">No Notifications</h3>
            <p className="text-gray-400 max-w-md mx-auto">No notifications to display in this category.</p>
          </div>
        ) : (
          filteredNotifications?.map((notif: any, index: any) => {
            const statusColors: any = {
              pending: 'border-purple-500/30 bg-purple-500/5',
              accept: 'border-green-500/30 bg-green-500/5',
              reject: 'border-red-500/30 bg-red-500/5'
            };

            const statusIcons: any = {
              pending: <Clock className="w-4 h-4 text-yellow-400" />,
              accept: <CheckCircle className="w-4 h-4 text-green-400" />,
              reject: <X className="w-4 h-4 text-red-400" />
            };
            const disableApprove = notif.status === 'accept';
            const disableReject = notif.status === 'reject';

            return (
              <div
                key={notif?.id}
                className={`group bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border ${
                  notif?.status === 'pending' ? 'border-purple-500/30 shadow-lg shadow-purple-500/5' : 'border-gray-800/50 opacity-80'
                } p-5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${statusColors[notif?.status] || 'bg-purple-500/10'} border flex items-center justify-center`}>
                        {statusIcons[notif?.status] || <Bell className="w-5 h-5 text-purple-400" />}
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-white">
                          {notif?.title || 'Request'}
                        </h4>
                        <p className="text-sm text-gray-400">{notif?.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-gray-500 whitespace-nowrap">{notif?.time}</span>
                      {notif?.status === 'pending' && (
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                      )}
                    </div>
                  </div>

                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                    
                    <div className="flex items-center gap-3 col-span-1 sm:col-span-2 lg:col-span-1">
                      <div className="w-12 h-12 rounded-full  flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                        
                        {notif?.profile_image  && (
                        <Image 
                        src={notif?.profile_image || '/avatar.png'}
                        alt='Profile_image'
                        width={300}
                        height={300}
                        className='rounded-full'
                        />
                        )
                        }
                       
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="text-base font-medium text-white truncate">{notif?.name || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-base font-medium text-white truncate">{notif?.email || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Department */}
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="text-base font-medium text-white truncate">{notif?.department || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Salary */}
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Salary</p>
                        <p className="text-base font-medium text-white truncate">${notif?.salary || 'N/A'}</p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className={`text-base font-medium capitalize truncate ${
                          notif?.status === 'pending' ? 'text-yellow-400' :
                          notif?.status === 'accept' ? 'text-green-400' :
                          notif?.status === 'reject' ? 'text-red-400' : 'text-white'
                        }`}>
                          {notif?.status || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>

                

                  
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleApprove(notif?.id)}
                        disabled={loading || disableApprove}
                        className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg border border-green-500/20 transition-all duration-300 cursor-pointer text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {loading ? <Spinner className='text-gray-300 w-4 h-4' /> : "Approve"}
                      </button>
                      <button
                        onClick={() => handleReject(notif?.id)}
                        disabled={rejectLoading  || disableReject}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-all duration-300 cursor-pointer text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X className="w-4 h-4" />
                        {rejectLoading ? <Spinner className='text-gray-300 w-4 h-4' /> : "Reject"}
                      </button>
                    </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationsCards;