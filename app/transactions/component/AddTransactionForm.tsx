


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

// // Define InventoryItem interface
// interface InventoryItem {
//   _id?: string; // Assuming there is an id field to identify each inventory item
//   name: string;
//   count: string;
//   brand: string;
//   stock: number;
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
//   const [filteredProducts, setFilteredProducts] = useState<string[]>([]);
//   const [filteredCounts, setFilteredCounts] = useState<string[]>([]);
//   const [filteredBrands, setFilteredBrands] = useState<string[]>([]);

//   const { data: transactions } = useGetTransactionQuery(id);
//   const [addTransaction] = useAddTransactionMutation();
//   const [updateTransaction] = useUpdateTransactionMutation();
//   const [updateInventory] = useUpdateInventoryMutation();
//   const { data: inventoriesData } = useGetInventoriesQuery();

//   useEffect(() => {
//     if (transactions && transactions.transaction) {
//       setTransaction(transactions.transaction);
//     }
//     if (inventoriesData && inventoriesData.inventory) {
//       setInventories(inventoriesData.inventory);
//     }
//   }, [transactions, inventoriesData, filteredProducts, filteredCounts, filteredBrands]);

//   // Calculate totalBill whenever quantity or unitPrice changes
//   useEffect(() => {
//     const newTotalBill = transaction.quantity * transaction.unitPrice;
//     setTransaction((prevTransaction) => ({
//       ...prevTransaction,
//       totalBill: newTotalBill,
//     }));
//   }, [transaction.quantity, transaction.unitPrice]);

//   useEffect(() => {
//     const uniqueProductNames = Array.from(
//       new Set(inventories.map((item) => item.name))
//     );
//     setFilteredProducts(uniqueProductNames);
//   }, [inventories]);

//   const handleChange = (field: string, value: any) => {
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

//   const updateStock = async (
//     inventoryItem: InventoryItem,
//     newStock: number
//   ) => {
//     if (!inventoryItem._id) {
//       console.error("Inventory item ID is undefined. Cannot update stock.");
//       return;
//     }

//     console.log("Updating stock:", inventoryItem._id, newStock);
//     const updatedInventory = { ...inventoryItem, stock: newStock };
//     await updateInventory({
//       inventoryId: inventoryItem._id,
//       body: updatedInventory,
//     }).unwrap();
//   };

//   const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault(); // Prevent the default form submission behavior
//     let dataToSend = { ...transaction };

//     if (dataToSend._id) {
//       delete dataToSend._id;
//     }

