"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SellProduct(){
    return(
        <div className="sell-product-form container flex flex-col justify-center items-center">
            <h1 className="title text-primary-clr">Sell Product</h1>
      <div className="add-product-form mt-[50px] flex flex-col justify-center items-center gap-8">
        <Input
          type="text"
          placeholder="Product Name"
          className="rounded-[10px] border-primary-clr border-2 w-full md:w-[400px]"
        />

        <Input
          type="text"
          placeholder="Product Count"
          className="rounded-[10px] border-primary-clr border-2 w-full md:w-[400px]"
        />

        <Input
          type="text"
          placeholder="Product Quantity"
          className="rounded-[10px] border-primary-clr border-2 w-full md:w-[400px]"
        />

        <Input
          type="text"
          placeholder="Product Rate"
          className="rounded-[10px] border-primary-clr border-2 w-full md:w-[400px]"
        />
        <Input
          type="text"
          placeholder="Total Bill"
          className="rounded-[10px] border-primary-clr border-2 w-full md:w-[400px]"
        />
        <Input
          type="text"
          placeholder="Broker Name"
          className="rounded-[10px] border-primary-clr border-2 w-full md:w-[400px]"
        />
        <div className="add-product-btn ">
            <Button className="primaryBtn w-[150px]">Generate Bill</Button>
        </div>
      </div>
        </div>
    )
}