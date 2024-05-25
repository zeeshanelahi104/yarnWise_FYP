import React from "react";
import ProtectedRoute from "@/components/PrivateRoute";
import AddPartyForm from "../../component/AddPartyForm";

const Page = () => {
  return (
    <ProtectedRoute requiredPermissions={["update"]} entity="party">
      <div>
        <AddPartyForm />
      </div>
    </ProtectedRoute>
  );
};

export default Page;
