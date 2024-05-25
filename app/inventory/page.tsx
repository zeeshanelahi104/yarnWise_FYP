"use client";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/PrivateRoute";
import InventoryTable from "@/components/Table/InventoryTable";
import { useGetInventoriesQuery } from "@/features/inventorySlice";
import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const { isLoading, isSuccess, isError, error } = useGetInventoriesQuery();

  const { data } = useSession();

  return (
    <ProtectedRoute requiredPermissions={["view"]} entity="inventory">
      <div className="m-4 mt-14 min-h-[100vh] bg-white text-light-primary p-4 rounded">
        {isLoading && <Loader style="items-center h-[70vh]" />}
        {!isLoading && <InventoryTable />}
      </div>
    </ProtectedRoute>
  );
};

export default Page;
