"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { SessionTypes } from "@/types";
import Dashboard from "@/components/components/Dashboard/Dashboard";
import Loader from "@/components/Loader";

export default function Page() {
  const { data: session, status } = useSession() as SessionTypes;

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth/login");
    }
  }, [status]);

  if (status === "loading") {
    return <Loader style="items-center h-[70vh]" />;
  }

  return (
    <>
      {session && (
        <>
          <div className="flex items-center flex-col py-5">
            <h2 className="font-bold">Welcome Back {session?.user.role}</h2>
          </div>
          <Dashboard />
        </>
      )}
    </>
  );
}
