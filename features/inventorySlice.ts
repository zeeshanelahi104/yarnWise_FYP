import {  Inventory } from "@/types";
import { apiSlice } from "./api/apiSlice";

export const inventorytSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventories: builder.query<any, void>({
      query: () => "/inventory",
      providesTags:['Inventory']
    }),
    getInventory: builder.query({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: "GET",
      }),
      providesTags:['Inventory']
    }),
   
    addInventory: builder.mutation({
      query: (patient) => ({
        url: "/inventory",
        method: "POST",
        body: patient,
      }),
      invalidatesTags:["Inventory"]
    }),
    updateInventory: builder.mutation({
      query: ({ inventoryId, body }: { inventoryId: string; body: Inventory }) => ({
        url: `/inventory/${inventoryId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Inventory"],
    }),
    deleteInventory: builder.mutation({
      query: (id:string) => ({
        url: `/inventory/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Inventory"],
    })
  }),
});

export const { useGetInventoriesQuery, useGetInventoryQuery, useAddInventoryMutation,useUpdateInventoryMutation,useDeleteInventoryMutation} = inventorytSlice;
