import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useUpdateEmployeeMutation } from "./employeeApi";

export const adminApi = createApi({
  reducerPath: "adminApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
    credentials: "include",
  }),
  tagTypes: ["Admin"],

  endpoints: (builder) => ({
    registerAdmin: builder.mutation({
      query: (userData) => ({
        url: "/register-Admin",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["Admin"],
    }),

    loginAdmin: builder.mutation({
      query: (loginData) => ({
        url: "/login-Admin",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["Admin"],
    }),

    logOutAdmin: builder.mutation<void, void>({
      query: () => ({
        url: "/logout-Admin",
        method: "POST",
      }),
      invalidatesTags: ["Admin"],
    }),


    // get All asmins
    getAdmins: builder.query({
      query: () => "/admins",
      providesTags: ["Admin"],
    }),


    // get Profile
    AdminProfile: builder.query({
      query: () => "/admin-profile",
      providesTags: ["Admin"],
    }),



    // chnage Profile Image  
      updateProfileImg: builder.mutation({
      query: (image) => ({
        url: "/update-profile-image",
        method: "PUT",
        body: image,
      }),
      // invalidatesTags: ["Admin"],
    }),
  }),
});


//  useGetProfileQuery,
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useGetUsersQuery,
//   useLogOutUserMutation,
//   useUpdateProfileImgMutation

export const {
  useRegisterAdminMutation,
  useLoginAdminMutation,
  useLogOutAdminMutation,
  useGetAdminsQuery,
  useAdminProfileQuery,
  useUpdateProfileImgMutation,
} = adminApi;
