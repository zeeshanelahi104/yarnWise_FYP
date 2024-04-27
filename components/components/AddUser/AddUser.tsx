import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RegisterBtn from "../../common/RegisterBtn";

export default function AddUser() {
  return (
    <div className="adduser-wrapper container px-[200px]">
      <div className="title-wrapper">
        <h1 className="title flex justify-center">Add User</h1>
        <div className="border border-primary-clr"></div>
      </div>{" "}
      <div className="adduser-fields-wrapper pt-[20px] flex flex-col items-center justify-center gap-8">
        <Input
          type="text"
          placeholder="Full Name"
          className="rounded-[10px] w-full md:w-[400px] border-2 border-primary-clr"
        />
        <Input
          type="email"
          placeholder="Email"
          className="rounded-[10px] w-full md:w-[400px] border-2 border-primary-clr"
        />

        <Input
          type="text"
          placeholder="Password"
          className="rounded-[10px] w-full md:w-[400px] border-2 border-primary-clr"
        />
        <Input
          type="text"
          placeholder="Confirm Password"
          className="rounded-[10px] w-full md:w-[400px] border-2 border-primary-clr"
        />

        <Input
          type="text"
          placeholder="CNIC"
          className="rounded-[10px] w-full md:w-[400px] border-2 border-primary-clr"
        />
        
      </div>
      <div className="flex justify-center mt-[40px]">
      <Label className="mx-4 ">Gender</Label>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Female</Label>
          </div>
        </RadioGroup>
    </div>
    <div className="flex justify-center mt-[20px]">
      <Label className="mx-8 ">Role</Label>
        <RadioGroup defaultValue="option-one">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">Manager</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Employee</Label>
          </div>
        </RadioGroup>
    </div>
    <RegisterBtn />
    </div>
  );
}
