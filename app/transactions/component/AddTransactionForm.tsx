// "use client";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Transaction } from "@/types";
// import {
//   useGetTransactionQuery,
//   useUpdateTransactionMutation,
//   useAddTransactionMutation,
// } from "@/features/transactionSlice";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   useGetInventoriesQuery,
//   useUpdateInventoryMutation,
// } from "@/features/inventorySlice";
// import {
//   useGetPartiesQuery,
//   useUpdatePartyMutation,
// } from "@/features/partySlice";
// import { useGetBrokersQuery } from "@/features/brokerSlice";

// // Define InventoryItem interface
// interface InventoryItem {
//   _id?: string;
//   name: string;
//   count: string;
//   brand: string;
//   stock: number;
// }
// interface PartyItem {
//   _id?: string;
//   partyName: string;
//   ownerName: string;
//   partyArea: string;
//   address: string;
//   contactNumber: string;
//   balance: number;
//   status: string;
// }
// interface BrokerItem {
//   _id?: string;
//   name: string;
//   address: string;
//   contactNumber: string;
// }

// export default function AddTransactionForm() {
//   const params = useParams();
//   const router = useRouter();
//   const { id } = params;
//   const transactionId = Array.isArray(id) ? id[0] : id;
//   const [transaction, setTransaction] = useState<Transaction>({
//     productName: "",
//     productCount: "",
//     brandName: "",
//     unitPrice: 0,
//     quantity: 0,
//     totalBill: 0,
//     partyName: "",
//     partyArea: "",
//     brokerName: "",
//     brokerCommissionPercentage: 0,
//     transactionType: "",
//     debit: 0,
//     credit: 0,
//     balance: 0,
//     status: "",
//   });

//   const [inventories, setInventories] = useState<InventoryItem[]>([]);
//   const [parties, setParties] = useState<PartyItem[]>([]);
//   const [brokers, setBrokers] = useState<BrokerItem[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<string[]>([]);
//   const [filteredCounts, setFilteredCounts] = useState<string[]>([]);
//   const [filteredBrands, setFilteredBrands] = useState<string[]>([]);
//   const [uniquePartyNames, setUniquePartyNames] = useState<string[]>([]);
//   const [filteredPartyAreas, setFilteredPartyAreas] = useState<string[]>([]);
//   const { data: transactions } = useGetTransactionQuery(id);
 
  
  
//   const [addTransaction] = useAddTransactionMutation();
//   const [updateTransaction] = useUpdateTransactionMutation();
//   const [updateInventory] = useUpdateInventoryMutation();
//   const [updateParty] = useUpdatePartyMutation();
//   const { data: inventoriesData } = useGetInventoriesQuery();
//   const { data: partiesData } = useGetPartiesQuery();
//   const { data: brokersData } = useGetBrokersQuery();
  

  // useEffect(() => {
  //   if (transactions && transactions.transaction) {
  //     setTransaction(transactions.transaction);
  //   }
   
  // }, []);
  // console.log("Transactions to check in update before", transactions?.transaction?.credit)

  // // Calculate totalBill whenever quantity or unitPrice changes
  // useEffect(() => {
  //   let newDebit = 0;
  //   const newTotalBill = transaction.quantity * transaction.unitPrice;
  //   const remainingAmount = transaction.credit - newTotalBill;
  //   if (remainingAmount < 0) {
  //     newDebit = remainingAmount * -1;
  //   } else {
  //     newDebit = 0;
  //   }
  //   setTransaction((prevTransaction) => ({
  //     ...prevTransaction,
  //     totalBill: newTotalBill,
  //     debit: newDebit,
  //   }));
  //   if (inventoriesData && inventoriesData.inventory) {
  //     setInventories(inventoriesData.inventory);
  //   }
  //   if (partiesData && partiesData.party) {
  //     setParties(partiesData.party);
  //     const uniqueNames = Array.from(
  //       new Set(partiesData.party.map((p: any) => p.partyName))
  //     ) as string[];
  //     setUniquePartyNames(uniqueNames);
  //   }
  //   if (brokersData && brokersData.broker) {
  //     setBrokers(brokersData.broker);
  //   }
  // }, [
  //   transaction.quantity,
  //   transaction.unitPrice,
  //   transaction.credit,
  //   transaction.balance,
  // ]);

//   useEffect(() => {
//     const uniqueProductNames = Array.from(
//       new Set(inventories.map((item) => item.name))
//     );
//     setFilteredProducts(uniqueProductNames);
//   }, [inventories]);

//   const handleChange = (field: string, value: any) => {
//     const parsedValue = parseFloat(value);
//     if (
//       (["unitPrice", "quantity", "totalBill"].includes(field) &&
//         parsedValue <= 0) ||
//       (["debit", "credit", "brokerCommissionPercentage"].includes(field) &&
//         parsedValue < 0)
//     ) {
//       return;
//     }
//     setTransaction((prevData) => ({ ...prevData, [field]: value }));
//   };

//   const handleTransactionTypeChange = (e: any) => {
//     const type = e.target.value;
//     setTransaction((prevTransaction) => ({
//       ...prevTransaction,
//       transactionType: type,
//       productName: "",
//       productCount: "",
//       brandName: "",
//     }));

