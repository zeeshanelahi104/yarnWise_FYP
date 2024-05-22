import React from "react";
import AddRoleForm from "../../component/AddRoleForm";
import ProtectedRoute from "@/components/PrivateRoute";

const Page = () => {
  return (
    <ProtectedRoute requiredPermissions={["view"]} entity="role">
      <div>
        <AddRoleForm />
      </div>
    </ProtectedRoute>
  );
};

export default Page;
