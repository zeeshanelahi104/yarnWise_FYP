// "use client";
// import { useState,useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { FiChevronsLeft,FiChevronsRight } from "react-icons/fi";
// import { useDeleteRoleMutation, useGetRolesQuery } from "@/features/roleSlice";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { FaPen,FaSearch,FaArrowLeft } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { TiTick, TiTimes } from "react-icons/ti";
// interface RoleTableProps {}
// const ITEMS_PER_PAGE = 5;
// const RoleTable: React.FC<RoleTableProps> = () => {

//   const { data, isLoading, isSuccess, isError, error } = useGetRolesQuery();
//   const [deleteRole] = useDeleteRoleMutation();
//   const rolesRecord = data?.role;
//   const [filteredData, setFilteredData] = useState(rolesRecord);
//   const [showSearchInput, setShowSearchInput] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

//   const goToPage = (page: any) => {
//     setCurrentPage(page);
//   };

//   const goToNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   const goToPreviousPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   const goToFirstPage = () => {
//     setCurrentPage(1);
//   };

//   const goToLastPage = () => {
//     setCurrentPage(totalPages);
//   };

//   const handleSearch = () => {
//     const filteredData = rolesRecord.filter((item: any) =>
//       item.role.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredData(filteredData);
//     console.log(filteredData);
//   };

//   useEffect(() => {
//     handleSearch();
//   }, [searchQuery]);

//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredData?.length);
//   const currentItems = filteredData?.slice(startIndex, endIndex);

//   const handleInputChange = (event: any) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleDeleteRole = (id: string) => {
//     deleteRole(id)
//       .unwrap()
//       .then(() => {
//         toast.success("Role Deleted");
//       })
//       .catch(() => {
//         toast.error("Error, Deleting Role");
//       });
//   };
//   return (
//     <div className="users-table-wrapper container pt-[45px] flex flex-col flex-1 w-full">
//       <div className="heading-wrapper mx-auto">
//         <h1 className="title text-primary-clr ">Roles</h1>
//       </div>
//       <div className="table-head-wrapper w-full mt-10 flex items-center justify-between border-2 border-black py-4 px-4">
//               {!showSearchInput && (
//                 <>
//                   <h3 className="text-barlow text-[#364A63] font-bold text-[19px] leading-[19px]">
//                     Roles
//                   </h3>
//                   <div className="icons-wrapper flex justify-between gap-3">
//                     <button onClick={() => setShowSearchInput(true)}>
//                       <FaSearch className="w-[16px]"/>

//                     </button>

//                   </div>
//                 </>
//               )}
//               {showSearchInput && (
//                 <div className="flex justify-between w-full">
//                   <button onClick={() => setShowSearchInput(false)}>
//                     <FaArrowLeft className=" mr-2 flex justify-center items-center w-[16px]"
//                     />

//                   </button>
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleInputChange}
//                     className="px-2 w-full focus:outline-none rounded"
//                     placeholder="Search by role..."
//                   />
//                   <button
//                     onClick={handleSearch}
//                     className=" text-white px-4 py-1 rounded"
//                   >
//                     <FaSearch className="w-[16px]"/>
//                   </button>
//                 </div>
//               )}
//             </div>
//       <div className="users-table">
//         <Table className="min-w-full divide-y divide-gray-200">
//           <TableHeader className="border-2 border-black">
//             <TableRow>
//               <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
//                 Role
//               </TableHead>
//               <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
//                 Permissions
//               </TableHead>

