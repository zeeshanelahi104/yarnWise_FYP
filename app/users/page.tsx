"use client";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/PrivateRoute";
import UsersTable from "@/components/Table/UsersTable";
import { useGetUsersQuery } from "@/features/userSlice";
import React from "react";

const Page = () => {
  const { isLoading, isSuccess, isError, error } = useGetUsersQuery();

  return (
    <ProtectedRoute requiredPermissions={["view"]} entity="user">
      <div className="m-4 mt-14 min-h-[100vh] bg-white text-light-primary p-4 rounded">
        {isLoading && <Loader style="items-center h-[70vh]" />}
        {!isLoading && <UsersTable />}
      </div>
    </ProtectedRoute>
  );
};

export default Page;
