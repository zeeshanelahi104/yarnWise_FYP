"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import users from "@/models/user";
import axios from "axios";

const AddPartyForm = () => {
  return (
    <div className="add-broker-form flex flex-col gap-10 flex-1 container pt-[45px]">
      <h1 className="title text-primary-clr text-center">Add Party</h1>
      <div className="add-broker-form-inputs grid grid-cols-2 gap-2">
        <div className="single-input flex flex-col gap-1">
          <label htmlFor="">Enter Party Name</label>
          <Input
            type="text"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Party Name"
            //   value={role?.role}
            //   onChange={(e) => setRole({ ...role, role: e.target.value })}
          />
        </div>
        <div className="single-input flex flex-col gap-1">
          <label htmlFor="">Enter Party Contact Number</label>
          <Input
            type="text"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Party Contact Number"
            //   value={role?.role}
            //   onChange={(e) => setRole({ ...role, role: e.target.value })}
          />
        </div>
        <div className="single-input flex flex-col gap-1">
          <label htmlFor="">Enter Party Address</label>
          <Input
            type="text"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Party Address"
            //   value={role?.role}
            //   onChange={(e) => setRole({ ...role, role: e.target.value })}
          />
        </div>
      </div>
      <div className="submit-btn flex justify-center items-center">
        <button className="primaryBtn">Add Party</button>
      </div>
    </div>
  );
};
export default AddPartyForm;
