"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {signIn } from "next-auth/react";
type LoginInput = {
  email: string;
  password: string;
};

const Page = () => {
  const [inputs, setInputs] = useState<LoginInput>({ email: "", password: "" });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await signIn("credentials", {
      email: inputs.email,
      password: inputs.password,
      callbackUrl: "/",
    });
  };
  return (
    <div className="login-page-wrapper container bg-login-bg h-[100vh]">
  
      <div className="flex flex-col justify-center items-center">
      <h1 className="text-white flex justify-center items-center pt-10 text-[40px] font-bold uppercase">
        Login
      </h1>
        <div className="login-form-wrapper bg-[#D9D9D9] flex justify-center items-center rounded-[10px] w-full md:w-[450px] p-5">
          <div className="login-form-inner-wrapper w-full">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="login-fields mt-5 flex flex-col justify-center items-center gap-5 w-full">
                <Input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="rounded-[10px] w-full md:w-[400px]"
                  autoComplete="off"
                  value={inputs.email || ""}
                  onChange={handleChange}
                />
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  className="rounded-[10px] w-full md:w-[400px]"
                  autoComplete="off"
                  value={inputs.password || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="login-field-btn  flex justify-center items-center py-8">
                <Button
                  type="submit"
                  className="bg-primary-clr text-white primaryBtn w-[150px] hover:bg-black hover:text-white"
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