//     const uniqueProductNames = Array.from(
//       new Set(inventories.map((item) => item.name))
//     );
//     const uniqueCounts = Array.from(
//       new Set(inventories.map((item) => item.count))
//     );
//     const uniqueBrands = Array.from(
//       new Set(inventories.map((item) => item.brand))
//     );

//     setFilteredProducts(uniqueProductNames);
//     setFilteredCounts(uniqueCounts);
//     setFilteredBrands(uniqueBrands);
//   };

//   const handleProductNameChange = (e: any) => {
//     const productName = e.target.value;
//     setTransaction((prevTransaction) => ({
//       ...prevTransaction,
//       productName,
//       productCount: "",
//       brandName: "",
//     }));

//     const relatedCounts = Array.from(
//       new Set(
//         inventories
//           .filter((item) => item.name === productName)
//           .map((item) => item.count)
//       )
//     );
//     const relatedBrands = Array.from(
//       new Set(
//         inventories
//           .filter((item) => item.name === productName)
//           .map((item) => item.brand)
//       )
//     );
//     setFilteredCounts(relatedCounts);
//     setFilteredBrands(relatedBrands);
//   };

//   const handlePartyNameChange = (e: any) => {
//     const partyName = e.target.value;
//     setTransaction((prevTransaction) => ({
//       ...prevTransaction,
//       partyName,
//       partyArea: "",
//     }));

//     const relatedAreas = Array.from(
//       new Set(
//         parties
//           .filter((party) => party.partyName === partyName)
//           .map((party) => party.partyArea)
//       )
//     );
//     setFilteredPartyAreas(relatedAreas);
//   };

//   const updateStock = async (
//     inventoryItem: InventoryItem,
//     newStock: number
//   ) => {
//     if (!inventoryItem._id) {
//       console.error("Inventory item ID is undefined. Cannot update stock.");
//       return;
//     }
//     const updatedInventory = { ...inventoryItem, stock: newStock };
//     await updateInventory({
//       inventoryId: inventoryItem._id,
//       body: updatedInventory,
//     }).unwrap();
//   };
//   const updateBalanceAndStatus = async (
//     partyItem: PartyItem,
//     newBalance: number,
//     newStatus: string
//   ) => {
//     if (!partyItem._id) {
//       console.error(
//         "Party item ID is undefined. Cannot update balance and status."
//       );
//       return;
//     }
//     const updatedParty = {
//       ...partyItem,
//       balance: newBalance,
//       status: newStatus,
//     };
//     await updateParty({
//       PartyId: partyItem._id,
//       body: updatedParty,
//     }).unwrap();
//   };
 
  
//   const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
//   e.preventDefault();
//   // if (
//   //   !transaction.productName ||
//   //   !transaction.partyName ||
//   //   !transaction.partyArea ||
//   //   !transaction.brandName ||
//   //   !transaction.brokerCommissionPercentage ||
//   //   !transaction.productCount ||
//   //   !transaction.transactionType ||
//   //   !transaction.unitPrice
//   // ) {
//   //   alert("All Fields are required");
//   //   return;
//   // }

//   // const oldInventoryItem = inventories.find(
//   //   (item) =>
//   //     item.name === transactions.transaction.productName &&
//   //     item.count === transactions.transaction.productCount &&
//   //     item.brand === transactions.transaction.brandName
//   // );
//   const inventoryItem = inventories.find(
//     (item) =>
//       item.name === transaction.productName &&
//       item.count === transaction.productCount &&
//       item.brand === transaction.brandName
//   );

//   const partyItem = parties.find(
//     (item) =>
//       item.partyName === transaction.partyName &&
//       item.partyArea === transaction.partyArea
//   );

  // if (transaction.transactionType === "Sale" && inventoryItem) {
  //   if (inventoryItem.stock === 0) {
  //     toast.error("Out of stock");
  //     return;
  //   } else if (transaction.quantity > inventoryItem.stock) {
  //     toast.error(
  //       `You have only ${inventoryItem.stock} units available for sale`
  //     );
  //     return;
  //   }
  // }

//   let dataToSend = { ...transaction };
//   if (dataToSend._id) {
//     delete dataToSend._id;
//   }

//   // Calculate new balance and status
//   let newBalance = 0;
//   let newStatus = "";

//   if (partyItem) {
//     const newTotalBill = transaction.quantity * transaction.unitPrice;
//     const remainingAmount = transaction.credit - newTotalBill;

//     if (partyItem.status === "Dr") {
//       newBalance = -(partyItem.balance) + remainingAmount;
//     } else {
//       newBalance = partyItem.balance + remainingAmount;
//     }
//     newStatus = newBalance < 0 ? "Dr" : "Cr";
//     newBalance = Math.abs(newBalance);

//     // Update transaction object with new balance and status
//     dataToSend.balance = newBalance;
//     dataToSend.status = newStatus;
//   }

//   if (transactionId) {
//     updateTransaction({ transactionId, body: dataToSend })
//       .unwrap()
//       .then(async () => {
       
        // if (oldInventoryItem) {
        //   console.log("transactions.transaction.transactionType",transactions.transaction.transactionType)
        //   console.log("oldInventoryItem.stock",oldInventoryItem.stock)
        //   console.log("transactions.transaction.quantity",transactions.transaction.quantity)
        //   const newStock =
        //     transactions.transaction.transactionType === "Purchase"
        //       ? oldInventoryItem.stock - transactions.transaction.quantity
        //       : oldInventoryItem.stock + transactions.transaction.quantity
        //       console.log("Old Old Old OldStock",newStock)
        //   await updateStock(oldInventoryItem, newStock);
        // }
