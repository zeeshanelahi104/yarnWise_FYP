"use client";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/PrivateRoute";
import BrokerTable from "@/components/Table/BrokerTable";
import { useGetRolesQuery } from "@/features/roleSlice";
import React from "react";

const Page = () => {
  const { isLoading, isSuccess, isError, error } = useGetRolesQuery();

  return (
    <ProtectedRoute requiredPermissions={["view"]} entity="broker">
      <div className="m-4 mt-14 min-h-[100vh] bg-white text-light-primary p-4 rounded">
        {isLoading && <Loader style="items-center h-[70vh]" />}
        {!isLoading && <BrokerTable />}
      </div>
    </ProtectedRoute>
  );
};

export default Page;
