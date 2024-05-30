
// }


"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const userRole = session?.user?.role;
  const pathname = usePathname();

  return (
    <>
      <div
        className={`navbar-wrapper flex justify-between items-center bg-[#1E282C] text-white fixed z-10  top-0 w-[calc(100%-15rem)]
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
        style={{ height: "6rem", marginLeft: "15rem", padding: "0 1rem" }} // Adjust margin and padding as needed
      >
        <div className="logo-wrapper"></div>
        <div className="heading-section flex flex-col text-center">
          <h1 className="font-bold -mt-2">Welcome to YarnWise</h1>
          <p className="mb-0 -mt-5">
            A digital platform, where you can manage your inventory
          </p>
        </div>
        <div className="profile-dropdown flex gap-3 justify-center items-center">
          <div className="dropdown-open-logo">
            <img
              className="inline-block rounded-full"
              src={`https://ui-avatars.com/api/?name=${userRole}&size=100&rounded=true&color=fff&background=000&format=svg`}
              width="40"
              height="40"
              alt="User Avatar"
            />
          </div>
          <div className="logout-btn">
          <Button
              className="primaryBtn px-5 hover:bg-black  hover:text-white text-white rounded-xl"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
