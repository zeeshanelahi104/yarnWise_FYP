import TransactionsReportTable from "@/components/Table/TransactionsReportTable";

export default function Page() {
  return (
    <>
      <div className="simgle-report-page-wrapper">
        <div className="report-table">
          <TransactionsReportTable />
        </div>
      </div>
    </>
  );
}
