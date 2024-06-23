"use client";
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
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useDeleteUserMutation, useGetUsersQuery } from "@/features/userSlice";
import toast from "react-hot-toast";
import { SessionTypes, UserTypes } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { FaPen, FaSearch, FaArrowLeft } from "react-icons/fa";
import { useSession } from "next-auth/react";

const ITEMS_PER_PAGE = 5;

interface UserTableProps {}
const UsersTable: React.FC<UserTableProps> = () => {
  // Assuming you have a users state
  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const usersRecord = data?.user;
  const [filteredData, setFilteredData] = useState(usersRecord);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const totalPages: number = Math.ceil(filteredData?.length / ITEMS_PER_PAGE);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { data: session } = useSession() as SessionTypes;
  const DeleteCheck = session?.user.permissions.user.includes("delete");
  const UpdateCheck = session?.user.permissions.user.includes("update");
  const handleDeleteUser = () => {
    const id = userId;
    deleteUser(id)
      .unwrap()
      .then(() => {
        toast.success("User Deleted");
        setOpen(false);
        setFilteredData((prevData: any[]) =>
          prevData.filter((item) => item._id !== id)
        );
      })
      .catch(() => {
        toast.error("Error, Deleting User");
      });
  };

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
    const filteredData = usersRecord?.filter((item: any) =>
      item.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData?.length);
  const currentItems = filteredData?.slice(startIndex, endIndex);

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="users-wrapper">
      <h1 className="text-center title uppercase">Users</h1>
      <div className="table-head-wrapper w-full mt-10 flex items-center justify-between border-2 border-black py-4 px-4">
        {!showSearchInput && (
          <>
            <h3 className="text-barlow text-[#364A63] font-bold text-[19px] leading-[19px]">
              All Users
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
              placeholder="Search by Last Name..."
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
      <div className="users-table-wrapper">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="border-2 border-black">
            <TableRow>
              <TableHead className="text-center text-primary-clr font-bold uppercase border-2 border-black">
                ID
              </TableHead>
              <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                Name
              </TableHead>
              <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                Email
              </TableHead>

              <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                Phone Number
              </TableHead>
              <TableHead className="px-6 py-4 whitespace-nowrap text-primary-clr text-center font-bold uppercase border-2 border-black">
                Role
              </TableHead>
              <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                Address
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
            {currentItems.map((user: UserTypes, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center border-2 border-black">
                  {user?._id
                    ? user._id.substring(user._id.length - 4).toUpperCase()
                    : ""}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-center border-2 border-black">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell className="text-center border-2 border-black">
                  {user.email}
                </TableCell>
                <TableCell className="text-center border-2 border-black">
                  {user.phoneNumber}
                </TableCell>

                <TableCell className="text-center border-2 border-black">
                  {user.role}
                </TableCell>
                <TableCell className=" text-center border-2 border-black">
                  {user.address}
                </TableCell>
                <TableCell className="border-2 border-black">
                  <div className="flex justify-end gap-[20px]">
                    {UpdateCheck === false ? (
                      ``
                    ) : (
                      <Link href={`/users/edituser/${user?._id}`}>
                        <FaPen className="text-primary-clr cursor-pointer mt-1" />
                      </Link>
                    )}

                    {DeleteCheck === false ? (
                      <div></div>
                    ) : (
                      <MdDelete
                        size={20}
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                          setOpen(!open);
                          setUserId(user?._id ? user._id : "");
                        }}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <div className="pagination-controls flex justify-start py-2 border-2 border-black px-4">
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
              Are you sure you want to delete this user?
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
                onClick={handleDeleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
