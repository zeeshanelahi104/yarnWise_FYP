"use client";
import ProtectedRoute from "@/components/PrivateRoute";
import Dashboard from "@/components/components/Dashboard/Dashboard";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  return (
    <>
      {/* <ProtectedRoute requiredPermissions={["view"]} entity="dashboard"> */}
        <div className="">
          <div className="flex items-center flex-col py-5">
            <h2 className="font-bold">Welcome Back {session?.user.role}</h2>
          </div>
          <Dashboard />
        </div>
      {/* </ProtectedRoute> */}
    </>
  );
}
