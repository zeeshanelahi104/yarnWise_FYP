import ProtectedRoute from "@/components/PrivateRoute";
import AddTransactionForm from "../component/AddTransactionForm";

export default function Page() {
  return (
    <>
      <ProtectedRoute requiredPermissions={["create"]} entity="transaction">
        <AddTransactionForm />
      </ProtectedRoute>
    </>
  );
}