//         if (inventoryItem) {
//           console.log("New InventoryItem.stock",inventoryItem.stock)

//           const newStock =
//             transaction.transactionType === "Purchase"
//               ? inventoryItem.stock + transaction.quantity
//               : inventoryItem.stock - transaction.quantity;
//               console.log("New New New newStock",newStock)
             
//           await updateStock(inventoryItem, newStock);
//         }
        
//         if (partyItem) {
//           await updateBalanceAndStatus(partyItem, newBalance, newStatus);
//         }
//         setTransaction({
//           productName: "",
//           productCount: "",
//           brandName: "",
//           unitPrice: 0,
//           quantity: 0,
//           totalBill: 0,
//           partyName: "",
//           partyArea: "",
//           brokerName: "",
//           brokerCommissionPercentage: 0,
//           transactionType: "",
//           debit: 0,
//           credit: 0,
//           balance: 0,
//           status: "",
//         });
//         toast.success("Transaction updated successfully");
//         router.push("/transactions");
//       })
//       .catch((error) => {
//         console.error("Error updating transaction:", error);
//         toast.error("Failed to update transaction");
//       });
//       // console.log(" api ooooold Transaction", transactions);
//       // console.log("api newwwww Transaction", transaction);
//   } else {
//     addTransaction(dataToSend)
//       .unwrap()
//       .then(async () => {
//         toast.success("Transaction added successfully");
       
//         if (inventoryItem) {
//           const newStock =
//             transaction.transactionType === "Purchase"
//               ? inventoryItem.stock + Number(transaction.quantity)
//               : inventoryItem.stock - Number(transaction.quantity);
//           await updateStock(inventoryItem, newStock);
//         }
//         if (partyItem) {
//           await updateBalanceAndStatus(partyItem, newBalance, newStatus);
//         }
//         setTransaction({
//           productName: "",
//           productCount: "",
//           brandName: "",
//           unitPrice: 0,
//           quantity: 0,
//           totalBill: 0,
//           partyName: "",
//           partyArea: "",
//           brokerName: "",
//           brokerCommissionPercentage: 0,
//           transactionType: "",
//           debit: 0,
//           credit: 0,
//           balance: 0,
//           status: "",
//         });
//         router.push("/transactions");
//       })
//       .catch((error) => {
//         console.error("Error adding transaction:", error);
//         toast.error("Failed to add transaction");
//       });
//   }
// };


//   return (
//     <>
//       <div className="container-fluid px-4 py-5">
//         <h1 className="title container pt-[10px] text-[40px] text-primary-clr title font-bold flex justify-center items-center uppercase">
//             {id ? "Edit" : "Add"} Transaction
//           </h1>
//         <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div>
//             <Label>Transaction Type</Label>
//             <select
//               className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
//               value={transaction?.transactionType}
//               onChange={handleTransactionTypeChange}
//             >
//               <option disabled value="">
//                 Select Transaction Type
//               </option>
//               <option value="Purchase">Purchase</option>
//               <option value="Sale">Sale</option>
//             </select>
//           </div>
//           <div>
//             <Label>Enter Product Name</Label>
//             <select
//               className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
//               value={transaction?.productName}
//               onChange={handleProductNameChange}
//             >
//               <option disabled value="">
//                 Select Product Name
//               </option>
//               {filteredProducts.map((product) => (
//                 <option key={product} value={product}>
//                   {product}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <Label>Enter Product Count</Label>
//             <select
//               className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
//               value={transaction?.productCount}
//               onChange={(e) => handleChange("productCount", e.target.value)}
//             >
//               <option disabled value="">
//                 Select Product Count
//               </option>
//               {filteredCounts.map((count) => (
//                 <option key={count} value={count}>
//                   {count}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <Label>Enter Brand Name</Label>
//             <select
//               className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
//               value={transaction?.brandName}
//               onChange={(e) => handleChange("brandName", e.target.value)}
//             >
//               <option disabled value="">
//                 Select Brand Name
//               </option>
//               {filteredBrands.map((brand) => (
//                 <option key={brand} value={brand}>
//                   {brand}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <Label>Enter Unit Price</Label>
//             <Input
//               type="number"
//               placeholder="Unit Price"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.unitPrice}
//               onChange={(e) =>
//                 handleChange("unitPrice", parseFloat(e.target.value))
//               }
//             />
//           </div>
//           <div>
//             <Label>Enter Quantity</Label>
//             <Input
//               type="number"
//               placeholder="Quantity"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.quantity}
//               onChange={(e) =>
//                 handleChange("quantity", parseFloat(e.target.value))
//               }
//             />
//           </div>
//         </div>
//         <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div>
//             <Label>Total Bill</Label>
//             <Input
//               type="text"
//               placeholder="Bill"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.totalBill}
//               onChange={(e) =>
//                 handleChange("totalBill", parseFloat(e.target.value))
//               }
//               disabled
//             />
//           </div>
//           <div>
//             <Label>Enter Party Name</Label>
//             <select
//               className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
//               value={transaction?.partyName}
//               onChange={handlePartyNameChange}
//             >
//               <option disabled value="">
//                 Select Party Name
//               </option>
//               {uniquePartyNames.map((partyName) => (
//                 <option key={partyName} value={partyName}>
//                   {partyName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div>
//             <Label>Enter Party Area</Label>
//             <select
//               className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
//               value={transaction?.partyArea}
//               onChange={(e) => handleChange("partyArea", e.target.value)}
//             >
//               <option disabled value="">
//                 Select Party Area
//               </option>
//               {filteredPartyAreas.map((area) => (
//                 <option key={area} value={area}>
//                   {area}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <Label>Enter Broker Name</Label>
//             <select
//               className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
//               value={transaction?.brokerName}
//               onChange={(e) => handleChange("brokerName", e.target.value)}
//             >
//               <option disabled value="">
//                 Select Broker Name
//               </option>
//               {brokers &&
//                 brokers?.map((broker) => (
//                   <option key={broker._id} value={broker.name}>
//                     {broker.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Enter Credit</Label>
//             <Input
//               type="number"
//               placeholder="Enter Credit"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.credit}
//               onChange={(e) =>
//                 handleChange("credit", parseFloat(e.target.value))
//               }
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Enter Debit</Label>
//             <Input
//               type="number"
//               placeholder="Debit"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.debit}
//               onChange={(e) =>
//                 handleChange("debit", parseFloat(e.target.value))
//               }
//               disabled
//             />
//           </div>
//         </div>
//         <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div>
//             <Label>Broker Commission</Label>
//             <Input
//               type="number"
//               placeholder="Broker Commission Percentage"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.brokerCommissionPercentage}
//               onChange={(e) =>
//                 handleChange(
//                   "brokerCommissionPercentage",
//                   parseFloat(e.target.value)
//                 )
//               }
//             />
//           </div>
//         </div>

