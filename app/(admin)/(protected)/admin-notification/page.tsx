"use client";
import { useMemo, useState } from "react";
import { Bell, Filter } from "lucide-react";
import Header from "@/components/common/header";
import { useGetNotificationsQuery } from "@/store/notifications";
import {
  useAdminProfileQuery,
  useLogOutAdminMutation,
  useUpdateProfileImgMutation,
} from "@/store/admin";

import dynamic from "next/dynamic";
const NotificationsCards = dynamic(
  () => import("@/components/notifications/notfiycards"),
);

const Notifications = () => {
  const { data: Profile } = useAdminProfileQuery(undefined);
  const [logOutUser] = useLogOutAdminMutation();
  const [updateProfileImg] = useUpdateProfileImgMutation();
  const { data: notifications, isLoading } =
    useGetNotificationsQuery(undefined);
  const [filter, setFilter] = useState("all");

  const filteredNotifications = useMemo(() => {
    notifications;
    if (!notifications) return [];
    if (filter === "all") return notifications;
    return notifications.filter((notif: any) => notif.status === filter);
  }, [notifications, filter]);

  const counts = useMemo(() => {
    if (!notifications) return { all: 0, pending: 0, accept: 0, reject: 0 };
    return {
      all: notifications.length,
      pending: notifications.filter((n: any) => n?.status === "pending").length,
      accept: notifications.filter((n: any) => n?.status === "accept").length,
      reject: notifications.filter((n: any) => n?.status === "reject").length,
    };
  }, [notifications]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] font-quicksand">
      <Header
        Profile={Profile}
        logOutUser={logOutUser}
        navigate={"/admin-login"}
        updateProfileImg={updateProfileImg}
        isAdmin={true}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent flex items-center gap-3">
              <Bell className="w-8 h-8 text-teal-400" />
              Notifications
            </h1>
            <p className="text-gray-400 mt-1">
              Manage employee requests and notifications
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border border-gray-800/50 p-4 mb-6 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-gray-400">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 cursor-pointer ${
                  filter === "all"
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-500/30"
                    : "bg-[#0a0a0a] text-gray-400 hover:text-white border border-gray-700/50 hover:border-teal-500/30"
                }`}
              >
                All ({counts.all})
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 cursor-pointer ${
                  filter === "pending"
                    ? "bg-teal-600 text-white shadow-lg shadow-teal-500/30"
                    : "bg-[#0a0a0a] text-gray-400 hover:text-white border border-gray-700/50 hover:border-teal-500/30"
                }`}
              >
                Pending ({counts.pending})
              </button>
              <button
                onClick={() => setFilter("accept")}
                className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 cursor-pointer ${
                  filter === "accept"
                    ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                    : "bg-[#0a0a0a] text-gray-400 hover:text-white border border-gray-700/50 hover:border-green-500/30"
                }`}
              >
                Accepted ({counts.accept})
              </button>
              <button
                onClick={() => setFilter("reject")}
                className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 cursor-pointer ${
                  filter === "reject"
                    ? "bg-red-600 text-white shadow-lg shadow-red-500/30"
                    : "bg-[#0a0a0a] text-gray-400 hover:text-white border border-gray-700/50 hover:border-red-500/30"
                }`}
              >
                Rejected ({counts.reject})
              </button>
            </div>
          </div>
        </div>

        <NotificationsCards
          isLoading={isLoading}
          filteredNotifications={filteredNotifications}
        />
      </main>
    </div>
  );
};

export default Notifications;
