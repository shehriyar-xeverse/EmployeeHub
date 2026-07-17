"use client";
import {
  Bell,
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  Mail,
  X,
  FileText,
  Download,
} from "lucide-react";
import Image from "next/image";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { handleDownload } from "@/hooks/fileDownload";
import React from "react";

const CardContent = ({
  filteredNotifications,
  handleApprove,
  handleReject,
  loading,
  rejectLoading,
}: any) => {
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const statusConfig: any = {
    pending: {
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },
    accept: {
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
      badge: "bg-green-500/10 text-green-400 border-green-500/20",
    },
    reject: {
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      badge: "bg-red-500/10 text-red-400 border-red-500/20",
    },
  };
  const statusIcons: any = {
    pending: <Clock className="w-4 h-4 text-yellow-400" />,
    accept: <CheckCircle className="w-4 h-4 text-green-400" />,
    reject: <X className="w-4 h-4 text-red-400" />,
  };

  return (
    <>
      {filteredNotifications?.map((notif: any) => {
        const status = notif?.status || "pending";
        const config = statusConfig[status];
        const Icon = statusIcons[status] || (
          <Bell className="w-4 h-4 text-teal-400" />
        );
        const disableApprove = status === "accept";
        const disableReject = status === "reject";
        return (
          <div
            key={notif?.id}
            className={`group bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl border ${
              status === "pending"
                ? "border-teal-500/30 shadow-lg shadow-teal-500/5"
                : "border-gray-800/50"
            } p-5 hover:border-teal-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/10`}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center`}
                  >
                    {Icon}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white group-hover:text-teal-400 transition-colors">
                      {notif?.title || "Request"}
                    </h4>
                    <p className="text-sm text-gray-400">{notif?.message}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {notif?.time}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.badge}`}
                  >
                    {status}
                  </span>
                  {status === "pending" && (
                    <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[#0a0a0a] rounded-xl border border-gray-800/50">
                {/* Profile Image - Increased Size */}
                <div className="flex items-center gap-3 col-span-1">
                  <div className="relative flex-shrink-0">
                    {notif?.profile_image ? (
                      <Image
                        src={notif?.profile_image || "/avatar.png"}
                        alt="Profile"
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center text-white font-bold text-lg border-2 border-gray-700">
                        {getInitials(notif?.name)}
                      </div>
                    )}
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full ${config.bg} border-2 border-[#0a0a0a]`}
                    >
                      {Icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="text-sm font-medium text-white truncate">
                      {notif?.name || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-teal-500/10 rounded-lg">
                    <Mail className="w-3.5 h-3.5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-white truncate">
                      {notif?.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-teal-500/10 rounded-lg">
                    <Building2 className="w-3.5 h-3.5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="text-sm font-medium text-white truncate">
                      {notif?.department || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-teal-500/10 rounded-lg">
                    <DollarSign className="w-3.5 h-3.5 text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Salary</p>
                    <p className="text-sm font-medium text-white truncate">
                      ${notif?.salary || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-800/30">
                <button
                  onClick={() => handleApprove(notif?.id)}
                  disabled={loading || disableApprove}
                  className="px-5 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg border border-green-500/20 transition-all duration-300 cursor-pointer text-sm font-medium flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                >
                  <CheckCircle className="w-4 h-4" />
                  {loading ? (
                    <Spinner className="text-gray-300 w-4 h-4" />
                  ) : (
                    "Approve"
                  )}
                </button>
                <button
                  onClick={() => handleReject(notif?.id)}
                  disabled={rejectLoading || disableReject}
                  className="px-5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-all duration-300 cursor-pointer text-sm font-medium flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
                >
                  <X className="w-4 h-4" />
                  {rejectLoading ? (
                    <Spinner className="text-gray-300 w-4 h-4" />
                  ) : (
                    "Reject"
                  )}
                </button>

                {status === "accept" && (
                  <span className="ml-auto text-xs text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Already Approved
                  </span>
                )}
                {status === "reject" && (
                  <span className="ml-auto text-xs text-red-400 flex items-center gap-1">
                    <X className="w-3.5 h-3.5" /> Already Rejected
                  </span>
                )}
              </div>

              {notif?.employee_file && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-gray-800 bg-[#0a0a0a]">
                  <div className="flex flex-col gap-4 border-b border-gray-800 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/20">
                        <FileText className="h-5 w-5 text-teal-400" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          Employee Document
                        </h3>
                        <p className="text-xs text-gray-400">
                          Preview the uploaded document or download it.
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleDownload(notif?.employee_file)}
                      className="flex items-center gap-2 bg-teal-600 text-white
                       hover:bg-teal-500   cursor-pointer"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  <div className="p-4">
                    <iframe
                      src={`${notif?.employee_file}#toolbar=0&navpanes=0&scrollbar=0`}
                      title="Employee Document"
                      className="w-full max-w-[320px] h-[200px] rounded-lg border border-gray-700 bg-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default React.memo(CardContent);
