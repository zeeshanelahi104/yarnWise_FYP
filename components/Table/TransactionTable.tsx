
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SessionTypes, Transaction } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { FaPen, FaPrint, FaSearch, FaArrowLeft } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useDeleteTransactionMutation,
  useGetTransactionQuery,
  useGetTransactionsQuery,
} from "@/features/transactionSlice";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import {
  useGetInventoriesQuery,
  useUpdateInventoryMutation,
} from "@/features/inventorySlice";
import {
  useGetPartiesQuery,
  useUpdatePartyMutation,
} from "@/features/partySlice";
import { useGetBrokersQuery } from "@/features/brokerSlice";
interface TransactionTableProps {}

const ITEMS_PER_PAGE = 5;

interface InventoryItem {
  _id?: string;
  name: string;
  count: string;
  brand: string;
  stock: number;
}

interface PartyItem {
  _id?: string;
  partyName: string;
  ownerName: string;
  partyArea: string;
  address: string;
  contactNumber: string;
  balance: number;
  status: string;
}

interface BrokerItem {
  _id?: string;
  name: string;
  address: string;
  contactNumber: string;
}

const TransactionsTable: React.FC<TransactionTableProps> = () => {
  const [transactionId, setTransactionId] = useState("");
  const [inventories, setInventories] = useState<InventoryItem[]>([]);
  const [parties, setParties] = useState<PartyItem[]>([]);
  const [brokers, setBrokers] = useState<BrokerItem[]>([]);
  const [transaction, setTransaction] = useState<Transaction>({
    productName: "",
    productCount: "",
    brandName: "",
    unitPrice: 0,
    quantity: 0,
    totalBill: 0,
    partyName: "",
    partyArea: "",
    brokerName: "",
    brokerCommissionPercentage: 0,
    transactionType: "",
    debit: 0,
    credit: 0,
    balance: 0,
    status: "",
    createdAt: "",
  });

  const { data, isLoading, isSuccess, isError, error } =
    useGetTransactionsQuery();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const [updateInventory] = useUpdateInventoryMutation();
  const [updateParty] = useUpdatePartyMutation();
  const { data: inventoriesData } = useGetInventoriesQuery();
  const { data: partiesData,refetch: refetchParties} = useGetPartiesQuery();
  const { data: brokersData } = useGetBrokersQuery();
  const { data: transactions } = useGetTransactionQuery(transactionId);

  useEffect(() => {
    if (transactions && transactions.transaction) {
      setTransaction(transactions.transaction);
    }
    if (inventoriesData && inventoriesData.inventory) {
      setInventories(inventoriesData.inventory);
    }
    if (partiesData && partiesData.party) {
      setParties(partiesData.party);
    }
    if (brokersData && brokersData.broker) {
      setBrokers(brokersData.broker);
    }
  }, [transactions, inventoriesData, partiesData, brokersData]);

  const updateStock = async (
    inventoryItem: InventoryItem,
    newStock: number
  ) => {
    if (!inventoryItem?._id) {
      console.error("Inventory item ID is undefined. Cannot update stock.");
      return;
    }
    const updatedInventory = { ...inventoryItem, stock: newStock };
    await updateInventory({
      inventoryId: inventoryItem?._id,
      body: updatedInventory,
    }).unwrap();
  };

  const updateBalanceAndStatus = async (
    partyItem: PartyItem,
    newBalance: number,
    newStatus: string
  ) => {
    if (!partyItem._id) {
      console.error(
        "Party item ID is undefined. Cannot update balance and status."
      );
      return;
    }
    const updatedParty = {
      ...partyItem,
      balance: newBalance,
      status: newStatus,
    };
    await updateParty({
      PartyId: partyItem?._id,
      body: updatedParty,
    }).unwrap();
    await refetchParties();
  };

  const handleDeleteTransaction = async () => {
    try {
      await deleteTransaction(transactionId).unwrap();
      toast.success("Transaction Deleted");

      const oldInventoryItem = inventories.find(
        (item) =>
          item.name === transactions.transaction.productName &&
          item.count === transactions.transaction.productCount &&
          item.brand === transactions.transaction.brandName
      );

      const inventoryItem = inventories.find(
        (item) =>
          item.name === transaction.productName &&
          item.count === transaction.productCount &&
          item.brand === transaction.brandName
      );

      const partyItem = parties.find(
        (item) =>
          item.partyName === transaction.partyName &&
          item.partyArea === transaction.partyArea
      );

      if (oldInventoryItem) {
        const newStock =
          transactions.transaction.transactionType === "Purchase"
            ? oldInventoryItem.stock - transactions.transaction.quantity
            : oldInventoryItem.stock + transactions.transaction.quantity;
        await updateStock(inventoryItem, newStock);
      }

      if (partyItem) {
        const newTotalBill = Number(transaction.quantity) * transaction.unitPrice;
        const oldTotalBill = Number(transactions.transaction.quantity) *
          transactions.transaction.unitPrice;

        let newBalance = 0;
        if (transactions.transaction.transactionType === "Purchase") {
          if (partyItem.status === "Dr") {
            newBalance = -partyItem.balance - oldTotalBill + transactions.transaction.credit;
          } else {
            newBalance = partyItem.balance - oldTotalBill + transactions.transaction.credit;
          }
        } else {
          if (partyItem.status === "Dr") {
            newBalance = -partyItem.balance + oldTotalBill - transactions.transaction.credit;
          } else {
            newBalance = partyItem.balance + oldTotalBill - transactions.transaction.credit;
          }
        }

        const newStatus = newBalance < 0 ? "Dr" : "Cr";
        newBalance = Math.abs(newBalance);
        await updateBalanceAndStatus(partyItem, newBalance, newStatus);
      }

      setFilteredData((prevData: any[]) =>
        prevData.filter((item) => item._id !== transactionId)
      );
    } catch (error) {
      toast.error("Error Deleting Transaction");
    } finally {
      setOpen(false);
    }
  };

  const transactionRecord = data?.transaction;
  const [filteredData, setFilteredData] = useState(transactionRecord);
  const [open, setOpen] = useState(false);

  const [showSearchInput, setShowSearchInput] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const totalPages: number = Math.ceil(filteredData?.length / ITEMS_PER_PAGE);
  const { data: session } = useSession() as SessionTypes;

  const DeleteCheck = session?.user.permissions.broker.includes("delete");
  const UpdateCheck = session?.user.permissions.broker.includes("update");

  const goToPage = (page: number) => {
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
    const filteredData = transactionRecord?.filter((item: Transaction) =>
      item.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, transactionRecord]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData?.length);
  const currentItems = transactionRecord?.slice(startIndex, endIndex);
  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <div className="transcations-record-page-wrapper flex flex-col justify-center pt-[45px]">
        <div className="page-header flex items-center justify-between">
          <div className="back-btn">
            <Link href={"/"}>
              <FaArrowLeft />
            </Link>
          </div>
          <div className="title text-primary-clr text-center">
            Transactions Record
          </div>
          <div></div>
        </div>

        <div className="table-head-wrapper w-full mt-10 flex items-center justify-between border-2 border-black py-4 px-4">
          {!showSearchInput && (
            <>
              <h3 className="text-barlow text-[#364A63] font-bold text-[19px] leading-[19px]">
                Transactions
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
                <TableHead className="text-center text-[9px] text-primary-clr font-bold uppercase border-2 border-black">
                  ID
                </TableHead>
                <TableHead className="text-primary-clr whitespace-nowrap text-[9px] text-center font-bold uppercase border-2 border-black">
                  Order Details
                </TableHead>

                <TableHead className="px-6 py-4 text-[9px] whitespace-nowrap text-primary-clr text-center font-bold uppercase border-2 border-black">
                  Calculations
                </TableHead>

                <TableHead className=" text-primary-clr text-[9px] text-center font-bold uppercase border-2 border-black">
                  Total Bill
                </TableHead>
                <TableHead className=" text-primary-clr text-[9px] text-center font-bold uppercase border-2 border-black">
                  Party Details
                </TableHead>

                <TableHead className=" text-primary-clr text-[9px] text-center font-bold uppercase border-2 border-black">
                  Broker Name
                </TableHead>
                <TableHead className=" text-primary-clr text-[9px] text-center font-bold uppercase border-2 border-black">
                  Transaction Type
                </TableHead>
                <TableHead className=" text-primary-clr text-[9px] text-center font-bold uppercase border-2 border-black">
                  Debit
                </TableHead>
                <TableHead className=" text-primary-clr text-[9px] text-center font-bold uppercase border-2 border-black">
                  Credit
                </TableHead>
                <TableHead className=" text-primary-clr text-[9px] text-center font-bold uppercase border-2 border-black">
                  Balance
                </TableHead>
                <TableHead className=" text-primary-clr text-[9px] text-center font-bold uppercase border-2 border-black">
                  Transaction Date
                </TableHead>
                <TableHead className=" text-primary-clr text-[9px] text-center font-bold uppercase border-2 border-black">
                  Status
                </TableHead>
                {DeleteCheck || UpdateCheck ? (
                  <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                    Action
                  </TableHead>
                ) : (
                  ``
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems &&
                currentItems?.map((transaction: Transaction, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-[9px] text-center border-2 border-black">
                      {transaction?._id
                        ? transaction?._id
                            .substring(transaction?._id.length - 4)
                            .toUpperCase()
                        : ""}
                    </TableCell>
                    <TableCell className="px-6 whitespace-nowrap py-4 text-[11px] border-2 border-black">
                      {transaction.productName}, {transaction.brandName},
                      {transaction.productCount}
                    </TableCell>
                    <TableCell className="text-center text-[11px] border-2 border-black">
                      {transaction.quantity} bags @ {transaction.unitPrice}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {transaction.totalBill}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {transaction.partyName} , {transaction.partyArea}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {transaction.brokerName}
                    </TableCell>

                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {transaction.transactionType}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {transaction.debit}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {transaction.credit}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {transaction.balance}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {format(transaction.createdAt, "yyyy-MM-dd")}
                    </TableCell>
                    <TableCell className=" text-center text-[11px] border-2 border-black">
                      {transaction.status}
                    </TableCell>
                    <TableCell className="border-2 border-black">
                      <div className="flex justify-end gap-[20px]">
                        {UpdateCheck === false ? (
                          ``
                        ) : (
                          <Link
                            href={`/transactions/edittransaction/${transaction?._id}`}
                          >
                            <FaPen size={20} className="text-primary-clr" />
                          </Link>
                        )}

                        {DeleteCheck === false ? (
                          ``
                        ) : (
                          <button
                            onClick={() => {
                              setOpen(!open);
                              setTransactionId(
                                transaction?._id ? transaction._id : ""
                              );
                            }}
                          >
                            <MdDelete size={20} className="text-red-500" />
                          </button>
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

              {Array.from(Array(totalPages).keys()).map((pageNum) => (
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
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-6 w-[450px] relative">
              <h1 className="text-xl font-semibold mb-4 text-center">
                Are you sure you want to delete this transaction?
              </h1>
              <div className="flex items-center justify-between mt-4">
                <button
                  className="w-[120px] h-[40px] bg-primary-clr text-white rounded hover:bg-green-700"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="w-[120px] h-[40px] bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={handleDeleteTransaction}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default TransactionsTable;