//         <div className="add-product-btn mx-auto mt-10 m-5">
//           <Button
//             className="primaryBtn w-[150px] hover:bg-black hover:text-white text-white"
//             onClick={handleSave}
//           >
//             {id ? "Edit" : "Add"} Transaction
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// }




// "use client";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { Transaction } from "@/types";
// import {
//   useGetTransactionQuery,
//   useUpdateTransactionMutation,
//   useAddTransactionMutation,
// } from "@/features/transactionSlice";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   useGetInventoriesQuery,
//   useUpdateInventoryMutation,
// } from "@/features/inventorySlice";
// import {
//   useGetPartiesQuery,
//   useUpdatePartyMutation,
// } from "@/features/partySlice";
// import { useGetBrokersQuery } from "@/features/brokerSlice";

// // Define InventoryItem interface
// interface InventoryItem {
//   _id?: string;
//   name: string;
//   count: string;
//   brand: string;
//   stock: number;
// }
// interface PartyItem {
//   _id?: string;
//   partyName: string;
//   ownerName: string;
//   partyArea: string;
//   address: string;
//   contactNumber: string;
//   balance: number;
//   status: string;
// }
// interface BrokerItem {
//   _id?: string;
//   name: string;
//   address: string;
//   contactNumber: string;
// }

// export default function AddTransactionForm() {
//   const params = useParams();
//   const router = useRouter();
//   const { id } = params;
//   const transactionId = Array.isArray(id) ? id[0] : id;
//   const [transaction, setTransaction] = useState<Transaction>({
//     productName: "",
//     productCount: "",
//     brandName: "",
//     unitPrice: 0,
//     quantity: 0,
//     totalBill: 0,
//     partyName: "",
//     partyArea: "",
//     brokerName: "",
//     brokerCommissionPercentage: 0,
//     transactionType: "",
//     debit: 0,
//     credit: 0,
//     balance: 0,
//     status: "",
//   });

//   const [inventories, setInventories] = useState<InventoryItem[]>([]);
//   const [parties, setParties] = useState<PartyItem[]>([]);
//   const [brokers, setBrokers] = useState<BrokerItem[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<string[]>([]);
//   const [filteredCounts, setFilteredCounts] = useState<string[]>([]);
//   const [filteredBrands, setFilteredBrands] = useState<string[]>([]);
//   const [uniquePartyNames, setUniquePartyNames] = useState<string[]>([]);
//   const [filteredPartyAreas, setFilteredPartyAreas] = useState<string[]>([]);
//   const { data: transactions } = useGetTransactionQuery(id);
//   const [oldTransaction, setOldTransaction] = useState<Transaction | null>(null);

//   const [addTransaction] = useAddTransactionMutation();
//   const [updateTransaction] = useUpdateTransactionMutation();
//   const [updateInventory] = useUpdateInventoryMutation();
//   const [updateParty] = useUpdatePartyMutation();
//   const { data: inventoriesData } = useGetInventoriesQuery();
//   const { data: partiesData } = useGetPartiesQuery();
//   const { data: brokersData } = useGetBrokersQuery();
  
//   useEffect(() => {
//     if (transactions && transactions.transaction) {
//       setTransaction(transactions.transaction);
//       setOldTransaction(transactions.transaction);
//     }
//   }, [transactions]);
//   useEffect(() => {
//     if (inventoriesData && inventoriesData.inventory) {
//       setInventories(inventoriesData.inventory);
//     }
//     if (partiesData && partiesData.party) {
//       setParties(partiesData.party);
//       const uniqueNames = Array.from(
//         new Set(partiesData.party.map((p: any) => p.partyName))
//       ) as string[];
//       setUniquePartyNames(uniqueNames);
//     }
//     if (brokersData && brokersData.broker) {
//       setBrokers(brokersData.broker);
//     }
//   }, [transaction]);

