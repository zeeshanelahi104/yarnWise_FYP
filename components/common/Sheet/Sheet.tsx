"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FaHome,
  FaUser,
  FaTag,
  FaShoppingCart,
  FaPlus,
  FaUsers,
} from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { TiUserAdd } from "react-icons/ti";
import { IoIosOptions } from "react-icons/io";
import { MdRequestPage } from "react-icons/md";
import { MdBarChart } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PiSignOutBold } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import { SessionTypes } from "@/types";

export default function SheetDemo() {
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useSession() as SessionTypes;
  const pathname = usePathname();
  let role = data?.user?.role;
  let permissions = data?.user?.permissions;
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
    <div className="block lg:hidden mb-[50px]">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <GiHamburgerMenu className="text-primary-clr" size={15} />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div
            className={`w-full sidebar-wrapper pt-10 lg:flex-col bg-[#1E282C] text-black min-h-screen 
        ${
          pathname === "/auth/login" ||
          pathname === "/transactions/manage-transactions" ||
          pathname === "/reports/transactions-report" ||
          pathname === "/reports/broker-report" ||
          pathname === "/reports/party-report"
            ? "hidden"
            : "hidden lg:flex"
        }
        `}
          >
            <div className="sidebar-items-wrapper w-[250px] flex flex-col gap-[20px]">
              {renderSidebarItem(
                "dashboard",
                "view",
                <FaHome color="#008F89" size={20} />,
                "Dashboard",
                "/dashboard"
              )}
              <div
              // className={`w-64 sidebar-wrapper pt-10 lg:flex-col bg-[#1E282C] text-white min-h-screen
              // ${
              //   pathname === "/auth/login" ||
              //   pathname === "/transactions/manage-transactions"
              //     ? "hidden w-0"
              //     : "hidden lg:flex"
              // }
              // `}
              >
                <div className="sidebar-items-wrapper container  w-[250px] flex flex-col gap-[20px]">
                  {renderSidebarItem(
                    "dashboard",
                    "view",
                    <FaHome color="#008F89" size={20} />,
                    "Dashboard",
                    "/dashboard"
                  )}
                  <Link href={"/"} className="inline-flex gap-4">
                    <FaHome color="#008F89" size={20} /> Dashboard
                  </Link>
                  <div className="sidebar-item-wrapper">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full space-y-2"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          <div className="flex items-center space-x-4">
                            <div className="sidebar-item-wrapper flex">
                              <Link href={"/roles"} className="flex gap-4">
                                <span className="flex justify-center items-center">
                                  <FaUsers color="#008F89" size={20} />
                                </span>
                                <h4 className="flex justify-center items-center text-[15px]">
                                  Roles
                                </h4>
                              </Link>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 bg-[#2C3B41] p-1 ">
                          {renderSidebarItem(
                            "role",
                            "create",
                            <TiUserAdd color="#008F89" size={20} />,
                            "Add Role",
                            "/roles/addrole"
                          )}

                          {renderSidebarItem(
                            "role",
                            "view",
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
                        <AccordionContent className="space-y-4 bg-[#2C3B41] p-1 ">
                          {renderSidebarItem(
                            "user",
                            "create",
                            <TiUserAdd color="#008F89" size={20} />,
                            "Add User",
                            "/users/adduser"
                          )}

                          {renderSidebarItem(
                            "user",
                            "view",
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
                        <AccordionContent className="space-y-4 bg-[#2C3B41] p-1 ">
                          {renderSidebarItem(
                            "inventory",
                            "create",
                            <MdAddShoppingCart color="#008F89" size={20} />,
                            "Add Product",
                            "/inventory/addproduct"
                          )}

                          {renderSidebarItem(
                            "inventory",
                            "view",
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
                              <Link
                                href={"/transactions/manage-transactions"}
                                className="flex gap-4"
                              >
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
                        <AccordionContent className="space-y-4 bg-[#2C3B41] p-1 ">
                          {renderSidebarItem(
                            "transaction",
                            "create",
                            <FaTag color="#008F89" size={20} />,
                            "Add Transaction",
                            "/transactions/addtransaction"
                          )}

                          {renderSidebarItem(
                            "transaction",
                            "view",
                            <FaShoppingCart color="#008F89" size={20} />,
                            "Manage Transactions",
                            "/transactions/manage-transactions"
                          )}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-5">
                        <AccordionTrigger>
                          <div className="flex items-center space-x-4">
                            <div className="sidebar-item-wrapper flex">
                              <Link href={"#"} className="flex gap-4">
                                <span className="flex justify-center items-center">
                                  <MdRequestPage color="#008F89" size={20} />
                                </span>
                                <h4 className="flex justify-center items-center text-[15px]">
                                  Brokers
                                </h4>
                              </Link>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 bg-[#2C3B41] p-1 ">
                          {renderSidebarItem(
                            "broker",
                            "create",
                            <FaTag color="#008F89" size={20} />,
                            "Add Broker",
                            "/broker/addbroker"
                          )}

                          {renderSidebarItem(
                            "broker",
                            "view",
                            <FaShoppingCart color="#008F89" size={20} />,
                            "Manage Brokers",
                            "/broker"
                          )}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-6">
                        <AccordionTrigger>
                          <div className="flex items-center space-x-4">
                            <div className="sidebar-item-wrapper flex">
                              <Link href={"/parties"} className="flex gap-4">
                                <span className="flex justify-center items-center">
                                  <MdRequestPage color="#008F89" size={20} />
                                </span>
                                <h4 className="flex justify-center items-center text-[15px]">
                                  Parties
                                </h4>
                              </Link>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 bg-[#2C3B41] p-1 ">
                          {renderSidebarItem(
                            "party",
                            "create",
                            <FaTag color="#008F89" size={20} />,
                            "Add Party",
                            "/parties/addParty"
                          )}

                          {renderSidebarItem(
                            "party",
                            "view",
                            <FaShoppingCart color="#008F89" size={20} />,
                            "Manage Parties",
                            "/parties"
                          )}
                        </AccordionContent>
                      </AccordionItem>

                      <div className="flex items-center space-x-4 py-2">
                        <div className="sidebar-item-wrapper flex">
                          <Link href={"/reports"} className="flex gap-4">
                            <span className="flex justify-center items-center">
                              <MdBarChart color="#008F89" size={20} />
                            </span>
                            <h4 className="flex justify-center items-center text-[15px]">
                              Reports
                            </h4>
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 py-2">
                        <div className="sidebar-item-wrapper flex">
                          {renderSidebarItem(
                            "profile",
                            "view",
                            <FaUser color="#008F89" size={20} />,
                            "Profile",
                            "/profile"
                          )}
                          <Link href={"/profile"} className="inline-flex gap-4">
                            <FaUser color="#008F89" size={20} /> Profile
                          </Link>
                        </div>
                      </div>
                    </Accordion>
                  </div>

                  <div className="sidebar-item-wrapper space-x-4">
                    <div className="sidebar-item-wrapper flex gap-4">
                      <span className="flex justify-center items-center">
                        <PiSignOutBold color="#008F89" size={20} />
                      </span>

                      <button
                        onClick={() => signOut({ callbackUrl: "/auth/login" })}
                      >
                        <h4 className="flex justify-center items-center text-[15px]">
                          Sign Out
                        </h4>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SheetClose asChild></SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}
