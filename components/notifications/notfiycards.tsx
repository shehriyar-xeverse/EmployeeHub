"use client"
import { Bell, CheckCircle,  X,  User, Mail, DollarSign, Building2, Clock } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useApproveNotifyMutation, useGetNotificationsQuery, useRejectNotifyMutation } from '@/store/notifications';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useAdminProfileQuery, useLogOutAdminMutation, useUpdateProfileImgMutation } from '@/store/admin';

const NotificationsCards = ({filteredNotifications}:any) => {
      const { data: Profile } = useAdminProfileQuery(undefined);
       const [approveNotify] = useApproveNotifyMutation()
       const [rejectNotify] = useRejectNotifyMutation()
       const [loading, setLoading] = useState(false)
       const [rejectLoading, setRejectLoading] = useState(false)
       const adminId = Profile?.data.id


     const handleApprove = async (id: any) => {
        try {
          setLoading(true)
          const response = await approveNotify({ id, adminId })
          if (response.error) {
            toast.error("Approved Failed", { position: 'top-center' })
            setLoading(false)
            return
          }
          toast.success("Approved Notification", { position: 'top-center' })
          setLoading(false)
        } catch (error: any) {
          console.log("error", error?.message)
          toast.error(error.message || "Approved Failed", { position: 'top-center' })
          setLoading(false)
        }
      };
    
      const handleReject = async (id: any) => {
        try {
          setRejectLoading(true)
          const response = await rejectNotify({ id, adminId })
          if (response.error) {
            toast.error("Rejected Failed", { position: 'top-center' })
            setRejectLoading(false)
            return
          }
          toast.success("Rejected Notification", { position: 'top-center' })
          setRejectLoading(false)
        } catch (error: any) {
          console.log("error", error?.message)
          toast.error(error.message || "Rejected Failed", { position: 'top-center' })
          setRejectLoading(false)
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
                    }
      
                    const statusIcons: any = {
                      pending: <Clock className="w-3.5 h-3.5 text-yellow-400" />,
                      accept: <CheckCircle className="w-3.5 h-3.5 text-green-400" />,
                      reject: <X className="w-3.5 h-3.5 text-red-400" />
                    }
      
                    const showButtons = notif.status === 'pending'
      
                    return (
                      <div
                        key={notif.id}
                        className={`group bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border ${
                          notif.status === 'pending' ? 'border-purple-500/30 shadow-lg shadow-purple-500/5' : 'border-gray-800/50 opacity-80'
                        } p-5 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10`}
                      >
                        <div className="flex flex-col gap-4">
                          {/* Header - Title, Time, Status */}
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${statusColors[notif.status] || 'bg-purple-500/10'} border flex items-center justify-center`}>
                                {statusIcons[notif.status] || <Bell className="w-5 h-5 text-purple-400" />}
                              </div>
                              <div>
                                <h4 className="text-base font-semibold text-white">
                                  {notif.title || 'Request'}
                                </h4>
                                <p className="text-sm text-gray-400">{notif.message}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="text-xs text-gray-500 whitespace-nowrap">{notif.time}</span>
                              {notif.status === 'pending' && (
                                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                              )}
                            </div>
                          </div>
      
                          {/* Employee Details */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 p-3 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                            <div className="flex items-center gap-2">
                              <User className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                              <span className="text-xs text-gray-400 truncate">{notif?.name || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                              <span className="text-xs text-gray-400 truncate">{notif?.email || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                              <span className="text-xs text-gray-400 truncate">{notif?.department || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                              <span className="text-xs text-gray-400 truncate">${notif?.salary || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                              <span className="text-xs text-gray-400 truncate capitalize">{notif?.status || 'N/A'}</span>
                            </div>
                          </div>
      
                          {/* Action Buttons - Only for Pending */}
                          {showButtons && (
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleApprove(notif.id)}
                                disabled={loading}
                                className="px-4 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg border border-green-500/20 transition-all duration-300 cursor-pointer text-sm font-medium flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                {loading ? <Spinner className='text-gray-300 w-3.5 h-3.5' /> : "Approve"}
                              </button>
                              <button
                                onClick={() => handleReject(notif.id)}
                                disabled={rejectLoading}
                                className="px-4 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-all duration-300 cursor-pointer text-sm font-medium flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <X className="w-3.5 h-3.5" />
                                {rejectLoading ? <Spinner className='text-gray-300 w-3.5 h-3.5' /> : "Reject"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
    </div>
  )
}

export default NotificationsCards
