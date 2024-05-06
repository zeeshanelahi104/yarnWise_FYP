import BrokerTable from "@/components/Table/BrokerTable"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa"

export default function Page(){
    return(
        <>
            <div className="simgle-report-page-wrapper">
                <div className="page-heading flex justify-between items-center">
                    <div className="back-btn">
                        <Link href={"/reports"}>
                            <FaArrowLeft color={"primary-clr"} size={20}/>
                        </Link>
                    </div>
                    <div className="page-heading">
                    <h1 className="title text-primary-clr text-center">Transactions Report</h1>
                    </div>
                    <div></div>
                </div>
                <div className="report-table">
                    <BrokerTable />
                </div>
            </div>
        </>
    )
}