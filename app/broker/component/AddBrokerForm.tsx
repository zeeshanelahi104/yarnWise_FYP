"use client";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Broker } from "@/types";
import {
  useAddBrokerMutation,
  useGetBrokerQuery,
  useUpdateBrokerMutation,
} from "@/features/brokerSlice";

export default function AddBrokerForm() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const brokerId = Array.isArray(id) ? id[0] : id;
  const [broker, setBroker] = useState<Broker>({
    name: "",
    address: "",
    contactNumber: "",
  });

  const { data, isLoading, isSuccess, isError, error } = useGetBrokerQuery(id);
  const [addBroker] = useAddBrokerMutation();
  const [updateBroker] = useUpdateBrokerMutation();

  useEffect(() => {
    if (data && data.broker) {
      setBroker(data.broker);
    }
  }, [data]);

  const handleChange = (field: string, value: any) => {
    setBroker((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let dataToSend = { ...broker };

    if (dataToSend._id) {
      delete dataToSend._id;
    }

    if (id) {
      updateBroker({ brokerId, body: dataToSend })
        .unwrap()
        .then(() => {
          toast.success("Broker updated successfully");
          setBroker({ name: "", address: "", contactNumber: "" });
          router.push("/broker");
        })
        .catch(() => {});
    } else {
      addBroker(broker)
        .unwrap()
        .then(() => {
          toast.success("Broker added successfully");
          setBroker({ name: "", address: "", contactNumber: "" });
          router.push("/broker");
        })
        .catch(() => {});
    }
  };

  return (
    <div className="add-broker-form flex flex-col gap-10 flex-1 container pt-[45px]">
      <h1 className="title text-primary-clr text-center">
        {id ? "Edit" : "Add"} Broker
      </h1>
      <div className="add-broker-form-inputs grid grid-cols-2 gap-2">
        <div className="single-input flex flex-col gap-2">
          <label htmlFor="">Enter Broker Name</label>
          <Input
            type="text"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Broker Name"
            value={broker?.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="single-input flex flex-col gap-2">
          <label htmlFor="">Enter Broker Contact Number</label>
          <Input
            type="number"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Broker Contact Number"
            value={broker?.contactNumber}
            onChange={(e) => handleChange("contactNumber", e.target.value)}
          />
        </div>
        <div className="single-input flex flex-col gap-2">
          <label htmlFor="">Enter Broker Address</label>
          <Input
            type="text"
            className="w-full border border-black font-bold mt-2"
            placeholder="Enter Broker Address"
            value={broker?.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
      </div>
      <div className="submit-btn flex justify-center items-center">
        <Button
          className="primaryBtn w-[150px] hover:bg-black  hover:text-white text-white"
          onClick={handleSave}
        >
          {id ? "Edit" : "Add"} Broker
        </Button>
      </div>
    </div>
  );
};
