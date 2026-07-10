import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "employeeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
    credentials: "include",
  }),
  // refetchOnFocus: false,
  // refetchOnReconnect: false,
  // keepUnusedDataFor: 300,

  tagTypes: ["Employee"],

  endpoints: (builder) => ({
    // add Employee
    addEmployee: builder.mutation({
      query: (employeeData) => ({
        url: "/add-Employee",
        method: "POST",
        body: employeeData,
      }),
      
    }),

    //fetchSingleEmployee
    getSingleEmployee: builder.query({
      query: (id) => ({
        url: `/getSingle-Employee/${id}`,
      }),
     
    }),

    // get ALL Employees
    getAllEmployees: builder.query({
      query: () => ({
        url: `/getAllEmployees`,
      }),
      
    }),

    //deleteEmployee
     deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/delete-Employee/${id}`,
        method: "DELETE",
      }),
      
    }),

    // update Employee
    updateEmployee: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/edit-employees/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      
    }),


    // ***************** for employees *******************************
      addEmployeeReq: builder.mutation({
      query: (employeeData) => ({
        url: "/add-Employee-Req",
        method: "POST",
        body: employeeData,
      }),
    }),


     deleteEmployeeReq: builder.mutation({
      query: (id) => ({
        url: `/delete-EmployeeReq/${id}`,
        method: "DELETE",
      }),
    }),

    // get Employee Own Request 
    employeeRequest: builder.query({
      query: () => "/employee-Request",
      
    }),


  

  }),
});


export const {
  useAddEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetSingleEmployeeQuery,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  // For Emolyeee
  useAddEmployeeReqMutation,
  useDeleteEmployeeReqMutation,
  useEmployeeRequestQuery
} = employeeApi;