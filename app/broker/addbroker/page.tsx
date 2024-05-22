import React from "react";
import ProtectedRoute from "@/components/PrivateRoute";
import AddBrokerForm from "../component/addBrokerForm";

const Page = () => {
  return (
    <ProtectedRoute requiredPermissions={["create"]} entity="role">
      <div>
        <AddBrokerForm />
      </div>
    </ProtectedRoute>
  );
};

export default Page;
