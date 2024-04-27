import logo from "../../../../public/images/logo.png"
import Image from "next/image";
import Link from "next/link";

const navbarItems = [
  {
    id: 1,
    title: "Login",
    href: "/login",
  },
  {
    id: 2,
    title: "Register User",
    href: "/register",
  },
  {
    id: 3,
    title: "Dashboard",
    href: "/dashboard",
  },
];

export default function Navbar() {
  return (
    <>
      <div className="navbar-wrapper bg-primary-clr container">
        <div className="navbar-inner-wrapper flex justify-between">
          <div className="navbar-logo-wrapper pt-3 flex w-[120px]">
            <Link href={"/"}>
              <Image src={logo} alt="logo" className="pointer-events-none" />
            </Link>
          </div>
          <div className="navbar-items-wrapper flex justify-center items-center">
            <ul className="flex gap-7">
              {navbarItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>{" "}
      </div>
    </>
  );
}
