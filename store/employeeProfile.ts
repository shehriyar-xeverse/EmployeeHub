import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const employeeProfileApi = createApi({
  reducerPath: "employeeProfileApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
    credentials: "include",
  }),
  tagTypes: ["EmployeeProfile"],

  endpoints: (builder) => ({

    signUpEmployee: builder.mutation({
      query: (userData) => ({
        url: "/signup-employee",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["EmployeeProfile"],
    }),

    loginEmployee: builder.mutation({
      query: (loginData) => ({
        url: "/login-employee",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["EmployeeProfile"],
    }),

    logOutEmployee: builder.mutation<void, void>({
      query: () => ({
        url: "/logout-employee",
        method: "POST",
      }),
      invalidatesTags: ["EmployeeProfile"],
    }),

    // get Profile
    employeeProfile: builder.query({
      query: () => "/employee-profile",
      providesTags: ["EmployeeProfile"],
    }),

    // chnage Profile Image  
      updateEmployeeProfileImg: builder.mutation({
      query: (image) => ({
        url: "/update-employee-profileImage",
        method: "PUT",
        body: image,
      }),
      invalidatesTags: ["EmployeeProfile"],
    }),
  }),
});




export const {
  useSignUpEmployeeMutation,
  useLoginEmployeeMutation,
  useLogOutEmployeeMutation,
  useEmployeeProfileQuery,
  useUpdateEmployeeProfileImgMutation
} = employeeProfileApi;
