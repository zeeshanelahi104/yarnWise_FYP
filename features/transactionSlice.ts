import {  Transaction } from "@/types";
import { apiSlice } from "./api/apiSlice";

export const transactionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<any, void>({
      query: () => "/transaction",
      providesTags:['Transaction']
    }),
    getTransaction: builder.query({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: "GET",
      }),
      providesTags:['Transaction']
    }),
   
    addTransaction: builder.mutation({
      query: (transaction) => ({
        url: "/transaction",
        method: "POST",
        body: transaction,
      }),
      invalidatesTags:["Transaction"]
    }),
    updateTransaction: builder.mutation({
      query: ({ transactionId, body }: { transactionId: string; body: Transaction }) => ({
        url: `/transaction/${transactionId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Transaction"],
    }),
    deleteTransaction: builder.mutation({
      query: (id:string) => ({
        url: `/transaction/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Transaction"],
    })
  }),
});

export const { useGetTransactionsQuery, useGetTransactionQuery, useAddTransactionMutation,useUpdateTransactionMutation,useDeleteTransactionMutation} = transactionSlice;
