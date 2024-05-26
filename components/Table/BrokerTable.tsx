"use client";
import { Broker } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { FaPen, FaPrint, FaSearch, FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useDeleteBrokerMutation,
  useGetBrokersQuery,
} from "@/features/brokerSlice";
import { useSession } from "next-auth/react";

interface BrokerTableProps {}

const ITEMS_PER_PAGE = 5;

const BrokerTable: React.FC<BrokerTableProps> = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetBrokersQuery();
  const [deleteBroker] = useDeleteBrokerMutation();

  const handleDeleteBroker = (id: string) => {
    deleteBroker(id)
      .unwrap()
      .then(() => {
        toast.success("Broker Deleted");
        setFilteredData((prevData: any[]) =>
          prevData.filter((item) => item._id !== id)
        );
      })
      .catch(() => {
        toast.error("Error, Deleting Broker");
      });
  };
  const router = useRouter();
  const brokerRecord = data?.broker;
  const [filteredData, setFilteredData] = useState(brokerRecord);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const totalPages = Math.ceil(filteredData?.length / ITEMS_PER_PAGE);
  const { data: session } = useSession();

  const permissionCheck = session?.user.permissions.broker.includes("delete");

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
    const filteredData = brokerRecord?.filter((item: any) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, brokerRecord]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData?.length);
  const currentItems = filteredData?.slice(startIndex, endIndex);

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="products-wrapper w-full container">
      <div className="text-center">
        <h1 className="title text-primary-clr w-full">Brokers</h1>
      </div>
      <div className="table-head-wrapper w-full mt-10 flex items-center justify-between border-2 border-black py-4 px-4">
        {!showSearchInput && (
          <>
            <h3 className="text-barlow text-[#364A63] font-bold text-[19px] leading-[19px]">
              Broker
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
      <div className="products-table-wrapper">
        <Table>
          <TableHeader className="border-2 border-black">
            <TableRow>
              <TableHead className="text-center text-primary-clr font-bold uppercase border-2 border-black">
                ID
              </TableHead>
              <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                Name
              </TableHead>
              <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                Contact No.
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
            {currentItems?.map((broker: Broker, index: number) => (
              <TableRow key={index}>
                <TableCell className="px-6 py-4 whitespace-nowrap font-medium text-center border-2 border-black">
                  {broker?._id
                    ? broker._id.substring(broker._id.length - 4).toUpperCase()
                    : ""}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-center border-2 border-black">
                  {broker.name}
                </TableCell>
                <TableCell className="text-center border-2 border-black">
                  {broker.contactNumber}
                </TableCell>
                <TableCell className="text-center border-2 border-black">
                  {broker.address}
                </TableCell>

                <TableCell className="border-2 border-black">
                  <div className="flex justify-end gap-[20px]">
                    <Link href={`/broker/editbroker/${broker?._id}`}>
                      <FaPen className="text-primary-clr cursor-pointer mt-1" />
                    </Link>
                    {permissionCheck === false ? (
                      <div></div>
                    ) : (
                      <MdDelete
                        size={20}
                        className="text-primary-clr cursor-pointer"
                        onClick={() =>
                          handleDeleteBroker(broker?._id ? broker._id : "")
                        }
                      />
                    )}
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
              <FiChevronsRight className="w-[14px]" color="black" />
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
  );
};

export default BrokerTable;
