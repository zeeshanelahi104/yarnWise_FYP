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
import {
  useGetInventoriesQuery,
  useUpdateInventoryMutation,
} from "@/features/inventorySlice";
import {
  useGetPartiesQuery,
  useUpdatePartyMutation,
} from "@/features/partySlice";
import { useGetBrokersQuery } from "@/features/brokerSlice";

// Define InventoryItem interface
interface InventoryItem {
  _id?: string;
  name: string;
  count: string;
  brand: string;
  stock: number;
}
interface PartyItem {
  _id?: string;
  partyName: string;
  ownerName: string;
  partyArea: string;
  address: string;
  contactNumber: string;
  balance: number;
  status: string;
}
interface BrokerItem {
  _id?: string;
  name: string;
  address: string;
  contactNumber: string;
}

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
    brokerName: "",
    brokerCommissionPercentage: 0,
    transactionType: "",
    debit: 0,
    credit: 0,
    balance: 0,
    status: "",
    createdAt:""
  });
  const [inventories, setInventories] = useState<InventoryItem[]>([]);
  const [parties, setParties] = useState<PartyItem[]>([]);
  const [brokers, setBrokers] = useState<BrokerItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<string[]>([]);
  const [filteredCounts, setFilteredCounts] = useState<string[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<string[]>([]);
  const [uniquePartyNames, setUniquePartyNames] = useState<string[]>([]);
  const [filteredPartyAreas, setFilteredPartyAreas] = useState<string[]>([]);
  const { data: transactions } = useGetTransactionQuery(id);
  const [addTransaction] = useAddTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();
  const [updateInventory] = useUpdateInventoryMutation();
  const [updateParty] = useUpdatePartyMutation();
  const { data: inventoriesData, refetch } = useGetInventoriesQuery();
  const { data: partiesData } = useGetPartiesQuery();
  const { data: brokersData } = useGetBrokersQuery();

  useEffect(() => {
    if (transactions && transactions.transaction) {
      setTransaction(transactions.transaction);
    }
    if (inventoriesData && inventoriesData.inventory) {
      setInventories(inventoriesData.inventory);
      console.log(" 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀");
    }
    if (partiesData && partiesData.party) {
      setParties(partiesData.party);
      const uniqueNames = Array.from(
        new Set(partiesData.party.map((p: any) => p.partyName))
      ) as string[];
      setUniquePartyNames(uniqueNames);
    }
    if (brokersData && brokersData.broker) {
      setBrokers(brokersData.broker);
    }
  }, [transactions, inventoriesData, partiesData, brokersData]);
  console.log(
    "Transactions to check in update before",
    transactions?.transaction?.credit
  );

  // Calculate totalBill whenever quantity or unitPrice changes
  useEffect(() => {
    let newDebit = 0;
    const newTotalBill = transaction.quantity * transaction.unitPrice;
    const remainingAmount = transaction.credit - newTotalBill;
    if (remainingAmount < 0) {
      newDebit = remainingAmount * -1;
    } else {
      newDebit = 0;
    }
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      totalBill: newTotalBill,
      debit: newDebit,
    }));
  }, [
    transaction.quantity,
    transaction.unitPrice,
    transaction.credit,
    transaction.balance,
  ]);

  useEffect(() => {
    const uniqueProductNames = Array.from(
      new Set(inventories.map((item) => item.name))
    );
    setFilteredProducts(uniqueProductNames);
  }, [inventories]);

  const handleChange = (field: string, value: any) => {
    const parsedValue = parseFloat(value);
    if (
      (["unitPrice", "quantity", "totalBill"].includes(field) &&
        parsedValue <= 0) ||
      (["debit", "credit", "brokerCommissionPercentage"].includes(field) &&
        parsedValue < 0)
    ) {
      return;
    }
    setTransaction((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleTransactionTypeChange = (e: any) => {
    const type = e.target.value;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      transactionType: type,
      productName: "",
      productCount: "",
      brandName: "",
    }));

    const uniqueProductNames = Array.from(
      new Set(inventories.map((item) => item.name))
    );
    const uniqueCounts = Array.from(
      new Set(inventories.map((item) => item.count))
    );
    const uniqueBrands = Array.from(
      new Set(inventories.map((item) => item.brand))
    );

    setFilteredProducts(uniqueProductNames);
    setFilteredCounts(uniqueCounts);
    setFilteredBrands(uniqueBrands);
  };

  const handleProductNameChange = (e: any) => {
    const productName = e.target.value;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      productName,
      productCount: "",
      brandName: "",
    }));

    const relatedCounts = Array.from(
      new Set(
        inventories
          .filter((item) => item.name === productName)
          .map((item) => item.count)
      )
    );
    const relatedBrands = Array.from(
      new Set(
        inventories
          .filter((item) => item.name === productName)
          .map((item) => item.brand)
      )
    );
    setFilteredCounts(relatedCounts);
    setFilteredBrands(relatedBrands);
  };

  const handlePartyNameChange = (e: any) => {
    const partyName = e.target.value;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      partyName,
      partyArea: "",
    }));

    const relatedAreas = Array.from(
      new Set(
        parties
          .filter((party) => party.partyName === partyName)
          .map((party) => party.partyArea)
      )
    );
    setFilteredPartyAreas(relatedAreas);
  };

  const updateStock = async (
    inventoryItem: InventoryItem,
    newStock: number
  ) => {
    if (!inventoryItem._id) {
      console.error("Inventory item ID is undefined. Cannot update stock.");
      return;
    }
    const updatedInventory = { ...inventoryItem, stock: newStock };
    await updateInventory({
      inventoryId: inventoryItem._id,
      body: updatedInventory,
    }).unwrap();
    await refetch();
  };
  const updateBalanceAndStatus = async (
    partyItem: PartyItem,
    newBalance: number,
    newStatus: string
  ) => {
    if (!partyItem._id) {
      console.error(
        "Party item ID is undefined. Cannot update balance and status."
      );
      return;
    }
    const updatedParty = {
      ...partyItem,
      balance: newBalance,
      status: newStatus,
    };
    await updateParty({
      PartyId: partyItem._id,
      body: updatedParty,
    }).unwrap();
  };
  const newProductCountValue = transaction.productCount; 
  const oldProductCountValue = transactions?.transaction?.productCount; 
  const newProductCountNumericValue = parseInt(newProductCountValue);
  const oldProductCountNumericValue = parseInt(oldProductCountValue);
  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // if (
    //   !transaction.productName ||
    //   !transaction.partyName ||
    //   !transaction.partyArea ||
    //   !transaction.brandName ||
    //   !transaction.brokerCommissionPercentage ||
    //   !transaction.productCount ||
    //   !transaction.transactionType ||
    //   !transaction.unitPrice
    // ) {
    //   alert("All Fields are required");
    //   return;
    // }

    const inventoryItem = inventories.find(
      (item) =>
        item.name === transaction.productName &&
        item.count === transaction.productCount &&
        item.brand === transaction.brandName
    );

    const partyItem = parties.find(
      (item) =>
        item.partyName === transaction.partyName &&
        item.partyArea === transaction.partyArea
    );

    if (transaction.transactionType === "Sale" && inventoryItem) {
      if (inventoryItem.stock === 0) {
        toast.error("Out of stock");
        return;
      } else if (transaction.quantity > inventoryItem.stock) {
        toast.error(
          `You have only ${inventoryItem.stock} units available for sale`
        );
        return;
      }
    }

    let dataToSend = { ...transaction };
    if (dataToSend._id) {
      delete dataToSend._id;
    }

    // Calculate new balance and status
    let newBalance = 0;
    let newStatus = "";

    if (partyItem) {
      if (partyItem.status === "Dr") {
        newBalance = -partyItem.balance;
      } else {
        newBalance = partyItem.balance;
      }
      newStatus = newBalance < 0 ? "Dr" : "Cr";
      newBalance = Math.abs(newBalance);

      // Update transaction object with new balance and status
      dataToSend.balance = newBalance;
      dataToSend.status = newStatus;
    }

    if (transactionId) {
      const oldInventoryItem = inventories.find(
        (item) =>
          item.name === transactions.transaction.productName &&
          item.count === transactions.transaction.productCount &&
          item.brand === transactions.transaction.brandName
      );
      updateTransaction({ transactionId, body: dataToSend })
        .unwrap()
        .then(async () => {
          if (oldInventoryItem) {
            const newStock =
              transactions.transaction.transactionType === "Purchase"
                ? oldInventoryItem.stock +
                  (transaction.quantity - transactions.transaction.quantity)
                : oldInventoryItem.stock -
                  (transaction.quantity - transactions.transaction.quantity);
            await updateStock(inventoryItem, newStock);
            console.log(" 🚀first step: stock", newStock);
          }

          // const updatedInventoryItem = inventories.find(
          //   (item) =>
          //     item.name === transaction.productName &&
          //     item.count === transaction.productCount &&
          //     item.brand === transaction.brandName
          // );

          // if (updatedInventoryItem) {
          //   console.log("🚀🚀 refresh: stock", updatedInventoryItem.stock);
          // }
          // if (newInventoryItem) {
          //   const newStock =
          //     transaction.transactionType === "Purchase"
          //       ? newInventoryItem.stock + transaction.quantity
          //       : newInventoryItem.stock - transaction.quantity;
          //   await updateStock(inventoryItem, newStock);
          // }

          if (partyItem) {
            let newTotalBill =
              Number(transaction.quantity) * transaction.unitPrice;
            let oldTotalBill =
              Number(transactions.transaction.quantity) *
              transactions.transaction.unitPrice;
            let cahngedTotalBill = newTotalBill - oldTotalBill;
            let changedCredit =
              transaction.credit - transactions.transaction.credit;

            if (transactions.transaction.transactionType === "Purchase") {
              if (partyItem.status === "Dr") {
                newBalance =
                  -partyItem.balance + cahngedTotalBill - changedCredit;
              } else {
                newBalance =
                  partyItem.balance + cahngedTotalBill - changedCredit;
              }
            } else {
              if (partyItem.status === "Dr") {
                newBalance =
                  -partyItem.balance + changedCredit - cahngedTotalBill;
              } else {
                newBalance =
                  partyItem.balance + changedCredit - cahngedTotalBill;
              }
            }
            newStatus = newBalance < 0 ? "Dr" : "Cr";
            newBalance = Math.abs(newBalance);
            await updateBalanceAndStatus(partyItem, newBalance, newStatus);
          }
          setTransaction({
            productName: "",
            productCount: "",
            brandName: "",
            unitPrice: 0,
            quantity: 0,
            totalBill: 0,
            partyName: "",
            partyArea: "",
            brokerName: "",
            brokerCommissionPercentage: 0,
            transactionType: "",
            debit: 0,
            credit: 0,
            balance: 0,
            status: "",
            createdAt:""
          });
          toast.success("Transaction updated successfully");
          router.push("/transactions/manage-transactions");
        })
        .catch((error) => {
          console.error("Error updating transaction:", error);
          toast.error("Failed to update transaction");
        });
    } else {
      addTransaction(dataToSend)
        .unwrap()
        .then(async () => {
          if (inventoryItem) {
            const newStock =
            transaction.transactionType === "Purchase"
                ? inventoryItem.stock + Number(transaction.quantity)
                : inventoryItem.stock - Number(transaction.quantity);
            await updateStock(inventoryItem, newStock);
          }
          if (partyItem) {
            let newTotalBill =
              Number(transaction.quantity) * transaction.unitPrice;
            if (transaction.transactionType === "Purchase") {
              if (partyItem.status === "Dr") {
                  newBalance =
                  -partyItem.balance + newTotalBill - transaction.credit;
              } else {
                newBalance =
                  partyItem.balance + newTotalBill - transaction.credit;
              }
            } else {
              if (partyItem.status === "Dr") {
                newBalance =
                  -partyItem.balance + transaction.credit - newTotalBill;
            
              } else {
                  newBalance =
                    partyItem.balance + transaction.credit - newTotalBill;
              
                }
              }
              newStatus = newBalance < 0 ? "Dr" : "Cr";
              newBalance = Math.abs(newBalance);
              await updateBalanceAndStatus(partyItem, newBalance, newStatus);
            }
            setTransaction({
              productName: "",
              productCount: "",
              brandName: "",
            unitPrice: 0,
            quantity: 0,
            totalBill: 0,
            partyName: "",
            partyArea: "",
            brokerName: "",
            brokerCommissionPercentage: 0,
            transactionType: "",
            debit: 0,
            credit: 0,
            balance: 0,
            status: "",
            createdAt:""
          });
          toast.success("Transaction added successfully");
          router.push("/transactions/manage-transactions");
        })
        .catch((error) => {
          console.error("Error adding transaction:", error);
          toast.error("Failed to add transaction");
        });
    }
  };

  return (
    <>
      <div className="container-fluid px-4 py-5">
        <h1 className="title container pt-[10px] text-[40px] text-primary-clr title font-bold flex justify-center items-center uppercase">
          {id ? "Edit" : "Add"} Transaction
        </h1>
        <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label>Transaction Type</Label>
            <select
              className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
              value={transaction?.transactionType}
              onChange={handleTransactionTypeChange}
              disabled={Boolean(transactionId)}
            >
              <option disabled value="">
                Select Transaction Type
              </option>
              <option value="Purchase">Purchase</option>
              <option value="Sale">Sale</option>
            </select>
          </div>
          <div>
            <Label>Enter Product Name</Label>
            <select
              className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
              value={transaction?.productName}
              onChange={handleProductNameChange}
              disabled={Boolean(transactionId)}
            >
              <option disabled value="">
                Select Product Name
              </option>
              {filteredProducts.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Enter Product Count</Label>
            <select
              className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
              value={transaction?.productCount}
              onChange={(e) => handleChange("productCount", e.target.value)}
              disabled={Boolean(transactionId)}
            >
              <option disabled value="">
                Select Product Count
              </option>
              {filteredCounts.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Enter Brand Name</Label>
            <select
              className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
              value={transaction?.brandName}
              onChange={(e) => handleChange("brandName", e.target.value)}
              disabled={Boolean(transactionId)}
            >
              <option disabled value="">
                Select Brand Name
              </option>
              {filteredBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Enter Unit Price</Label>
            <Input
              type="number"
              placeholder="Unit Price"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.unitPrice}
              onChange={(e) =>
                handleChange("unitPrice", parseFloat(e.target.value))
              }
            />
          </div>
          <div>
            <Label>Enter Quantity</Label>
            <Input
              type="number"
              placeholder="Quantity"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.quantity}
              onChange={(e) =>
                handleChange("quantity", parseFloat(e.target.value))
              }
            />
          </div>
        </div>
        <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label>Total Bill</Label>
            <Input
              type="text"
              placeholder="Bill"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.totalBill}
              onChange={(e) =>
                handleChange("totalBill", parseFloat(e.target.value))
              }
              disabled
            />
          </div>
          <div>
            <Label>Enter Party Name</Label>
            <select
              className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
              value={transaction?.partyName}
              onChange={handlePartyNameChange}
              disabled={Boolean(transactionId)}
            >
              <option disabled value="">
                Select Party Name
              </option>
              {uniquePartyNames.map((partyName) => (
                <option key={partyName} value={partyName}>
                  {partyName}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label>Enter Party Area</Label>
            <select
              className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
              value={transaction?.partyArea}
              onChange={(e) => handleChange("partyArea", e.target.value)}
              disabled={Boolean(transactionId)}
            >
              <option disabled value="">
                Select Party Area
              </option>
              {filteredPartyAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Enter Broker Name</Label>
            <select
              className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
              value={transaction?.brokerName}
              onChange={(e) => handleChange("brokerName", e.target.value)}
              disabled={Boolean(transactionId)}
            >
              <option disabled value="">
                Select Broker Name
              </option>
              {brokers &&
                brokers?.map((broker) => (
                  <option key={broker._id} value={broker.name}>
                    {broker.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Enter Credit</Label>
            <Input
              type="number"
              placeholder="Enter Credit"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.credit}
              onChange={(e) =>
                handleChange("credit", parseFloat(e.target.value))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Enter Debit</Label>
            <Input
              type="number"
              placeholder="Debit"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.debit}
              onChange={(e) =>
                handleChange("debit", parseFloat(e.target.value))
              }
              disabled
            />
          </div>
        </div>
        <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label>Enter Broker Commission</Label>
            <Input
              type="number"
              placeholder="Broker Commission"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.brokerCommissionPercentage}
              onChange={(e) =>
                handleChange(
                  "brokerCommissionPercentage",
                  parseFloat(e.target.value)
                )
              }
              disabled
            />
          </div>
        </div>

        <div className="add-product-btn mx-auto mt-10 m-5">
          <Button
            className="primaryBtn w-[150px] hover:bg-black hover:text-white text-white"
            onClick={handleSave}
          >
            {id ? "Edit" : "Add"} Transaction
          </Button>
        </div>
      </div>
    </>
  );
}
