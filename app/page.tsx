"use client";
import ProtectedRoute from "@/components/PrivateRoute";
import Dashboard from "@/components/components/Dashboard/Dashboard";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  console.log("session at dashboard", session);
  return (
    <>
      {/* <ProtectedRoute requiredPermissions={["view"]} entity="dashboard"> */}
        <div>
          <div className="flex items-center flex-col">
            <h1>Home</h1>
            <h2>Hi {session?.user.role}</h2>
          </div>
          <Dashboard />
        </div>
      {/* </ProtectedRoute> */}
    </>
  );
}
