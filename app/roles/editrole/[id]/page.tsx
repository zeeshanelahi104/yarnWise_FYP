import React from "react";
import AddRoleForm from "../../component/AddRoleForm";
import ProtectedRoute from "@/components/PrivateRoute";

const Page = () => {
  return (
    <ProtectedRoute requiredPermissions={["update"]} entity="role">
      <div>
        <AddRoleForm />
      </div>
    </ProtectedRoute>
  );
};

export default Page;
