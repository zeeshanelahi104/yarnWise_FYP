import BrokerReportTable from "@/components/Table/BrokerReportTable"

export default function Page(){
    return(
        <>
            <div className="simgle-report-page-wrapper">
                
                <div className="report-table">
                    <BrokerReportTable />
                </div>
            </div>
        </>
    )
}