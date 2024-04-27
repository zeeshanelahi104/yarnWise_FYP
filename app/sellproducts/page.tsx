import SellProduct from "@/components/components/SellProduct/SellProduct";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import SecondaryNavbar from "@/components/common/SecondaryNavbar/SecondaryNavbar"
export default function Page(){
    return(
        <>
        <SecondaryNavbar />
        <div className="flex py-[45px]">
            <Sidebar />
            <SellProduct />
        </div>
        </>
    )
}