//   // Calculate totalBill whenever quantity or unitPrice changes
//   useEffect(() => {
//     let newDebit = 0;
//     const newTotalBill = transaction.quantity * transaction.unitPrice;
//     const remainingAmount = transaction.credit - newTotalBill;
//     if (remainingAmount < 0) {
//       newDebit = remainingAmount * -1;
//     } else {
//       newDebit = 0;
//     }
//     setTransaction((prevTransaction) => ({
//       ...prevTransaction,
//       totalBill: newTotalBill,
//       debit: newDebit,
//     }));
    
//   }, [
//     transaction.quantity,
//     transaction.unitPrice,
//     transaction.credit,
//     transaction.balance,
//   ]);

//   useEffect(() => {
//     const uniqueProductNames = Array.from(
//       new Set(inventories.map((item) => item.name))
//     );
//     setFilteredProducts(uniqueProductNames);
//   }, [inventories]);

//   const handleChange = (field: string, value: any) => {
//     const parsedValue = parseFloat(value);
//     if (
//       (["unitPrice", "quantity", "totalBill"].includes(field) &&
//         parsedValue <= 0) ||
//       (["debit", "credit", "brokerCommissionPercentage"].includes(field) &&
//         parsedValue < 0)
//     ) {
//       return;
//     }
//     setTransaction((prevData) => ({ ...prevData, [field]: value }));
//   };

//   const handleTransactionTypeChange = (e: any) => {
//     const type = e.target.value;
//     setTransaction((prevTransaction) => ({
//       ...prevTransaction,
//       transactionType: type,
//       productName: "",
//       productCount: "",
//       brandName: "",
//     }));

//     const uniqueProductNames = Array.from(
//       new Set(inventories.map((item) => item.name))
//     );
//     const uniqueCounts = Array.from(
//       new Set(inventories.map((item) => item.count))
//     );
//     const uniqueBrands = Array.from(
//       new Set(inventories.map((item) => item.brand))
//     );

//     setFilteredProducts(uniqueProductNames);
//     setFilteredCounts(uniqueCounts);
//     setFilteredBrands(uniqueBrands);
//   };

//   const handleProductNameChange = (e: any) => {
//     const productName = e.target.value;
//     setTransaction((prevTransaction) => ({
//       ...prevTransaction,
//       productName,
//       productCount: "",
//       brandName: "",
//     }));

//     const relatedCounts = Array.from(
//       new Set(
//         inventories
//           .filter((item) => item.name === productName)
//           .map((item) => item.count)
//       )
//     );
//     const relatedBrands = Array.from(
//       new Set(
//         inventories
//           .filter((item) => item.name === productName)
//           .map((item) => item.brand)
//       )
//     );
//     setFilteredCounts(relatedCounts);
//     setFilteredBrands(relatedBrands);
//   };

//   const handlePartyNameChange = (e: any) => {
//     const partyName = e.target.value;
//     setTransaction((prevTransaction) => ({
//       ...prevTransaction,
//       partyName,
//       partyArea: "",
//     }));

//     const relatedAreas = Array.from(
//       new Set(
//         parties
//           .filter((party) => party.partyName === partyName)
//           .map((party) => party.partyArea)
//       )
//     );
//     setFilteredPartyAreas(relatedAreas);
//   };

//   const updateStock = async (
//     inventoryItem: InventoryItem,
//     newStock: number
//   ) => {
//     if (!inventoryItem._id) {
//       console.error("Inventory item ID is undefined. Cannot update stock.");
//       return;
//     }
//     const updatedInventory = { ...inventoryItem, stock: newStock };
//     await updateInventory({
//       inventoryId: inventoryItem._id,
//       body: updatedInventory,
//     }).unwrap();
//   };

//   const updateBalanceAndStatus = async (
//     partyItem: PartyItem,
//     newBalance: number,
//     newStatus: string
//   ) => {
//     if (!partyItem._id) {
//       console.error(
//         "Party item ID is undefined. Cannot update balance and status."
//       );
//       return;
//     }
//     const updatedParty = {
//       ...partyItem,
//       balance: newBalance,
//       status: newStatus,
//     };
//     await updateParty({
//       PartyId: partyItem._id,
//       body: updatedParty,
//     }).unwrap();
//   };

//   const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
  
//     const inventoryItem = inventories.find(
//       (item) =>
//         item.name === transaction.productName &&
//         item.count === transaction.productCount &&
//         item.brand === transaction.brandName
//     );
  
//     const partyItem = parties.find(
//       (item) =>
//         item.partyName === transaction.partyName &&
//         item.partyArea === transaction.partyArea
//     );
  
//     if (!inventoryItem || !partyItem) {
//       toast.error("Product or Party not found in inventory");
//       return;
//     }
  
//     // Check for out of stock conditions for sales
//     if (transaction.transactionType === "Sale") {
//       if (inventoryItem.stock === 0) {
//         toast.error("Out of stock");
//         return;
//       } else if (transaction.quantity > inventoryItem.stock) {
//         toast.error(`You have only ${inventoryItem.stock} units available for sale`);
//         return;
//       }
//     }
  
