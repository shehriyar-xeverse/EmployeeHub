"use client"
import { Bell} from 'lucide-react';
import { useState } from 'react';
import { useApproveNotifyMutation, useRejectNotifyMutation } from '@/store/notifications';
import { toast } from 'sonner';
import { useAdminProfileQuery } from '@/store/admin';
import CardContent from './cardContent';

const NotificationsCards = ({ filteredNotifications }: any) => {
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
      toast.error(error.message || "Rejected Failed", { position: 'top-center' });
      setRejectLoading(false);
    }
  };

  return (
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
      ) : <CardContent   
          filteredNotifications={filteredNotifications}
          handleApprove={handleApprove}
          handleReject={handleReject}
          loading={loading}
          rejectLoading={rejectLoading}/>
          }
    </div>
  );
};

export default NotificationsCards;