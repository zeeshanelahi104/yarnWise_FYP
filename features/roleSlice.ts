import {  Role } from "@/types";
import { apiSlice } from "./api/apiSlice";

export const roleSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoles: builder.query<any, void>({
      query: () => "/role",
      providesTags:['Role']
    }),
    getRole: builder.query({
      query: (id) => ({
        url: `/role/${id}`,
        method: "GET",
      }),
      providesTags:['Role']
    }),
   
    addRole: builder.mutation({
      query: (role) => ({
        url: "/role",
        method: "POST",
        body: role,
      }),
      invalidatesTags:["Role"]
    }),
    updateRole: builder.mutation({
      query: ({ roleId, body }: { roleId: string; body: Role }) => ({
        url: `/role/${roleId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
    deleteRole: builder.mutation({
      query: (id:string) => ({
        url: `/role/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Role"],
    })
  }),
});

export const { useGetRolesQuery, useGetRoleQuery, useAddRoleMutation,useUpdateRoleMutation,useDeleteRoleMutation} = roleSlice;
