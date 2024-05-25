import {  Party } from "@/types";
import { apiSlice } from "./api/apiSlice";

export const PartySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParties: builder.query<any, void>({
      query: () => "/party",
      providesTags:['Party']
    }),
    getParty: builder.query({
      query: (id) => ({
        url: `/party/${id}`,
        method: "GET",
      }),
      providesTags:['Party']
    }),
   
    addParty: builder.mutation({
      query: (Party) => ({
        url: "/party",
        method: "POST",
        body: Party,
      }),
      invalidatesTags:["Party"]
    }),
    updateParty: builder.mutation({
      query: ({ PartyId, body }: { PartyId: string; body: Party }) => ({
        url: `/party/${PartyId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Party"],
    }),
    deleteParty: builder.mutation({
      query: (id:string) => ({
        url: `/party/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Party"],
    })
  }),
});

export const { useGetPartiesQuery, useGetPartyQuery, useAddPartyMutation,useUpdatePartyMutation,useDeletePartyMutation} = PartySlice;
