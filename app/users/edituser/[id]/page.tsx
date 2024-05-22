import React from "react";
import AddUserForm from "../../component/AddUserForm";
import ProtectedRoute from "@/components/PrivateRoute";

const Page = () => {
  return (
    <>
      <ProtectedRoute requiredPermissions={["update"]} entity="user">
        <AddUserForm />
      </ProtectedRoute>
    </>
  );
};

export default Page;
