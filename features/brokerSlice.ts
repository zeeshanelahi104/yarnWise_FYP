import {  Broker } from "@/types";
import { apiSlice } from "./api/apiSlice";

export const BrokerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrokers: builder.query<any, void>({
      query: () => "/broker",
      providesTags:['Broker']
    }),
    getBroker: builder.query({
      query: (id) => ({
        url: `/broker/${id}`,
        method: "GET",
      }),
      providesTags:['Broker']
    }),
   
    addBroker: builder.mutation({
      query: (Broker) => ({
        url: "/broker",
        method: "POST",
        body: Broker,
      }),
      invalidatesTags:["Broker"]
    }),
    updateBroker: builder.mutation({
      query: ({ brokerId, body }: { brokerId: string; body: Broker }) => ({
        url: `/broker/${brokerId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Broker"],
    }),
    deleteBroker: builder.mutation({
      query: (id:string) => ({
        url: `/broker/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Broker"],
    })
  }),
});

export const { useGetBrokersQuery, useGetBrokerQuery, useAddBrokerMutation,useUpdateBrokerMutation,useDeleteBrokerMutation} = BrokerSlice;