//     if (transactionId) {
//       updateTransaction({ transactionId, body: dataToSend })
//         .unwrap()
//         .then(async () => {
//           console.log("🚀 Transaction updated");
//           const inventoryItem = inventories.find(
//             (item) =>
//               item.name === transaction.productName &&
//               item.count === transaction.productCount &&
//               item.brand === transaction.brandName
//           );
//           console.log("🚀 Inventory Item", inventoryItem);
//           if (inventoryItem) {
//             const newStock =
//               transaction.transactionType === "Purchase"
//                 ? inventoryItem.stock + transaction.quantity
//                 : inventoryItem.stock - transaction.quantity;
//             await updateStock(inventoryItem, newStock);
//           }
//           setTransaction({
//             productName: "",
//             productCount: "",
//             brandName: "",
//             unitPrice: 0,
//             quantity: 0,
//             totalBill: 0,
//             partyName: "",
//             partyArea: "",
//             brokerName: "",
//             brokerCommissionPercentage: 0,
//             transactionType: "",
//             debit: 0,
//             credit: 0,
//             balance: 0,
//             status: "",
//           });
//           toast.success("Transaction updated successfully");
//           router.push("/transactions");
//         })
//         .catch((error) => {
//           console.error("Error updating transaction:", error);
//           toast.error("Failed to update transaction");
//         });
//     } else {
//       addTransaction(transaction)
//         .unwrap()
//         .then(async () => {
//           toast.success("Transaction added successfully");
//           const inventoryItem = inventories.find(
//             (item) =>
//               item.name === transaction.productName &&
//               item.count === transaction.productCount &&
//               item.brand === transaction.brandName
//           );
//           if (inventoryItem) {
//             const newStock =
//               transaction.transactionType === "Purchase"
//                 ? inventoryItem.stock + transaction.quantity
//                 : inventoryItem.stock - transaction.quantity;
//             await updateStock(inventoryItem, newStock);
//           }
//           setTransaction({
//             productName: "",
//             productCount: "",
//             brandName: "",
//             unitPrice: 0,
//             quantity: 0,
//             totalBill: 0,
//             partyName: "",
//             partyArea: "",
//             brokerName: "",
//             brokerCommissionPercentage: 0,
//             transactionType: "",
//             debit: 0,
//             credit: 0,
//             balance: 0,
//             status: "",
//           });
//           router.push("/transactions");
//         })
//         .catch((error) => {
//           console.error("Error adding transaction:", error);
//           toast.error("Failed to add transaction");
//         });
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid px-4 py-5">
//         <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div>
//             <Label>Transaction Type</Label>
//             <select
//               className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
//               value={transaction?.transactionType}
//               onChange={handleTransactionTypeChange}
//             >
//               <option>Select Transaction Type</option>
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
//               <option>Select Product Name</option>
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
//               <option>Select Product Count</option>
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
//               <option>Select Brand Name</option>
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
//               onChange={(e) => handleChange("unitPrice", e.target.value)}
//             />
//           </div>
//           <div>
//             <Label>Enter Quantity</Label>
//             <Input
//               type="number"
//               placeholder="Quantity"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.quantity}
//               onChange={(e) => handleChange("quantity", e.target.value)}
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
//               onChange={(e) => handleChange("totalBill", e.target.value)}
//               disabled
//             />
//           </div>
//           <div>
//             <Label>Enter Party Name</Label>
//             <Input
//               type="text"
//               placeholder="Party Name"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.partyName}
//               onChange={(e) => handleChange("partyName", e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div>
//             <Label>Enter Party Area</Label>
//             <Input
//               type="text"
//               placeholder="Party Area"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.partyArea}
//               onChange={(e) => handleChange("partyArea", e.target.value)}
//             />
//           </div>

//           <div>
//             <Label>Enter Broker Name</Label>
//             <Input
//               type="text"
//               placeholder="Broker Name"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.brokerName}
//               onChange={(e) => handleChange("brokerName", e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Enter Debit</Label>
//             <Input
//               type="number"
//               placeholder="Debit"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.debit}
//               onChange={(e) => handleChange("debit", e.target.value)}
//             />
//           </div>
//           <div className="flex flex-col gap-2">
//             <Label>Enter Credit</Label>
//             <Input
//               type="number"
//               placeholder="Enter Credit"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.credit}
//               onChange={(e) => handleChange("credit", e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div>
//             <Label>Enter Broker Commission Percentage</Label>
//             <Input
//               type="number"
//               placeholder="Broker Commission Percentage"
//               className="rounded-[10px] w-full border-2 border-primary-clr"
//               value={transaction?.brokerCommissionPercentage}
//               onChange={(e) =>
//                 handleChange("brokerCommissionPercentage", e.target.value)
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

