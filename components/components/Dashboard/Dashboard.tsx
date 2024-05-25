"use client";
import Link from "next/link";
import { FaArrowRight, FaUsers } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { MdBarChart } from "react-icons/md";
import { useGetTransactionsQuery } from "@/features/transactionSlice";
import { useGetUsersQuery } from "@/features/userSlice";
import { useGetRolesQuery } from "@/features/roleSlice";
import { useGetInventoriesQuery } from "@/features/inventorySlice";

export default function Dashboard() {
  const { data: transactions, isLoading } = useGetTransactionsQuery();
  const { data: users } = useGetUsersQuery();
  const { data: roles } = useGetRolesQuery();
  const { data: inventories } = useGetInventoriesQuery();
  const transactionsLength = transactions?.transaction.length;
  const usersLength = users?.user.length;
  const rolesLength = roles?.role.length;
  const inventoriesLength = inventories?.inventory.length;
  return (
    <>
      <div className="dashboard-items-wrapper flex justify-center items-center container pt-[45px]">
        <div className="items-wrapper grid grid-cols-2 gap-5">
          <div className="single-item bg-blue-400 w-[350px]">
            <div className="flex justify-between p-5">
              <div className="count flex flex-col justify-between gap-4 text-white text-[20px]">
                <p className="font-bold text-[30px]">{inventoriesLength}</p>
                <p>Total Products</p>
              </div>
              <div className="icon flex justify-center items-center">
                <FaBagShopping size={100} color="#00A3CB" />
              </div>
            </div>
            <div className="moreinfo-btn p-2 flex justify-center items-center bg-blue-600">
              <button className="">
                <Link
                  href={"/inventory"}
                  className="inline-flex text-white justify-center items-center gap-2"
                >
                  More Info <FaArrowRight color="white" />
                </Link>
              </button>
            </div>
          </div>
          <div className="single-item bg-[#00A65A] w-[350px]">
            <div className="flex justify-between p-5">
              <div className="count flex flex-col justify-between gap-4 text-white text-[20px]">
                <p className="font-bold text-[30px]">{rolesLength}</p>
                <p>Total Roles</p>
              </div>
              <div className="icon flex justify-center items-center">
                <FaUsers size={100} color="#008D4D" />
              </div>
            </div>
            <div className="moreinfo-btn p-2 flex justify-center items-center bg-[#009551]">
              <button className="">
                <Link
                  href={"/roles"}
                  className="inline-flex text-white justify-center items-center gap-2"
                >
                  More Info <FaArrowRight color="white" />
                </Link>
              </button>
            </div>
          </div>
          <div className="single-item bg-yellow-400 w-[350px]">
            <div className="flex justify-between p-5">
              <div className="count flex flex-col justify-between gap-4 text-white text-[20px]">
                <p className="font-bold text-[30px]">{transactionsLength}</p>
                <p>Total Transactions</p>
              </div>
              <div className="icon flex justify-center items-center">
                <MdBarChart size={100} color="#CF850F" />
              </div>
            </div>
            <div className="moreinfo-btn p-2 flex justify-center items-center bg-yellow-600">
              <button className="">
                <Link
                  href={"/transactions/manage-transactions"}
                  className="inline-flex text-white justify-center items-center gap-2"
                >
                  More Info <FaArrowRight color="white" />
                </Link>
              </button>
            </div>
          </div>
          <div className="single-item bg-red-500 w-[350px]">
            <div className="flex justify-between p-5">
              <div className="count flex flex-col justify-between gap-4 text-white text-[20px]">
                <p className="font-bold text-[30px]">{usersLength}</p>
                <p>Total Users</p>
              </div>
              <div className="icon flex justify-center items-center">
                <FaUsers size={100} color="#BC4031" />
              </div>
            </div>
            <div className="moreinfo-btn p-2 flex justify-center items-center bg-red-600">
              <button className="">
                <Link
                  href={"/users"}
                  className="inline-flex text-white justify-center items-center gap-2"
                >
                  More Info <FaArrowRight color="white" />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
