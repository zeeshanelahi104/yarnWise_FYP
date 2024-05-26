"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Party, Transaction } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { FaPen, FaPrint, FaSearch, FaArrowLeft } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  useDeletePartyMutation,
  useGetPartiesQuery,
} from "@/features/partySlice";
interface PartyTableProps {}

const ITEMS_PER_PAGE = 5;

const PartyTable: React.FC<PartyTableProps> = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetPartiesQuery();
  const [deleteParty] = useDeletePartyMutation();

  const handleDeleteParty = (id: string) => {
    deleteParty(id)
      .unwrap()
      .then(() => {
        toast.success("Party Deleted");
        setFilteredData((prevData: any[]) =>
          prevData.filter((item) => item._id !== id)
        );
      })
      .catch(() => {
        toast.error("Error, Deleting Party");
      });
  };
  const router = useRouter();
  const partyRecord = data?.party;
  const [filteredData, setFilteredData] = useState(partyRecord);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const totalPages = Math.ceil(filteredData?.length / ITEMS_PER_PAGE);
  const { data: session } = useSession();

  const permissionCheck = session?.user.permissions.party.includes("delete");

  const goToPage = (page: any) => {
    setCurrentPage(page);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleSearch = () => {
    const filteredData = partyRecord?.filter((item: any) =>
      item.partyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, partyRecord]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData?.length);
  const currentItems = partyRecord?.slice(startIndex, endIndex);

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="transcations-record-page-wrapper container flex flex-col justify-center pt-[45px]">
        <div className="table-head-wrapper w-full mt-10 flex items-center justify-between border-2 border-black py-4 px-4">
          {!showSearchInput && (
            <>
              <h3 className="text-barlow text-[#364A63] font-bold text-[19px] leading-[19px]">
                Parties
              </h3>
              <div className="icons-wrapper flex justify-between gap-3">
                <button onClick={() => setShowSearchInput(true)}>
                  <FaSearch className="w-[16px]" />
                </button>
              </div>
            </>
          )}
          {showSearchInput && (
            <div className="flex justify-between w-full">
              <button onClick={() => setShowSearchInput(false)}>
                <FaArrowLeft className=" mr-2 flex justify-center items-center w-[16px]" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                className="px-2 w-full focus:outline-none rounded"
                placeholder="Search by Product Name..."
              />
              <button
                onClick={handleSearch}
                className=" text-white px-4 py-1 rounded"
              >
                <FaSearch className="w-[16px]" />
              </button>
            </div>
          )}
        </div>
        <div className="transactions-table">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="border-2 border-black">
              <TableRow>
                <TableHead className="text-center text-[11px] text-primary-clr font-bold uppercase border-2 border-black">
                  ID
                </TableHead>
                <TableHead className="text-primary-clr text-[11px] text-center font-bold uppercase border-2 border-black">
                  Party Name
                </TableHead>
                <TableHead className="text-primary-clr text-[11px] text-center font-bold uppercase border-2 border-black">
                  Owner Name
                </TableHead>
                <TableHead className=" text-primary-clr text-[11px] text-center font-bold uppercase border-2 border-black">
                  Party Area
                </TableHead>
                <TableHead className=" text-primary-clr text-[11px] text-center font-bold uppercase border-2 border-black">
                  Address
                </TableHead>
                <TableHead className=" text-primary-clr text-[11px] text-center font-bold uppercase border-2 border-black">
                  Contact Number
                </TableHead>
                <TableHead className=" text-primary-clr text-[11px] text-center font-bold uppercase border-2 border-black">
                  Balance
                </TableHead>
                <TableHead className=" text-primary-clr text-[11px] text-center font-bold uppercase border-2 border-black">
                  Status
                </TableHead>
                <TableHead className=" text-primary-clr text-[11px] text-center font-bold uppercase border-2 border-black">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems &&
                currentItems?.map((party: Party, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-[11px] text-center border-2 border-black">
                      {party?._id
                        ? party?._id
                            .substring(party?._id.length - 4)
                            .toUpperCase()
                        : ""}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-[11px] whitespace-nowrap text-center border-2 border-black">
                      {party.partyName}
                    </TableCell>
                    <TableCell className="text-center text-[11px] border-2 border-black">
                      {party.ownerName}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {party.partyArea}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {party.address}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {party.contactNumber}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {party.balance}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {party.status}
                    </TableCell>
                    <TableCell className="border-2 border-black">
                      <div className="flex justify-end gap-[20px]">
                        <Link href={`/parties/editparty/${party?._id}`}>
                          <FaPen size={20} className="text-primary-clr" />
                        </Link>
                        <button>
                          {permissionCheck === false ? (
                            <div></div>
                          ) : (
                            <MdDelete
                              size={20}
                              className="text-primary-clr"
                              onClick={() =>
                                handleDeleteParty(party?._id ? party._id : "")
                              }
                            />
                          )}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <div className="pagination-controls flex justify-center py-2 border-2 border-black px-4">
              <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className="border border-black w-9 flex justify-center items-center rounded-[2px] hover:bg-[#DBDFEA]"
              >
                <FiChevronsLeft className="w-[14px]" color="black" />
              </button>
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="border border-black w-9 flex justify-center items-center hover:bg-[#DBDFEA]"
              >
                <ChevronLeft className="w-[10px]" color="black" />
              </button>

              {[...Array(totalPages).keys()].map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum + 1)}
                  className={
                    currentPage === pageNum + 1
                      ? "text-black bg-primary-clr w-9 h-10  font-medium"
                      : "border border-black hover:text-cyan hover:bg-[#DBDFEA] text-black font-medium w-9"
                  }
                >
                  {pageNum + 1}
                </button>
              ))}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="border border-black w-9 flex justify-center items-center hover:bg-[#DBDFEA]"
              >
                <ChevronRight className="w-[10px]" color="black" />
              </button>
              <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                className="border border-black w-9 flex justify-center items-center hover:bg-[#DBDFEA]"
              >
                <FiChevronsRight
                  color="black"
                  className="w-[14px] text-primary-clr cursor-pointer"
                />
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-10">
          <button
            className="flex justify-end uppercase font-bold"
            onClick={() => window.print()}
          >
            Print
            <FaPrint size={25} className="ml-2" />
          </button>
        </div>
      </div>
    </>
  );
};
export default PartyTable;
