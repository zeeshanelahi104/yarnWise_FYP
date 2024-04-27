"use client";
import { Button } from "@/components/ui/button";

export function LoginBtn() {
  return (
    <>
      <Button type="submit" className="bg-primary-clr primaryBtn w-[150px]">
        Login with Email
      </Button>
      {/* <Button className="bg-red-600 primaryBtn ml-4 w-[150px]">
        Login with Google
      </Button> */}
    </>
  );
}
