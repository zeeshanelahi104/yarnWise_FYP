"use client"
import { Button } from "@/components/ui/button"
export default function RegisterBtn(){
    return(
        <div>
             <div className="register-field-btn  flex justify-center items-center py-8">
              <Button type="submit" className=" bg-primary-clr hover:bg-black text-white w-[150px]">
                Register Now
              </Button>
            </div>
        </div>
    )
}