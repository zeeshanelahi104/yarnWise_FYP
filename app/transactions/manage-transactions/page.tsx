// import TransactionTable from "@/components/Table/TransactionTable";

// export default function Page(){
//     return(
//         <>
//             <TransactionTable />
//         </>
//     )
// }

"use client";
import RootLayout from "@/app/layout";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/PrivateRoute";
import TransactionTable from "@/components/Table/TransactionTable";
import { useGetTransactionsQuery } from "@/features/transactionSlice";
import React from "react";

const Page = () => {
  const { isLoading, isSuccess, isError, error } = useGetTransactionsQuery();

  return (
    <ProtectedRoute requiredPermissions={["view"]} entity="transaction">
      <RootLayout applyMargins={false}>
        <div className="mx-4 min-h-[100vh] bg-white text-light-primary rounded">
          {isLoading && <Loader style="items-center h-[70vh]" />}
          {!isLoading && <TransactionTable />}
        </div>
      </RootLayout>
    </ProtectedRoute>
  );
};

export default Page;
