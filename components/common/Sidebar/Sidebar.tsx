"use client";
import { useState } from "react";
import {
  FaHome,
  FaUser,
  FaTag,
  FaShoppingCart,
  FaUsers,
} from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { MdAddShoppingCart } from "react-icons/md";
import { IoIosOptions } from "react-icons/io";
import { MdRequestPage } from "react-icons/md";
import { MdBarChart } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { signOut, useSession } from "next-auth/react";
import {  usePathname } from "next/navigation";
import SheetDemo from "../Sheet/Sheet";
import { useGetUserQuery } from "@/features/userSlice";

export default function Sidebar() {
  const { data } = useSession();
  console.log("Session Data", data)
  const pathname = usePathname();
  // const { data } = useGetUserQuery(userID);
// console.log("User Data at Sidebar", data);
  let role = data?.user?.role;
console.log("Role from sidebar", role);
  let permissions = data?.user?.permissions;
console.log("Permissions from sidebar", permissions);
  const hasPermission = (module: any, action: any) => {
    if (!permissions) return false;
    const modulePermissions = permissions[module];
    if (!modulePermissions) return false;
    return modulePermissions.includes(action);
  };

  const renderSidebarItem = (
    module: any,
    action: any,
    icon: any,
    label: any,
    href: any
  ) => {
    if (role === "admin" || hasPermission(module, action)) {
      return (
        <div className="sidebar-item-wrapper" key={label}>
          <Link href={href} className="flex gap-4">
            <span className="flex justify-center items-center">{icon}</span>
            <h4 className="flex justify-center items-center text-[15px]">
              {label}
            </h4>
          </Link>
        </div>
      );
    }
    return null;
  };

  return (
    <>
    <div>
      <SheetDemo />
    </div>
    <div
      className={`w-64 sidebar-wrapper pt-10 lg:flex-col bg-[#1E282C] text-white min-h-screen ${
        pathname === "/auth/login" || pathname==="/transactions/manage-transactions" ? "hidden" : "hidden lg:flex"
      }`}
    >
      <div className="sidebar-items-wrapper container  w-[250px] flex flex-col gap-[20px]">
        {renderSidebarItem(
          "dashboard",
          "view",
          <FaHome color="#008F89" size={20} />,
          "Dashboard",
          "/dashboard"
        )}

        <div className="sidebar-item-wrapper">
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center space-x-4">
                  <div className="sidebar-item-wrapper flex">
                    <Link href={"/roles"} className="flex gap-4">
                      <span className="flex justify-center items-center">
                        <FaUser color="#008F89" size={20} />
                      </span>
                      <h4 className="flex justify-center items-center text-[15px]">
                        Roles
                      </h4>
                    </Link>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 bg-[#2C3B41] p-1 w-[217px]">
                {renderSidebarItem(
                  "role",
                  "create",
                  <TiUserAdd color="#008F89" size={20} />,
                  "Add Role",
                  "/roles/addrole"
                )}

                {renderSidebarItem(
                  "role",
                  "update",
                  <FaUsers color="#008F89" size={20} />,
                  "Manage Roles",
                  "/roles"
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center space-x-4">
                  <div className="sidebar-item-wrapper flex">
                    <Link href={"/users"} className="flex gap-4">
                      <span className="flex justify-center items-center">
                        <FaUser color="#008F89" size={20} />
                      </span>
                      <h4 className="flex justify-center items-center text-[15px]">
                        Users
                      </h4>
                    </Link>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 bg-[#2C3B41] p-1 w-[217px]">
                {renderSidebarItem(
                  "user",
                  "create",
                  <TiUserAdd color="#008F89" size={20} />,
                  "Add User",
                  "/users/adduser"
                )}

                {renderSidebarItem(
                  "user",
                  "update",
                  <FaUsers color="#008F89" size={20} />,
                  "Manage Users",
                  "/users"
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center space-x-4">
                  <div className="sidebar-item-wrapper flex">
                    <Link href={"/inventory"} className="flex gap-4">
                      <span className="flex justify-center items-center">
                        <IoIosOptions color="#008F89" size={20} />
                      </span>
                      <h4 className="flex justify-center items-center text-[15px]">
                        Inventory
                      </h4>
                    </Link>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 bg-[#2C3B41] p-1 w-[217px]">
                {renderSidebarItem(
                  "inventory",
                  "create",
                  <MdAddShoppingCart color="#008F89" size={20} />,
                  "Add Product",
                  "/inventory/addproduct"
                )}

                {renderSidebarItem(
                  "inventory",
                  "update",
                  <IoIosOptions color="#008F89" size={20} />,
                  "Manage Products",
                  "/inventory"
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                <div className="flex items-center space-x-4">
                  <div className="sidebar-item-wrapper flex">
                    <Link href={"/transactions"} className="flex gap-4">
                      <span className="flex justify-center items-center">
                        <MdRequestPage color="#008F89" size={20} />
                      </span>
                      <h4 className="flex justify-center items-center text-[15px]">
                        Transactions
                      </h4>
                    </Link>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 bg-[#2C3B41] p-1 w-[217px]">
                {renderSidebarItem(
                  "sales",
                  "view",
                  <FaTag color="#008F89" size={20} />,
                  "Sales",
                  "/transactions/sales"
                )}

                {renderSidebarItem(
                  "purchases",
                  "view",
                  <FaShoppingCart color="#008F89" size={20} />,
                  "Purchases",
                  "/transactions/purchases"
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {renderSidebarItem(
          "reports",
          "view",
          <MdBarChart color="#008F89" size={20} />,
          "Reports",
          "/reports"
        )}
        {renderSidebarItem(
          "profile",
          "view",
          <FaUser color="#008F89" size={20} />,
          "Profile",
          "/profile"
        )}

        <div className="sidebar-item-wrapper space-x-4">
          <div className="sidebar-item-wrapper flex gap-4">
            
              <span className="flex justify-center items-center">
                <PiSignOutBold color="#008F89" size={20} />
              </span>

              <button onClick={() => signOut({ callbackUrl: "/auth/login" })}>
                <h4 className="flex justify-center items-center text-[15px]">
                  Sign Out
                </h4>
              </button>
            
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
