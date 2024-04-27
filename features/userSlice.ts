import {  UserTypes } from "@/types";
import { apiSlice } from "./api/apiSlice";

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => "/user",
      providesTags:['User']
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags:['User']
    }),
   
    addUser: builder.mutation({
      query: (user) => ({
        url: "/user",
        method: "POST",
        body: user,
      }),
      invalidatesTags:["User"]
    }),
    updateUser: builder.mutation({
      query: ({ userId, body }: { userId: string; body: UserTypes }) => ({
        url: `/user/${userId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id:string) => ({
        url: `/user/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["User"],
    })
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useAddUserMutation,useUpdateUserMutation,useDeleteUserMutation} = userSlice;
