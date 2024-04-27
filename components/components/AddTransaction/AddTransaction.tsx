import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddTransaction() {
  return (
    <>
      <div className="add-transaction-page-wrapper pt-[45px] container gap-10 flex flex-col justify-center">
        <div className="page-heading">
          <h1 className="title text-center text-primary-clr">
            Add Transaction
          </h1>
        </div>
        <div className="add-transaction-form-wrapper flex flex-col gap-4">
          <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
                <Label>Enter Product Name</Label>
              <Input
                type="text"
                placeholder="Full Name"
                className="rounded-[10px] w-full  border-2 border-primary-clr"
              />
            </div>
            <div>
            <Label>Enter Product Count</Label>
              <Input
                type="text"
                placeholder="Full Name"
                className="rounded-[10px] w-full] border-2 border-primary-clr"
              />
            </div>
          </div>
          <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
            <Label>Enter Brand Name</Label>
              <Input
                type="text"
                placeholder="Full Name"
                className="rounded-[10px] w-full  border-2 border-primary-clr"
              />
            </div>
            <div>
            <Label>Enter Unit Price</Label>
              <Input
                type="text"
                placeholder="Full Name"
                className="rounded-[10px] w-full border-2 border-primary-clr"
              />
            </div>
          </div>
          <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
            <Label>Enter Quantity</Label>
              <Input
                type="text"
                placeholder="Full Name"
                className="rounded-[10px] w-full  border-2 border-primary-clr"
                
              />
            </div>
            <div>
            <Label>Total Bill</Label>
              <Input
                type="text"
                placeholder="Full Name"
                className="rounded-[10px] w-full  border-2 border-primary-clr"
                value={""}
                disabled
              />
            </div>
          </div>
          <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
            <Label>Enter Party Name</Label>
              <Input
                type="text"
                placeholder="Full Name"
                className="rounded-[10px] w-full  border-2 border-primary-clr"
              />
            </div>
            <div>
            <Label>Enter Party Area</Label>
              <Input
                type="text"
                placeholder="Full Name"
                className="rounded-[10px] w-full border-2 border-primary-clr"
              />
            </div>
            <div>
            <Label>Enter Party Contact Number</Label>
              <Input
                type="text"
                placeholder="Full Name"
                className="rounded-[10px] w-full border-2 border-primary-clr"
              />
            </div>
            <div>
            <Label>Enter Broker Name</Label>
              <Input
                type="text"
                placeholder="Full Name"
                className="rounded-[10px] w-full border-2 border-primary-clr"
              />
            </div>
            <div>
            <Label>Enter Broker Comission Percentage</Label>
              <Input
                type="text"
                placeholder="Full Name"
                className="rounded-[10px] w-full border-2 border-primary-clr"
              />
            </div>
          </div>
          <div className="form-wrapper grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
            <Label>Select Payment Type</Label>
              <select className="rounded-[10px] h-10 w-full  border-2 border-primary-clr">
                <option>Select Payment Type</option>
                <option>Debit</option>
                <option>Credit</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
            <Label>Select Transaction Type</Label>
              <select className="rounded-[10px] h-10 w-full  border-2 border-primary-clr">
                <option>Select Transaction Type</option>
                <option>Sale</option>
                <option>Purchase</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
