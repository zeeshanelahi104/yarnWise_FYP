"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Inventory } from "@/types";
import { useGetInventoryQuery, useUpdateInventoryMutation, useAddInventoryMutation } from "@/features/inventorySlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
    const params = useParams();
    const router = useRouter();
    const {id} = params;
    const inventoryId = Array.isArray(id) ? id[0] : id;
    const [product, setProduct] = useState<Inventory>({
        brand: "",
        count: "",
        name: "",
        stock: 0
    })

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetInventoryQuery(id);
    console.log("Id at Inventory", data);
    const [addInventory] = useAddInventoryMutation();
    const [updateInventory] = useUpdateInventoryMutation();

    useEffect(() => {
        if (data && data.inventory) {
          console.log("Product Data in useEffect", data.inventory)
            setProduct(data.inventory);
        }
    }, [data]);

    const handleChange = (field: string, value: any) => {
        setProduct((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
      
        let dataToSend = { ...product };

        if (
          !product.name ||
          !product.brand ||
          !product.count
        ) {
          alert("All Fields are required");
          return;
        }
        if (product.count.length > 5) {
          alert("Product Count Can't be greater than 5");
          return;
        }
        const regex = /[^a-zA-Z\s]/; // Regular expression to check for numbers
        if (
          regex.test(product.name) ||
          regex.test(product.brand)        ) {
          alert("Names cannot contain numbers or characters. Please enter only alphabets.");
          return;
        }

        if (dataToSend._id) {
            delete dataToSend._id;
        }

            if (id) {
                updateInventory({ inventoryId, body: dataToSend }).unwrap().then(() => {
                    toast.success('Inventory updated successfully')
                    setProduct({ name: '', count: '', brand: '', stock: 0 });
                    router.push("/inventory")
                })
                .catch(() => {})
            } else {
                addInventory(product).unwrap().then(() => {
                    toast.success('Inventory added successfully')
                    setProduct({ name: '', count: '', brand: '', stock: 0 });
                    router.push("/inventory")}).catch(()=>{})
            }
    };

  return (
    <div className="add-product-form container flex flex-col mx-auto pt-[45px]">
      <h1 className="title text-primary-clr text-center">{id ? "Edit": "Add"} Product</h1>

        <div className="w-full add-product-form mt-[50px] ">
          <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-8">
            <label>
              Enter Product Name
              <Input
                type="text"
                placeholder="Product Name"
                className="rounded-[10px] mt-1 border-primary-clr border-2 w-full"
                value={product?.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </label>
            <label>
              Enter Product Brand
              <Input
                type="text"
                placeholder="Product Brand"
                className="rounded-[10px] mt-1 border-primary-clr border-2 w-full"
                value={product?.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
              />
            </label>
            <label>
              Enter Product Count
              <Input
                type="text"
                placeholder="Product Count"
                className="rounded-[10px] mt-1 border-primary-clr border-2 w-full"
                value={product?.count}
                onChange={(e) => handleChange('count', e.target.value)}
              />
            </label>
          </div>
        </div>

      <div className="add-product-btn pb-5 mx-auto mt-10">
        <Button className="primaryBtn w-[150px] hover:bg-black  hover:text-white text-white" onClick={handleSave}>{id ? "Edit": "Add"} Product</Button>
      </div>
    </div>
  );
}


// "use client";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { Inventory } from "@/types";
// import { useGetInventoryQuery, useUpdateInventoryMutation, useAddInventoryMutation } from "@/features/inventorySlice";

// export default function AddProductForm() {
//   const params = useParams();
//   const router = useRouter();
//   const { id } = params;
//   console.log("Id at Inventory", id);
//   const inventoryId = Array.isArray(id) ? id[0] : id;
//   const [product, setProduct] = useState<Inventory>({
//     brand: "",
//     count: "",
//     name: "",
//     stock: 0,
//   });

//   const { data, isLoading, isSuccess, isError, error } = useGetInventoryQuery(inventoryId);
//   console.log("Inventory to edit", data)
//   const [addInventory] = useAddInventoryMutation();
//   const [updateInventory] = useUpdateInventoryMutation();

//   useEffect(() => {
//     if (isSuccess && data && data.inventory) {
//       setProduct(data.inventory);
//     }
//   }, [data, isSuccess]);

//   const handleChange = (field: string, value: any) => {
//     setProduct((prevData) => ({ ...prevData, [field]: value }));
//   };

//   const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     let dataToSend = { ...product };

//     if (!product.name || !product.brand || !product.count) {
//       alert("All Fields are required");
//       return;
//     }
//     if (product.count.length > 5) {
//       alert("Product Count Can't be greater than 5");
//       return;
//     }
//     const regex = /[^a-zA-Z\s]/; // Regular expression to check for numbers
//     if (regex.test(product.name) || regex.test(product.brand)) {
//       alert("Names cannot contain numbers or characters. Please enter only alphabets.");
//       return;
//     }

//     if (dataToSend._id) {
//       delete dataToSend._id;
//     }

//     if (id) {
//       updateInventory({ inventoryId, body: dataToSend }).unwrap().then(() => {
//         toast.success("Inventory updated successfully");
//         setProduct({ name: "", count: "", brand: "", stock: 0 });
//         router.push("/inventory");
//       }).catch(() => {});
//     } else {
//       addInventory(product).unwrap().then(() => {
//         toast.success("Inventory added successfully");
//         setProduct({ name: "", count: "", brand: "", stock: 0 });
//         router.push("/inventory");
//       }).catch(() => {});
//     }
//   };

//   return (
//     <div className="add-product-form container flex flex-col mx-auto pt-[45px]">
//       <h1 className="title text-primary-clr text-center">{id ? "Edit" : "Add"} Product</h1>
//       <div className="w-full add-product-form mt-[50px]">
//         <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-8">
//           <label>
//             Enter Product Name
//             <Input
//               type="text"
//               placeholder="Product Name"
//               className="rounded-[10px] mt-1 border-primary-clr border-2 w-full"
//               value={product?.name}
//               onChange={(e) => handleChange("name", e.target.value)}
//             />
//           </label>
//           <label>
//             Enter Product Brand
//             <Input
//               type="text"
//               placeholder="Product Brand"
//               className="rounded-[10px] mt-1 border-primary-clr border-2 w-full"
//               value={product?.brand}
//               onChange={(e) => handleChange("brand", e.target.value)}
//             />
//           </label>
//           <label>
//             Enter Product Count
//             <Input
//               type="text"
//               placeholder="Product Count"
//               className="rounded-[10px] mt-1 border-primary-clr border-2 w-full"
//               value={product?.count}
//               onChange={(e) => handleChange("count", e.target.value)}
//             />
//           </label>
//         </div>
//       </div>
//       <div className="add-product-btn pb-5 mx-auto mt-10">
//         <Button className="primaryBtn w-[150px] hover:bg-black hover:text-white text-white" onClick={handleSave}>
//           {id ? "Edit" : "Add"} Product
//         </Button>
//       </div>
//     </div>
//   );
// }
