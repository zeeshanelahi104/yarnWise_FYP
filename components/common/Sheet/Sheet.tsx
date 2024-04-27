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
import Link from "next/link";

export default function SheetDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block lg:hidden mb-[50px] w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <GiHamburgerMenu className="text-primary-clr" size={15} />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <div className="sidebar-items-wrapper flex flex-col gap-[20px] p-10">
            <div className="sidebar-item-wrapper ">
              <Link href={"/dashboard"} className="flex gap-4">
                <span className="flex justify-center items-center">
                  <FaHome color="#008F89" size={20} />
                </span>
                <h4 className="flex justify-center font-medium items-center text-[14px]">
                  Dashboard
                </h4>
              </Link>
            </div>
            <div className="sidebar-item-wrapper ">
            <Accordion type="single" collapsible className="w-full space-y-2">
              <AccordionItem value="item-1">
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
                <AccordionContent className="space-y-4  p-1 w-[217px]">
                  <div className="sidebar-item-wrapper ">
                    <Link href={"/inventory/addproduct"} className="flex gap-4">
                      <span className="flex justify-center items-center">
                        <MdAddShoppingCart color="#008F89" size={20} />
                      </span>
                      <h4 className="flex justify-center items-center text-[15px]">
                        Add Product
                      </h4>
                    </Link>
                  </div>
                  <div className="sidebar-item-wrapper ">
                    <Link href={"/inventory"} className="flex gap-4">
                      <span className="flex justify-center items-center">
                        <IoIosOptions color="#008F89" size={20} />
                      </span>
                      <h4 className="flex justify-center items-center text-[15px]">
                        Manage Products
                      </h4>
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <div className="sidebar-item-wrapper ">
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
                  <AccordionContent className="space-y-4 p-1 w-[217px]">
                    <div className="sidebar-item-wrapper ">
                      <Link href={"/users/adduser"} className="flex gap-4">
                        <span className="flex justify-center items-center">
                          <TiUserAdd color="#008F89" size={20} />
                        </span>
                        <h4 className="flex justify-center items-center text-[15px]">
                          Add User
                        </h4>
                      </Link>
                    </div>
                    <div className="sidebar-item-wrapper ">
                      <Link href={"/users"} className="flex gap-4">
                        <span className="flex justify-center items-center">
                          <FaUsers color="#008F89" size={20} />
                        </span>
                        <h4 className="flex justify-center items-center text-[15px]">
                          Manage Users
                        </h4>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
              <div className="sidebar-item-wrapper ">
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="flex items-center space-x-4">
                      <div className="sidebar-item-wrapper flex">
                        <Link href={"/roles"} className="flex gap-4">
                          <span className="flex justify-center items-center">
                            <FaPeopleGroup color="#008F89" size={20} />
                          </span>
                          <h4 className="flex justify-center items-center text-[15px]">
                            Roles
                          </h4>
                        </Link>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="space-y-4 p-1 w-[217px]">
                    <div className="sidebar-item-wrapper ">
                      <Link href={"/roles/addrole"} className="flex gap-4">
                        <span className="flex justify-center items-center">
                          <TiUserAdd color="#008F89" size={20} />
                        </span>
                        <h4 className="flex justify-center items-center text-[15px]">
                          Add Role
                        </h4>
                      </Link>
                    </div>
                    <div className="sidebar-item-wrapper ">
                      <Link href={"/roles"} className="flex gap-4">
                        <span className="flex justify-center items-center">
                          <FaUsers color="#008F89" size={20} />
                        </span>
                        <h4 className="flex justify-center items-center text-[15px]">
                          Manage Roles
                        </h4>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>

              <div className="sidebar-item-wrapper ">
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
                  <AccordionContent className="space-y-4  p-1 w-[217px]">
                    <div className="sidebar-item-wrapper ">
                      <Link href={"/sales"} className="flex gap-4">
                        <span className="flex justify-center items-center">
                          <FaTag color="#008F89" size={20} />
                        </span>
                        <h4 className="flex justify-center items-center text-[15px]">
                          Sales
                        </h4>
                      </Link>
                    </div>
                    <div className="sidebar-item-wrapper ">
                      <Link href={"/purchases"} className="flex gap-4">
                        <span className="flex justify-center items-center">
                          <FaShoppingCart color="#008F89" size={20} />
                        </span>
                        <h4 className="flex justify-center items-center text-[15px]">
                          Purchases
                        </h4>
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </div>
            </Accordion>
            </div>
            <div className="sidebar-item-wrapper ">
              <Link href={"/"} className="flex gap-4">
                <span className="flex justify-center items-center">
                  <MdBarChart color="#008F89" size={20} />
                </span>
                <h4 className="flex justify-center font-medium items-center text-[14px]">
                  Reports
                </h4>
              </Link>
            </div>
            
            <div className="sidebar-item-wrapper ">
              <Link href={"/products"} className="flex gap-4">
                <span className="flex justify-center items-center">
                  <FaShoppingCart color="#008F89" size={20} />
                </span>
                <h4 className="flex justify-center font-medium items-center text-[14px]">
                  Products
                </h4>
              </Link>
            </div>
          </div>
          <SheetClose asChild></SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}