//     // Reverse old transaction
//     if (oldTransaction) {
//       console.log("Old Transaction", oldTransaction)
//       const oldInventoryItem = inventories.find(
//         (item) =>
//           item.name === oldTransaction.productName &&
//           item.count === oldTransaction.productCount &&
//           item.brand === oldTransaction.brandName
//       );
//       const oldPartyItem = parties.find(
//         (item) =>
//           item.partyName === oldTransaction.partyName &&
//           item.partyArea === oldTransaction.partyArea
//       );
//   console.log("oldInventoryItem",oldInventoryItem);
//   console.log("oldPartyItem",oldPartyItem)
//       if (oldTransaction.transactionType === "Sale") {
//         if (oldInventoryItem) {
//           const reversedStock = oldInventoryItem.stock + oldTransaction.quantity;
//           console.log("Sale reversedStock", reversedStock);
//           await updateStock(oldInventoryItem, reversedStock);
//         }
//         if (oldPartyItem) {
//           const reversedBalance = oldPartyItem.balance + oldTransaction.totalBill;
//           const newStatus = reversedBalance < 0 ? "Cr" : "Dr";
//           await updateBalanceAndStatus(oldPartyItem, reversedBalance, newStatus);
//         }
//       } else if (oldTransaction.transactionType === "Purchase") {
//         if (oldInventoryItem) {
//           const reversedStock = oldInventoryItem.stock - oldTransaction.quantity;
//           console.log("Purchase reversedStock", reversedStock);

//           await updateStock(oldInventoryItem, reversedStock);
//         }
//         if (oldPartyItem) {
//           const reversedBalance = oldPartyItem.balance - oldTransaction.totalBill;
//           const newStatus = reversedBalance < 0 ? "Cr" : "Dr";
//           await updateBalanceAndStatus(oldPartyItem, reversedBalance, newStatus);
//         }
//       }
//     }
  
//     // Apply new transaction
//     if (transaction.transactionType === "Sale") {
//       const updatedStock = inventoryItem.stock - transaction.quantity;
//       console.log("Sale updatedStock", updatedStock);

//       if (updatedStock < 0) {
//         toast.error("Stock cannot be negative");
//         return;
//       }
//       const updatedBalance = partyItem.balance - transaction.totalBill;
//       console.log("updatedBalance",updatedBalance)
//       const newStatus = updatedBalance < 0 ? "Cr" : "Dr";
//       await updateStock(inventoryItem, updatedStock);
//       await updateBalanceAndStatus(partyItem, updatedBalance, newStatus);
//     } else if (transaction.transactionType === "Purchase") {
//       const updatedStock = inventoryItem.stock + transaction.quantity;
//       console.log("Purchase updatedStock", updatedStock);
//       const updatedBalance = partyItem.balance + transaction.totalBill;
//       const newStatus = updatedBalance < 0 ? "Cr" : "Dr";
//       await updateStock(inventoryItem, updatedStock);
//       await updateBalanceAndStatus(partyItem, updatedBalance, newStatus);
//     } else {
//       toast.error("Invalid transaction type");
//       return;
//     }
  
//     if (transactionId) {
//       await updateTransaction({ transactionId, body: transaction });
//       toast.success("Transaction updated successfully!");
//     } else {
//       await addTransaction(transaction);
//       toast.success("Transaction added successfully!");
//     }
  
//     router.push("/transactions/manage-transactions");
//   };
  
  


//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
//       <form>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <Label htmlFor="transactionType">Transaction Type</Label>
//             <select
//               id="transactionType"
//               value={transaction.transactionType}
//               onChange={handleTransactionTypeChange}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded"
//               required
//             >
//               <option value="">Select Type</option>
//               <option value="Sale">Sale</option>
//               <option value="Purchase">Purchase</option>
//             </select>
//           </div>
//           <div>
//             <Label htmlFor="productName">Product Name</Label>
//             <select
//               id="productName"
//               value={transaction.productName}
//               onChange={handleProductNameChange}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded"
//               required
//             >
//               <option value="">Select Product</option>
//               {filteredProducts.map((product, index) => (
//                 <option key={index} value={product}>
//                   {product}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <Label htmlFor="productCount">Product Count</Label>
//             <select
//               id="productCount"
//               value={transaction.productCount}
//               onChange={(e) =>
//                 handleChange("productCount", e.target.value)
//               }
//               className="block w-full mt-1 p-2 border border-gray-300 rounded"
//               required
//             >
//               <option value="">Select Count</option>
//               {filteredCounts.map((count, index) => (
//                 <option key={index} value={count}>
//                   {count}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <Label htmlFor="brandName">Brand Name</Label>
//             <select
//               id="brandName"
//               value={transaction.brandName}
//               onChange={(e) => handleChange("brandName", e.target.value)}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded"
//               required
//             >
//               <option value="">Select Brand</option>
//               {filteredBrands.map((brand, index) => (
//                 <option key={index} value={brand}>
//                   {brand}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <Label htmlFor="quantity">Quantity</Label>
//             <Input
//               type="number"
//               id="quantity"
//               value={transaction.quantity}
//               onChange={(e) => handleChange("quantity", e.target.value)}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="unitPrice">Unit Price</Label>
//             <Input
//               type="number"
//               id="unitPrice"
//               value={transaction.unitPrice}
//               onChange={(e) => handleChange("unitPrice", e.target.value)}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="totalBill">Total Bill</Label>
//             <Input
//               type="number"
//               id="totalBill"
//               value={transaction.totalBill}
//               onChange={(e) => handleChange("totalBill", e.target.value)}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded"
//               readOnly
//             />
//           </div>
//           <div>
//             <Label htmlFor="partyName">Party Name</Label>
//             <select
//               id="partyName"
//               value={transaction.partyName}
//               onChange={handlePartyNameChange}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded"
//               required
//             >
//               <option value="">Select Party</option>
//               {uniquePartyNames.map((partyName, index) => (
//                 <option key={index} value={partyName}>
//                   {partyName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <Label htmlFor="partyArea">Party Area</Label>
//             <select
//               id="partyArea"
//               value={transaction.partyArea}
//               onChange={(e) => handleChange("partyArea", e.target.value)}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded"
//               required
//             >
//               <option value="">Select Area</option>
//               {filteredPartyAreas.map((partyArea, index) => (
//                 <option key={index} value={partyArea}>
//                   {partyArea}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <Label htmlFor="brokerName">Broker Name</Label>
//             <select
//               id="brokerName"
//               value={transaction.brokerName}
//               onChange={(e) => handleChange("brokerName", e.target.value)}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded"
//             >
//               <option value="">Select Broker</option>
//               {brokers.map((broker, index) => (
//                 <option key={index} value={broker.name}>
//                   {broker.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* <div>
//             <Label htmlFor="date">Date</Label>
//             <Input
//               type="date"
//               id="date"
//               value={transaction.date}
//               onChange={(e) => handleChange("date", e.target.value)}
//               className="block w-full mt-1 p-2 border border-gray-300 rounded"
//               required
//             />
//           </div> */}
//         </div>
        // <Button
        //   type="button"
        //   onClick={handleSave}
        //   className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        // >
        //   {transactionId ? "Update Transaction" : "Add Transaction"}
        // </Button>
