import BrokerTable from "@/components/Table/BrokerTable";
import TransactionsTable from "@/components/Table/TransactionTable";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
  return (
    <>
      <div className="simgle-report-page-wrapper">
        <div className="report-table">
          <TransactionsTable />
        </div>
      </div>
    </>
  );
}
