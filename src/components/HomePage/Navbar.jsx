import React from "react";
import Image from "next/image";
import Navlinks from "./Navlinks";
import Link from "next/link";
import UserInfo from "./UserInfo";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <nav >
      <div className="w-full max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3 ">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 rounded-[10px] p-3">
              <Image src="/logo-icon.png" alt="Logo" width={25} height={25} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#263329]">বাজার দর</h2>
              <div>{date}</div>
            </div>
          </div>
        </Link>

        <UserInfo />
      </div>
      <Navlinks />
    </nav>
  );
};

export default Navbar;