//       </form>
//     </div>
//   );
// };





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
  const [oldTransaction, setOldTransaction] = useState<Transaction | null>(null);

  const [addTransaction] = useAddTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();
  const [updateInventory] = useUpdateInventoryMutation();
  const [updateParty] = useUpdatePartyMutation();
  const { data: inventoriesData } = useGetInventoriesQuery();
  const { data: partiesData } = useGetPartiesQuery();
  const { data: brokersData } = useGetBrokersQuery();

  useEffect(() => {
    if (transactions && transactions.transaction) {
      setTransaction(transactions.transaction);
      setOldTransaction(transactions.transaction);
    }
  }, [transactions]);

  useEffect(() => {
    if (inventoriesData && inventoriesData.inventory) {
      setInventories(inventoriesData.inventory);
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
  }, [inventoriesData, partiesData, brokersData]);

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

  const handleSubmit = async () => {
    const inventoryItem = inventories.find(
      (item) =>
        item.name === transaction.productName &&
        item.count === transaction.productCount &&
        item.brand === transaction.brandName
    );
  
    const partyItem = parties.find(
      (party) =>
        party.partyName === transaction.partyName &&
        party.partyArea === transaction.partyArea
    );
  
    if (!inventoryItem) {
      console.error("Inventory item not found. Cannot update stock.");
      return;
    }
  
    if (!partyItem) {
      console.error("Party item not found. Cannot update balance and status.");
      return;
    }
  
    try {
      if (transactionId === "add") {
        // Handle adding a new transaction
        if (transaction.transactionType === "sale" && inventoryItem.stock === 0) {
          toast.error("Out of stock");
          return;
        } else if (transaction.transactionType === "sale" && transaction.quantity > inventoryItem.stock) {
          toast.error(`You have only ${inventoryItem.stock} units available for sale`);
          return;
        }
  
        await addTransaction(transaction).unwrap();
        const newStock = transaction.transactionType === "purchase"
          ? inventoryItem.stock + transaction.quantity
          : inventoryItem.stock - transaction.quantity;
        await updateStock(inventoryItem, newStock);
  
        const newBalance =
          transaction.transactionType === "credit"
            ? partyItem.balance + transaction.totalBill
            : partyItem.balance - transaction.totalBill;
  
        const newStatus = newBalance < 0 ? "Debit" : "Paid";
        await updateBalanceAndStatus(partyItem, newBalance, newStatus);
  
        toast.success("Transaction added successfully");
      } else {
        // Handle updating an existing transaction
        if (oldTransaction) {
          const oldInventoryItem = inventories.find(
            (item) =>
              item.name === oldTransaction.productName &&
              item.count === oldTransaction.productCount &&
              item.brand === oldTransaction.brandName
          );
  
          const oldPartyItem = parties.find(
            (party) =>
              party.partyName === oldTransaction.partyName &&
              party.partyArea === oldTransaction.partyArea
          );
  
          if (!oldInventoryItem) {
            console.error("Old inventory item not found. Cannot update stock.");
            return;
          }
  
          if (!oldPartyItem) {
            console.error("Old party item not found. Cannot update balance and status.");
            return;
          }
  
          // Reverse the stock and balance adjustments from the old transaction
          const reversedStock = oldTransaction.transactionType === "purchase"
            ? oldInventoryItem.stock - oldTransaction.quantity
            : oldInventoryItem.stock + oldTransaction.quantity;
          await updateStock(oldInventoryItem, reversedStock);
  
          const reversedBalance =
            oldTransaction.transactionType === "credit"
              ? oldPartyItem.balance - oldTransaction.totalBill
              : oldPartyItem.balance + oldTransaction.totalBill;
  
          const reversedStatus = reversedBalance < 0 ? "Debit" : "Paid";
          await updateBalanceAndStatus(oldPartyItem, reversedBalance, reversedStatus);
        }
  
        // Check for out-of-stock conditions for the new transaction
        if (transaction.transactionType === "sale" && inventoryItem.stock === 0) {
          toast.error("Out of stock");
          return;
        } else if (transaction.transactionType === "sale" && transaction.quantity > inventoryItem.stock) {
          toast.error(`You have only ${inventoryItem.stock} units available for sale`);
          return;
        }
  
        // Update the transaction and adjust the inventory and balance again
        await updateTransaction({
          transactionId: transaction._id,
          body: transaction,
        }).unwrap();
  
        const newStock = transaction.transactionType === "purchase"
          ? inventoryItem.stock + transaction.quantity
          : inventoryItem.stock - transaction.quantity;
        await updateStock(inventoryItem, newStock);
  
        const newBalance =
          transaction.transactionType === "credit"
            ? partyItem.balance + transaction.totalBill
            : partyItem.balance - transaction.totalBill;
  
        const newStatus = newBalance < 0 ? "Debit" : "Paid";
        await updateBalanceAndStatus(partyItem, newBalance, newStatus);
  
        toast.success("Transaction updated successfully");
      }
  
      router.push("/transactions");
    } catch (error) {
      console.error("Error occurred during transaction save or update", error);
      toast.error("Failed to save or update the transaction. Please try again.");
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <form>
        {/* Transaction Type */}
        <div className="mb-4">
          <Label htmlFor="transactionType">Transaction Type</Label>
          <select
            id="transactionType"
            value={transaction.transactionType}
            onChange={handleTransactionTypeChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Transaction Type</option>
            <option value="purchase">Purchase</option>
            <option value="sale">Sale</option>
          </select>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <Label htmlFor="productName">Product Name</Label>
          <select
            id="productName"
            value={transaction.productName}
            onChange={handleProductNameChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Product Name</option>
            {filteredProducts.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>

        {/* Product Count */}
        <div className="mb-4">
          <Label htmlFor="productCount">Product Count</Label>
          <select
            id="productCount"
            value={transaction.productCount}
            onChange={(e) => handleChange("productCount", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Product Count</option>
            {filteredCounts.map((count, index) => (
              <option key={index} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>

        {/* Brand Name */}
        <div className="mb-4">
          <Label htmlFor="brandName">Brand Name</Label>
          <select
            id="brandName"
            value={transaction.brandName}
            onChange={(e) => handleChange("brandName", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Brand Name</option>
            {filteredBrands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={transaction.quantity}
            onChange={(e) => handleChange("quantity", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Unit Price */}
        <div className="mb-4">
          <Label htmlFor="unitPrice">Unit Price</Label>
          <Input
            id="unitPrice"
            type="number"
            value={transaction.unitPrice}
            onChange={(e) => handleChange("unitPrice", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Total Bill */}
        <div className="mb-4">
          <Label htmlFor="totalBill">Total Bill</Label>
          <Input
            id="totalBill"
            type="number"
            value={transaction.totalBill}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Party Name */}
        <div className="mb-4">
          <Label htmlFor="partyName">Party Name</Label>
          <select
            id="partyName"
            value={transaction.partyName}
            onChange={handlePartyNameChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Party Name</option>
            {uniquePartyNames.map((partyName, index) => (
              <option key={index} value={partyName}>
                {partyName}
              </option>
            ))}
          </select>
        </div>

        {/* Party Area */}
        <div className="mb-4">
          <Label htmlFor="partyArea">Party Area</Label>
          <select
            id="partyArea"
            value={transaction.partyArea}
            onChange={(e) => handleChange("partyArea", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Party Area</option>
            {filteredPartyAreas.map((partyArea, index) => (
              <option key={index} value={partyArea}>
                {partyArea}
              </option>
            ))}
          </select>
        </div>

        {/* Broker Name */}
        <div className="mb-4">
          <Label htmlFor="brokerName">Broker Name</Label>
          <select
            id="brokerName"
            value={transaction.brokerName}
            onChange={(e) => handleChange("brokerName", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Broker Name</option>
            {brokers.map((broker, index) => (
              <option key={index} value={broker.name}>
                {broker.name}
              </option>
            ))}
          </select>
        </div>

        {/* Broker Commission Percentage */}
        <div className="mb-4">
          <Label htmlFor="brokerCommissionPercentage">
            Broker Commission Percentage
          </Label>
          <Input
            id="brokerCommissionPercentage"
            type="number"
            value={transaction.brokerCommissionPercentage}
            onChange={(e) =>
              handleChange("brokerCommissionPercentage", e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Debit */}
        <div className="mb-4">
          <Label htmlFor="debit">Debit</Label>
          <Input
            id="debit"
            type="number"
            value={transaction.debit}
            onChange={(e) => handleChange("debit", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Credit */}
        <div className="mb-4">
          <Label htmlFor="credit">Credit</Label>
          <Input
            id="credit"
            type="number"
            value={transaction.credit}
            onChange={(e) => handleChange("credit", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit */}
        <Button
          type="button"
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          {transactionId ? "Update Transaction" : "Add Transaction"}
        </Button>
      </form>
    </div>
  );
};