// Define InventoryItem interface
interface InventoryItem {
  _id?: string; // Assuming there is an id field to identify each inventory item
  name: string;
  count: string;
  brand: string;
  stock: number;
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
  const [filteredProducts, setFilteredProducts] = useState<string[]>([]);
  const [filteredCounts, setFilteredCounts] = useState<string[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<string[]>([]);

  const { data: transactions } = useGetTransactionQuery(id);
  const [addTransaction] = useAddTransactionMutation();
  const [updateTransaction] = useUpdateTransactionMutation();
  const [updateInventory] = useUpdateInventoryMutation();
  const { data: inventoriesData } = useGetInventoriesQuery();

  useEffect(() => {
    if (transactions && transactions.transaction) {
      setTransaction(transactions.transaction);
    }
    if (inventoriesData && inventoriesData.inventory) {
      setInventories(inventoriesData.inventory);
    }
  }, [transactions, inventoriesData, filteredProducts, filteredCounts, filteredBrands]);

  // Calculate totalBill whenever quantity or unitPrice changes
  useEffect(() => {
    const newTotalBill = transaction.quantity * transaction.unitPrice;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      totalBill: newTotalBill,
    }));
  }, [transaction.quantity, transaction.unitPrice]);

  useEffect(() => {
    const uniqueProductNames = Array.from(
      new Set(inventories.map((item) => item.name))
    );
    setFilteredProducts(uniqueProductNames);
  }, [inventories]);

  const handleChange = (field: string, value: any) => {
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

  const updateStock = async (
    inventoryItem: InventoryItem,
    newStock: number
  ) => {
    if (!inventoryItem._id) {
      console.error("Inventory item ID is undefined. Cannot update stock.");
      return;
    }

    console.log("Updating stock:", inventoryItem._id, newStock);
    const updatedInventory = { ...inventoryItem, stock: newStock };
    await updateInventory({
      inventoryId: inventoryItem._id,
      body: updatedInventory,
    }).unwrap();
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const inventoryItem = inventories.find(
      (item) =>
        item.name === transaction.productName &&
        item.count === transaction.productCount &&
        item.brand === transaction.brandName
    );

    if (transaction.transactionType === "Sale" && inventoryItem) {
      if (inventoryItem.stock === 0) {
        toast.error("Out of stock");
        return;
      } else if (transaction.quantity > inventoryItem.stock) {
        toast.error(`You have just ${inventoryItem.stock} number of bags to sell`);
        return;
      }
    }

    let dataToSend = { ...transaction };

    if (dataToSend._id) {
      delete dataToSend._id;
    }

    if (transactionId) {
      updateTransaction({ transactionId, body: dataToSend })
        .unwrap()
        .then(async () => {
          console.log("🚀 Transaction updated");
          if (inventoryItem) {
            const newStock =
              transaction.transactionType === "Purchase"
                ? inventoryItem.stock + transaction.quantity
                : inventoryItem.stock - transaction.quantity;
            await updateStock(inventoryItem, newStock);
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
          });
          toast.success("Transaction updated successfully");
          router.push("/transactions");
        })
        .catch((error) => {
          console.error("Error updating transaction:", error);
          toast.error("Failed to update transaction");
        });
    } else {
      addTransaction(transaction)
        .unwrap()
        .then(async () => {
          toast.success("Transaction added successfully");
          if (inventoryItem) {
            const newStock =
              transaction.transactionType === "Purchase"
                ? inventoryItem.stock + Number(transaction.quantity)
                : inventoryItem.stock - Number(transaction.quantity);
            await updateStock(inventoryItem, newStock);
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
          });
          router.push("/transactions");
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
        <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label>Transaction Type</Label>
            <select
              className="rounded-[10px] h-10 w-full border-2 border-primary-clr"
              value={transaction?.transactionType}
              onChange={handleTransactionTypeChange}
            >
              <option>Select Transaction Type</option>
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
            >
              <option>Select Product Name</option>
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
            >
              <option>Select Product Count</option>
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
            >
              <option>Select Brand Name</option>
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
              onChange={(e) => handleChange("unitPrice", e.target.value)}
            />
          </div>
          <div>
            <Label>Enter Quantity</Label>
            <Input
              type="number"
              placeholder="Quantity"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
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
              onChange={(e) => handleChange("totalBill", e.target.value)}
              disabled
            />
          </div>
          <div>
            <Label>Enter Party Name</Label>
            <Input
              type="text"
              placeholder="Party Name"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.partyName}
              onChange={(e) => handleChange("partyName", e.target.value)}
            />
          </div>
        </div>
        <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label>Enter Party Area</Label>
            <Input
              type="text"
              placeholder="Party Area"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.partyArea}
              onChange={(e) => handleChange("partyArea", e.target.value)}
            />
          </div>

          <div>
            <Label>Enter Broker Name</Label>
            <Input
              type="text"
              placeholder="Broker Name"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.brokerName}
              onChange={(e) => handleChange("brokerName", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Enter Debit</Label>
            <Input
              type="number"
              placeholder="Debit"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.debit}
              onChange={(e) => handleChange("debit", e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Enter Credit</Label>
            <Input
              type="number"
              placeholder="Enter Credit"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.credit}
              onChange={(e) => handleChange("credit", e.target.value)}
            />
          </div>
        </div>
        <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <Label>Enter Broker Commission Percentage</Label>
            <Input
              type="number"
              placeholder="Broker Commission Percentage"
              className="rounded-[10px] w-full border-2 border-primary-clr"
              value={transaction?.brokerCommissionPercentage}
              onChange={(e) =>
                handleChange("brokerCommissionPercentage", e.target.value)
              }
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

