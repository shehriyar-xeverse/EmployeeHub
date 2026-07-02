import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",

  baseQuery: fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
  credentials: "include",
}),

  tagTypes: ["User"],

  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["User"],
    }),

   logOutUser: builder.mutation<void, void>({
  query: () => ({
    url: "/logout",
    method: "POST",
     providesTags: ["User"],
  }),
}),

    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),

    // get Profile 
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["User"],

    }),
  }),
});

export const {
  useGetProfileQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUsersQuery,
  useLogOutUserMutation
} = userApi;