//               <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
//                 Action
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {currentItems.map((role: any, index: number) => (
//               <TableRow key={index}>
//                 <TableCell className="text-center border-2 border-black">
//                   {role.role.slice(0, 1).toUpperCase() + role.role.slice(1)}
//                 </TableCell>
//                 <TableCell className="text-center border-2 border-black">
//                   <table className="border border-gray-200 w-full">
//                     <thead>
//                       <tr>
//                         <th>Permissions</th>
//                         <th className="text-center">Create</th>
//                         <th className="text-center">Update</th>
//                         <th className="text-center">View</th>
//                         <th className="text-center">Delete</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {Object?.keys(role.permissions).map((module: string) => (
//                         <tr key={module}>
//                           <td className="font-bold" align="center">
//                             {module.toUpperCase()}
//                           </td>
//                           <td className="" align="center">
//                             {role.permissions[module].includes("create") ? (
//                               <TiTick color="green" />
//                             ) : (
//                               <TiTimes color="red" />
//                             )}
//                           </td>
//                           <td className="" align="center">
//                             {role.permissions[module].includes("update") ? (
//                               <TiTick color="green" />
//                             ) : (
//                               <TiTimes color="red" />
//                             )}
//                           </td>
//                           <td className="" align="center">
//                             {role.permissions[module].includes("view") ? (
//                               <TiTick color="green" />
//                             ) : (
//                               <TiTimes color="red" />
//                             )}
//                           </td>
//                           <td className="" align="center">
//                             {role.permissions[module].includes("delete") ? (
//                               <TiTick color="green" />
//                             ) : (
//                               <TiTimes color="red" />
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </TableCell>
//                 <TableCell className="border-2 border-black">
//                   <div className="flex justify-end gap-[20px]">
//                     <Link href={`/roles/editrole/${role?._id}`}>
//                       <FaPen size={20} className="text-primary-clr" />
//                     </Link>
//                     <button>
//                       <MdDelete
//                         size={20}
//                         className="text-primary-clr"
//                         onClick={() =>
//                           handleDeleteRole(role?._id ? role._id : "")
//                         }
//                       />
//                     </button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         {totalPages > 1 && (
//                 <div className="pagination-controls flex justify-start py-2 border-2 border-black px-4">
//                   <button

//                     onClick={goToFirstPage}
//                     disabled={currentPage === 1}
//                     className="border border-black w-9 flex justify-center items-center rounded-[2px] hover:bg-[#DBDFEA]"
//                   >
//                     <FiChevronsLeft className="w-[14px]" color="black"/>
//                   </button>
//                   <button
//                     onClick={goToPreviousPage}
//                     disabled={currentPage === 1}
//                     className="border border-black w-9 flex justify-center items-center hover:bg-[#DBDFEA]"
//                   >
//                     <ChevronLeft className="w-[10px]"color="black" />
//                   </button>

//                   {[...Array(totalPages).keys()].map((pageNum) => (
//                     <button
//                       key={pageNum}
//                       onClick={() => goToPage(pageNum + 1)}
//                       className={
//                         currentPage === pageNum + 1
//                           ? "text-black bg-primary-clr w-9 h-10  font-medium"
//                           : "border border-black hover:text-cyan hover:bg-[#DBDFEA] text-black font-medium w-9"
//                       }
//                     >
//                       {pageNum + 1}
//                     </button>
//                   ))}
//                   <button
//                     onClick={goToNextPage}
//                     disabled={currentPage === totalPages}

//                     className="border border-black w-9 flex justify-center items-center hover:bg-[#DBDFEA]"
//                   >
//                   <ChevronRight className="w-[10px]" color="black"/>
//                   </button>
//                   <button
//                     onClick={goToLastPage}
//                     disabled={currentPage === totalPages}

//                     className="border border-black w-9 flex justify-center items-center hover:bg-[#DBDFEA]"
//                   >
//                     <FiChevronsRight className="w-[14px]" color="black"/>
//                   </button>
//                 </div>
//               )}
//       </div>
//     </div>
//   );
// };
// export default RoleTable;

"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useDeleteRoleMutation, useGetRolesQuery } from "@/features/roleSlice";
import Link from "next/link"
import toast from "react-hot-toast";
import { FaPen, FaSearch, FaArrowLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TiTick, TiTimes } from "react-icons/ti";
import { useSession } from "next-auth/react";
interface RoleTableProps {}

const ITEMS_PER_PAGE = 5;

const RoleTable: React.FC<RoleTableProps> = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetRolesQuery();
  const [deleteRole] = useDeleteRoleMutation();
  const rolesRecord = data?.role;
  const [filteredData, setFilteredData] = useState(rolesRecord);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const { data: session } = useSession();

  const permissionCheck = session?.user.permissions.role.includes("delete");
  
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
    const filteredData = rolesRecord.filter((item: any) =>
      item.role.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredData);
    console.log(filteredData);
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

  const handleDeleteRole = (id: string) => {
    deleteRole(id)
      .unwrap()
      .then(() => {
        toast.success("Role Deleted");
        setFilteredData((prevData: any[]) =>
          prevData.filter((item) => item._id !== id)
        );
      })
      .catch(() => {
        toast.error("Error, Deleting Role");
      });
  };

  return (
    <div className="users-table-wrapper container pt-[45px] flex flex-col flex-1 w-full">
      <div className="heading-wrapper mx-auto">
        <h1 className="title text-primary-clr ">Roles</h1>
      </div>
      <div className="table-head-wrapper w-full mt-10 flex items-center justify-between border-2 border-black py-4 px-4">
        {!showSearchInput && (
          <>
            <h3 className="text-barlow text-[#364A63] font-bold text-[19px] leading-[19px]">
              Roles
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
              placeholder="Search by role..."
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
      <div className="users-table">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="border-2 border-black">
            <TableRow>
              <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                Role
              </TableHead>
              <TableHead className="text-primary-clr text-center font-bold uppercase border-2 border-black">
                Permissions
              </TableHead>
              <TableHead className=" text-primary-clr text-center font-bold uppercase border-2 border-black">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((role: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="text-center border-2 border-black">
                  {role.role.slice(0, 1).toUpperCase() + role.role.slice(1)}
                </TableCell>
                <TableCell className="text-center border-2 border-black">
                  <table className="border border-gray-200 w-full">
                    <thead>
                      <tr>
                        <th>Permissions</th>
                        <th className="text-center">Create</th>
                        <th className="text-center">Update</th>
                        <th className="text-center">View</th>
                        <th className="text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object?.keys(role.permissions).map((module: string) => (
                        <tr key={module}>
                          <td className="font-bold" align="center">
                            {module.toUpperCase()}
                          </td>
                          {["create", "update", "view", "delete"].map(
                            (permission) => (
                              <td key={permission} className="text-center">
                                {module === "report" &&
                                permission !== "view" ? (
                                  "-"
                                ) : role.permissions[module].includes(
                                    permission
                                  ) ? (
                                  <TiTick color="green" />
                                ) : (
                                  <TiTimes color="red" />
                                )}
                              </td>
                            )
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TableCell>
                <TableCell className="border-2 border-black">
                  <div className="flex justify-end gap-[20px]">
                    <Link href={`/roles/editrole/${role?._id}`}>
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
                            handleDeleteRole(role?._id ? role._id : "")
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
    </div>
  );
};

export default RoleTable;
