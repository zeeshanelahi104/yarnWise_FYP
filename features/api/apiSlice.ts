import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath:'api',
    // baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3000/api'}),
    baseQuery: fetchBaseQuery({baseUrl:'https://yarnwise209.vercel.app/api'}),
    tagTypes:['Inventory', 'Transaction', 'User','Role', 'Broker', 'Party'],
    endpoints: builder => ({})
})

