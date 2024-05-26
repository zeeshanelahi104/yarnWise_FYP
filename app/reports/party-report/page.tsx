import PartyReportTable from "@/components/Table/PartyReportTable";
import { FaArrowLeft } from "react-icons/fa";

export default function Page() {
  return (
    <>
      <div className="simgle-report-page-wrapper">
        <div className="report-table">
          <PartyReportTable />
        </div>
      </div>
    </>
  );
}
