'use client'
import Loader from '@/components/Loader';
import RolesTable from '@/components/Table/RolesTable';
import { useGetRolesQuery } from '@/features/roleSlice';
import React from 'react'

const Page = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetRolesQuery();

    return (
    <div className='m-4 mt-14 min-h-[100vh] bg-white text-light-primary p-4 rounded'>
        {isLoading && (<Loader style="items-center h-[70vh]" />)}
        {!isLoading && (
        <RolesTable />
        )}
    </div>
  )
}

export default Page