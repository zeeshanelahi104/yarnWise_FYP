"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { useSession } from "next-auth/react";


export default function Page(){
  const { data: session, status } = useSession();
  
    return(
        <div className="user-profile-section-wrapper w-full pt-[45px] container">
      <div className="flex justify-between">
        <h1 className="text-[35px] font-bold text-center">Profile</h1>
        <Button className="bg-white flex justify-end items-end">
          <MdEdit color="#008F89" size={30} />
        </Button>
      </div>
      <div className="user-profile mt-[40px] flex gap-[20px]">
        <Image
          src=""
          alt=""
          className="rounded-full w-[300px] md:w-[200px] h-[200px] bg-gray-500"
        />
        <div className="flex flex-col gap-[5px]">
          <h2 className="text-[30px]">User Name</h2>
          <p className="text-[24px]">{session?.user.user?.email}</p>
          <h3 className="text-[20px]">M 12yrs</h3>
        </div>
      </div>
    </div>
    )
}