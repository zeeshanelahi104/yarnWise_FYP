"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
export default function Navbar() {
  const { data: session } = useSession();
  const userRole = session?.user.role;

  return (
    <>
      <div className="navbar-wrapper flex justify-between bg-gray-700 container py-2">
        <div className="logo-wrapper"></div>
        <div className="heading-section flex flex-col text-center text-white">
          <h1 className="font-bold">Welcome to YarnWise</h1>
          <p>A digital platform, where you can manage your inventory</p>
        </div>
        <div className="profile-dropdown flex gap-1 justify-center items-center">
          <div className="dropdown-open-logo">
            <img
              className="inline-block rounded-full "
              src={`https://ui-avatars.com/api/?name=${userRole}&size=100&rounded=true&color=fff&background=000&format=svg`}
              width="32"
              height="32"
              alt="Image Description"
            />
          </div>
          <div className="logout-btn">
            <button
              className="text-white"
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
