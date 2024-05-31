"use client";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/PrivateRoute";
import PartyTable from "@/components/Table/PartyTable";
import { useGetRolesQuery } from "@/features/roleSlice";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const Page = () => {
  const { isLoading, isSuccess, isError, error } = useGetRolesQuery();

  return (
    <ProtectedRoute requiredPermissions={["view"]} entity="party">
      <div className="m-4 mt-14 min-h-[100vh] bg-white text-light-primary p-4 rounded">
        {isLoading && <Loader style="items-center h-[70vh]" />}
        {!isLoading && <PartyTable />}
      </div>
    </ProtectedRoute>
  );
};

export default Page;
