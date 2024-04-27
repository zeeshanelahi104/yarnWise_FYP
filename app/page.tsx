"use client"
import Sidebar from "@/components/common/Sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { useState } from "react";
export default function Page(){
    const [newFirstName, setNewFirstName] = useState("")
    const {data:session, status, update}= useSession()
    console.log("session at dashboard", session)
    return(
        <>
        <div>
            <h1>Home</h1>
            <h2>Hi {session?.user.role}</h2>
        </div>
        </>
    )
}