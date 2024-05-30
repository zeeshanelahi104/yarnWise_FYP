"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import users from "@/models/user";
import axios from "axios";
import { Party } from "@/types";
import {
  useAddPartyMutation,
  useGetPartyQuery,
  useUpdatePartyMutation,
} from "@/features/partySlice";

const AddPartyForm = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const partyId = Array.isArray(id) ? id[0] : id;
  const [party, setParty] = useState<Party>({
    partyName: "",
    ownerName: "",
    partyArea: "",
    address: "",
    contactNumber: "",
    balance: 0,
    status: "",
  });

  const { data, isLoading, isSuccess, isError, error } = useGetPartyQuery(id);
  const [addParty] = useAddPartyMutation();
  const [updateParty] = useUpdatePartyMutation();

  useEffect(() => {
    if (data && data.party) {
      setParty(data.party);
    }
  }, [data]);

  const handleChange = (field: string, value: any) => {
    setParty((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let dataToSend = { ...party };

    if (dataToSend._id) {
      delete dataToSend._id;
    }

    if (id) {
      updateParty({ PartyId: partyId, body: dataToSend })
        .unwrap()
        .then(() => {
          toast.success("Party updated successfully");
          setParty({
            partyName: "",
            ownerName: "",
            partyArea: "",
            address: "",
            contactNumber: "",
            balance: 0,
            status: "",
          });
          router.push("/parties");
        })
        .catch(() => {});
    } else {
      addParty(party)
        .unwrap()
        .then(() => {
          toast.success("Party added successfully");
          setParty({
            partyName: "",
            ownerName: "",
            partyArea: "",
            address: "",
            contactNumber: "",
            balance: 0,
            status: "",
          });
          router.push("/parties");
        })
        .catch(() => {});
    }
  };

  return (
    <div className="add-party-form flex flex-col gap-10 flex-1 container pt-[45px]">
      <h1 className="title text-primary-clr text-center">
        {id ? "Edit" : "Add"} Party
      </h1>
      <div className="add-party-form-inputs grid grid-cols-2 gap-2">
        <div className="single-input flex flex-col gap-1">
          <label htmlFor="">Enter Party Name</label>
          <Input
            type="text"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Party Name"
            value={party?.partyName}
            onChange={(e) => handleChange("partyName", e.target.value)}
            pattern="[A-Za-z]{25}"
            title="Enter name less than 25 characters. Don't use Numbers"
          />
        </div>
        <div className="single-input flex flex-col gap-1">
          <label htmlFor="">Enter Owner Name</label>
          <Input
            type="text"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Party Contact Number"
            value={party?.ownerName}
            onChange={(e) => handleChange("ownerName", e.target.value)}
          />
        </div>
      </div>
      <div className="add-party-form-inputs grid grid-cols-2 gap-2">
        <div className="single-input flex flex-col gap-1">
          <label htmlFor="">Enter Party Area</label>
          <Input
            type="text"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Party Area"
            value={party?.partyArea}
            onChange={(e) => handleChange("partyArea", e.target.value)}
          />
        </div>
        <div className="single-input flex flex-col gap-1">
          <label htmlFor="">Enter Party Address</label>
          <Input
            type="text"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Party Address"
            value={party?.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
      </div>
      <div className="add-party-form-inputs grid grid-cols-2 gap-2">
        <div className="single-input flex flex-col gap-1">
          <label htmlFor="">Enter Party Contact Number</label>
          <Input
            type="number"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Party Area"
            value={party?.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
          />
        </div>
      </div>
      <div className="submit-btn flex justify-center items-center">
        <Button
          className="primaryBtn w-[150px] hover:bg-black  hover:text-white text-white"
          onClick={handleSave}
        >
          {id ? "Edit" : "Add"} Party
        </Button>
      </div>
    </div>
  );
};
export default AddPartyForm;
