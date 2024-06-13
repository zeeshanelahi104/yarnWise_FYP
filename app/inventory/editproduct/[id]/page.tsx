import React from "react";
import AddProductForm from "../../component/AddProductForm";
import ProtectedRoute from "@/components/PrivateRoute";

const Page = () => {
  return (
    <ProtectedRoute requiredPermissions={["update"]} entity="inventory">
      <AddProductForm />
    </ProtectedRoute>
  );
};

export default Page;
