"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Transaction } from "@/types";
import {
  useGetTransactionQuery,
  useUpdateTransactionMutation,
  useAddTransactionMutation,
} from "@/features/transactionSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function AddTransactionForm() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const transactionId = Array.isArray(id) ? id[0] : id;
  const [transaction, setTransaction] = useState<Transaction>({
    productName: "",
    productCount: "",
    brandName: "",
    unitPrice: 0,
    quantity: 0,
    totalBill: 0,
    partyName: "",
    partyArea: "",
    partyContactNumber: "",
    brokerName: "",
    brokerCommissionPercentage: 0,
    paymentType: "",
    transactionType: "",
  });


  const { data, isLoading, isSuccess, isError, error } =
    useGetTransactionQuery(id);
  const [addTransaction] = useAddTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();

  useEffect(() => {
    if (data && data.transaction) {
      setTransaction(data.transaction);
    }
  }, [data]);
 // Calculate totalBill whenever quantity or unitPrice changes
 useEffect(() => {
  const newTotalBill = transaction.quantity * transaction.unitPrice;
  setTransaction(prevTransaction => ({ ...prevTransaction, totalBill: newTotalBill }));
}, [transaction.quantity, transaction.unitPrice]);
  const handleChange = (field: string, value: any) => {
    setTransaction((prevData) => ({ ...prevData, [field]: value }));
  };
  const handlePaymentTypeChange = (e: any) => {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      paymentType: e.target.value,
    }));
  };
  
  const handleTransactionTypeChange = (e: any) => {
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      transactionType: e.target.value,
    }));
  };
  
  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let dataToSend = { ...transaction };

    if (dataToSend._id) {
      delete dataToSend._id;
    }

    if (id) {
      updateTransaction({ transactionId, body: dataToSend })
        .unwrap()
        .then(() => {
          toast.success("Transaction updated successfully");
          setTransaction({
            productName: "",
            productCount: "",
            brandName: "",
            unitPrice: 0,
            quantity: 0,
            totalBill: 0,
            partyName: "",
            partyArea: "",
            partyContactNumber: "",
            brokerName: "",
            brokerCommissionPercentage: 0,
            paymentType: "",
            transactionType: "",
          });
          router.push("/transactions");
        })
        .catch(() => {});
    } else {
      addTransaction(transaction)
        .unwrap()
        .then(() => {
          toast.success("Transaction added successfully");
          setTransaction({
            productName: "",
            productCount: "",
            brandName: "",
            unitPrice: 0,
            quantity: 0,
            totalBill: 0,
            partyName: "",
            partyArea: "",
            partyContactNumber: "",
            brokerName: "",
            brokerCommissionPercentage: 0,
            paymentType: "",
            transactionType: "",
          });
          router.push("/transactions");
        })
        .catch(() => {});
    }
  };
  return (
    <>
      <div className="add-transaction-page-wrapper pt-[45px] container gap-10 flex flex-col justify-center">
        <div className="page-heading">
          <h1 className="title text-center text-primary-clr">
          {id ? "Edit": "Add"} Transaction
          </h1>
        </div>
        <div className="add-transaction-form-wrapper flex flex-col gap-4">
          <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label>Enter Product Name</Label>
              <Input
                type="text"
                placeholder="Product Name"
                className="rounded-[10px] w-full  border-2 border-primary-clr"
                value={transaction?.productName}
                onChange={(e) => handleChange('productName', e.target.value)}
              />
            </div>
            <div>
              <Label>Enter Product Count</Label>
              <Input
                type="text"
                placeholder="Product Count"
                className="rounded-[10px] w-full] border-2 border-primary-clr"
                value={transaction?.productCount}
                onChange={(e) => handleChange('productCount', e.target.value)}
              />
            </div>
          </div>
          <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label>Enter Brand Name</Label>
              <Input
                type="text"
                placeholder="Brand Name"
                className="rounded-[10px] w-full  border-2 border-primary-clr"
                value={transaction?.brandName}
                onChange={(e) => handleChange('brandName', e.target.value)}
              />
            </div>
            <div>
              <Label>Enter Unit Price</Label>
              <Input
                type="number"
                placeholder="Unit Price"
                className="rounded-[10px] w-full border-2 border-primary-clr"
                value={transaction?.unitPrice}
                onChange={(e) => handleChange('unitPrice', e.target.value)}
              />
            </div>
          </div>
          <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label>Enter Quantity</Label>
              <Input
                type="number"
                placeholder="Quantity"
                className="rounded-[10px] w-full  border-2 border-primary-clr"
                value={transaction?.quantity}
                onChange={(e) => handleChange('quantity', e.target.value)}
              />
            </div>
            <div>
            <Label>Total Bill</Label>
              <Input
                type="text"
                placeholder="Bill"
                className="rounded-[10px] w-full  border-2 border-primary-clr"
                value={transaction?.totalBill}
                onChange={(e) => handleChange('totalBill', e.target.value)}
                disabled
              />
            </div>
            <div>
              <Label>Enter Party Name</Label>
              <Input
                type="text"
                placeholder="Party Name"
                className="rounded-[10px] w-full  border-2 border-primary-clr"
                value={transaction?.partyName}
                onChange={(e) => handleChange('partyName', e.target.value)}
              />
            </div>
          </div>
          <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label>Enter Party Contact Number</Label>
              <Input
                type="text"
                placeholder="Party Contact Number"
                className="rounded-[10px] w-full border-2 border-primary-clr"
                value={transaction?.partyContactNumber}
                onChange={(e) => handleChange('partyContactNumber', e.target.value)}
              />
            </div>
            <div>
              <Label>Enter Party Area</Label>
              <Input
                type="text"
                placeholder="Party Area"
                className="rounded-[10px] w-full border-2 border-primary-clr"
                value={transaction?.partyArea}
                onChange={(e) => handleChange('partyArea', e.target.value)}
              />
            </div>

            <div>
              <Label>Enter Broker Name</Label>
              <Input
                type="text"
                placeholder="Broker Name"
                className="rounded-[10px] w-full border-2 border-primary-clr"
                value={transaction?.brokerName}
                onChange={(e) => handleChange('brokerName', e.target.value)}
              />
            </div>
            <div>
              <Label>Enter Broker Comission Percentage</Label>
              <Input
                type="number"
                placeholder="Broker Comission Percentage"
                className="rounded-[10px] w-full border-2 border-primary-clr"
                value={transaction?.brokerCommissionPercentage}
                onChange={(e) => handleChange('brokerCommissionPercentage', e.target.value)}
              />
            </div>
          </div>
          <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Select Payment Type</Label>
              <select className="rounded-[10px] h-10 w-full  border-2 border-primary-clr"
                value={transaction?.paymentType}
                onChange={handlePaymentTypeChange}>
                <option>Select Payment Type</option>
                <option>Debit</option>
                <option>Credit</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Select Transaction Type</Label>
              <select className="rounded-[10px] h-10 w-full  border-2 border-primary-clr"
              value={transaction?.transactionType}
              onChange={handleTransactionTypeChange}>
                <option>Select Transaction Type</option>
                <option>Sale</option>
                <option>Purchase</option>
              </select>
            </div>
          </div>
        </div>
        
      <div className="add-product-btn mx-auto mt-10 m-5">
        <Button className="primaryBtn w-[150px] hover:bg-black  hover:text-white text-white" onClick={handleSave}>{id ? "Edit": "Add"} Transaction</Button>
      </div>
      </div>
    </>
  );
}
