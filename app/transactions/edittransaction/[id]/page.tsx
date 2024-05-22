import React from "react";
import AddTransactionForm from "../../component/AddTransactionForm";
import ProtectedRoute from "@/components/PrivateRoute";

const Page = () => {
  return (
    <>
      <ProtectedRoute requiredPermissions={["update"]} entity="transaction">
        <AddTransactionForm />
      </ProtectedRoute>
    </>
  );
};

export default Page;
