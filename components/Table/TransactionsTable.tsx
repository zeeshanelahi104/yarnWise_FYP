import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import Link from "next/link";
  import { FaPen } from "react-icons/fa";
  import { MdDelete } from "react-icons/md";
  

export default function Transactionsrecord(){
    return(
        <>
            <div className="transcations-record-page-wrapper container flex flex-col justify-center gap-10 pt-[45px]">
                <div className="title text-primary-clr text-center">Transactions Record</div>
                <div className="transactions-table">
                <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="border-2 border-black">
            <TableRow>
              <TableHead className="text-center text-primary-clr font-bold uppercase border-2 border-black">
                T-ID
              </TableHead>
              <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                Product Name
              </TableHead>
              <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                Product Count
              </TableHead>
              <TableHead className="px-6 py-4 whitespace-nowrap text-primary-clr text-center font-bold uppercase border-2 border-black">
                Product Brand
              </TableHead>
              <TableHead className="px-6 py-4 whitespace-nowrap text-primary-clr text-center font-bold uppercase border-2 border-black">
                Party Name
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                Party Area
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                Contact Number
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                Quantity
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                Unit Price
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
               Total Bill
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                Broker Name
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-center border-2 border-black">
                xxxxxx
              </TableCell>
              <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                Product Name
              </TableHead>
              <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                Product Count
              </TableHead>
              <TableHead className="px-6 py-4 whitespace-nowrap text-primary-clr text-center font-bold uppercase border-2 border-black">
                Product Brand
              </TableHead>
              <TableHead className="px-6 py-4 whitespace-nowrap text-primary-clr text-center font-bold uppercase border-2 border-black">
                Party Name
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                Party Area
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                Contact Number
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                Quantity
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                Unit Price
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
               Total Bill
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                Broker Name
              </TableHead>
              <TableCell className="border-2 border-black">
                <div className="flex justify-end gap-[20px]">
                  <Link href="/update-user">
                    <FaPen size={20} className="text-primary-clr" />
                  </Link>
                  <Link href={"/"}>
                    <MdDelete size={20} className="text-primary-clr" />
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
                </div>
            </div>
        </>
    )
}