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

export default function Transactionsrecord() {
  return (
    <>
      <div className="transcations-record-page-wrapper container flex flex-col justify-center gap-10 pt-[45px]">
        <div className="title text-primary-clr text-center">
          Transactions Record
        </div>
        <div className="transactions-table">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="border-2 border-black">
              <TableRow>
                <TableHead className="text-center text-primary-clr font-bold uppercase border-2 border-black">
                  T-ID
                </TableHead>
                <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                  Name
                </TableHead>
                <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                  Email
                </TableHead>
                <TableHead className="px-6 py-4 whitespace-nowrap text-primary-clr text-center font-bold uppercase border-2 border-black">
                  Contact Number
                </TableHead>
                <TableHead className="px-6 py-4 whitespace-nowrap text-primary-clr text-center font-bold uppercase border-2 border-black">
                  Whatsapp Number
                </TableHead>
                <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                  Role
                </TableHead>
                <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                  Address
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
                <TableCell className="px-6 py-4 whitespace-nowrap text-center border-2 border-black">
                  xxxxx
                </TableCell>
                <TableCell className="text-center border-2 border-black">
                  xxxxx
                </TableCell>
                <TableCell className="text-center border-2 border-black">
                  xxxxx
                </TableCell>
                <TableCell className="text-center border-2 border-black">
                  wp
                </TableCell>
                <TableCell className="text-center border-2 border-black">
                  role
                </TableCell>
                <TableCell className=" text-center border-2 border-black">
                  address
                </TableCell>
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
  );
}
