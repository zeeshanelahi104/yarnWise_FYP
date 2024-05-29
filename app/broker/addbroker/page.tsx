import React from "react";
import AddBrokerForm from "../component/AddBrokerForm";
import ProtectedRoute from "@/components/PrivateRoute";
const Page = () => {
  return (
    <ProtectedRoute requiredPermissions={["create"]} entity="broker">
      <div> 
        <AddBrokerForm />
      </div>
    </ProtectedRoute>
  );
};

export default Page;
