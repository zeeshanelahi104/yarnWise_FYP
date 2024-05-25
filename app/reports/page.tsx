import Link from "next/link";

export default function Page(){
    return(
        <>
             <div className="reports-page-wrapper flex flex-col justify-center">
            <h1 className="title text-primary-clr text-center">Reports</h1>
            <div className="report-items grid grid-cols-2 p-20 gap-5">
                <div className="single-report-item border border-primary-clr flex justify-between items-center gap-x-2 gap-y-10">
                    <p className="ml-2">Generate Report For Broker</p>
                    <Link href="/reports/broker-report" className="px-3 py-2 text-center bg-primary-clr text-white font-bold">
                        Click To Generate
                    </Link>
                </div>
                <div className="single-report-item border border-primary-clr flex justify-between items-center gap-2">
                    <p className="ml-2">Generate Report For Party</p>
                    <Link href="/reports/party-report" className="px-3 py-2 text-center bg-primary-clr text-white font-bold">
                        Click To Generate
                    </Link>
                </div>
                <div className="single-report-item border border-primary-clr flex justify-between items-center gap-2">
                    <p className="ml-2 text-[14px]">Generate Report For Transactions</p>
                    <Link href="/reports/transactions-report" className="px-3 py-2 text-center bg-primary-clr text-white font-bold">
                        Click To Generate
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}