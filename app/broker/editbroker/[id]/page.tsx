import React from "react";
import ProtectedRoute from "@/components/PrivateRoute";
import AddBrokerForm from "../../component/AddBrokerForm";

const Page = () => {
  return (
    <ProtectedRoute requiredPermissions={["update"]} entity="broker">
      <AddBrokerForm />
    </ProtectedRoute>
  );
};

export default Page;
