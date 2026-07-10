import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const notificationApi = createApi({
  reducerPath: "NotificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
  // get All Notify
    getNotifications: builder.query({
      query: () => "/notifications",
    }),

    // approve notify
    approveNotify: builder.mutation({
      query: ({id,adminId}) => ({
        url: `/approve-notify`,
        method: "POST",
        body : {id,adminId},
      }),
    }),

    // reject notify
    rejectNotify:builder.mutation({
      query: ({id,adminId}) => ({
        url: `/reject-notify`,
        method: "POST",
        body : {id,adminId},
      }),
    }),
  }),
});



export const {
    useGetNotificationsQuery,
    useApproveNotifyMutation,
    useRejectNotifyMutation
} = notificationApi;
