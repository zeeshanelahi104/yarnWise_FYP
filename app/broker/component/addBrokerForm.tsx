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

const AddBrokerForm = () => {
  return (
    <div className="add-broker-form flex flex-col gap-10 flex-1 container pt-[45px]">
      <h1 className="title text-primary-clr text-center">Add Broker</h1>
      <div className="add-broker-form-inputs grid grid-cols-2 gap-2">
        <div className="single-input flex flex-col gap-2">
          <label htmlFor="">Enter Broker Name</label>
          <Input
            type="text"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Broker Name"
            //   value={role?.role}
            //   onChange={(e) => setRole({ ...role, role: e.target.value })}
          />
        </div>
        <div className="single-input flex flex-col gap-2">
          <label htmlFor="">Enter Broker Contact Number</label>
          <Input
            type="text"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Broker Contact Number"
            //   value={role?.role}
            //   onChange={(e) => setRole({ ...role, role: e.target.value })}
          />
        </div>
        <div className="single-input flex flex-col gap-2">
          <label htmlFor="">Enter Broker Address</label>
          <Input
            type="text"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Broker Address"
            //   value={role?.role}
            //   onChange={(e) => setRole({ ...role, role: e.target.value })}
          />
        </div>
      </div>
      <div className="submit-btn flex justify-center items-center">
        <button className="primaryBtn">Add Broker</button>
      </div>
    </div>
  );
};
export default AddBrokerForm;
