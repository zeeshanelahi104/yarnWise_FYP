import ProtectedRoute from "@/components/PrivateRoute";
import TransactionsTable from "@/components/Table/TransactionTable";
import TransactionPage from "@/components/components/Transactions/TransactionPage/TransactionPage";

export default function Page() {
  return (
    <>
      <ProtectedRoute requiredPermissions={["view"]} entity="transaction">
        <div className="flex">
          {/* <TransactionPage /> */}
          <TransactionsTable />
        </div>
      </ProtectedRoute>
    </>
  );
}
