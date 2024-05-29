"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function Navbar() {
  const { data: session } = useSession();
  console.log("Session at Navbar", session)
  console.log("Session at Navbar", session?.user?.role)
  // const userRole = session?.user?.role;

  return (
    <>
      <div className="navbar-wrapper flex justify-between bg-[#1E282C] border-l container pb-3">
        <div className="logo-wrapper"></div>
        <div className="heading-section flex flex-col text-center text-white">
          <h1 className="font-bold">Welcome to YarnWise</h1>
          <p className="mb-0">
            A digital platform, where you can manage your inventory
          </p>
        </div>
        <div className="profile-dropdown flex gap-3 justify-center items-center">
          <div className="dropdown-open-logo ">
            <img
              className="inline-block rounded-full "
              src={`https://ui-avatars.com/api/?name=user&size=100&rounded=true&color=fff&background=000&format=svg`}
              width="50"
              height="50"
              alt="Image Description"
            />
          </div>
          <div className="logout-btn">
            <Button
              className="primaryBtn px-5 hover:bg-black  hover:text-white text-white"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
