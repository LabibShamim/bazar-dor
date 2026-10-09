import React from "react";
import Image from "next/image";
import Navlinks from "./Navlinks";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <nav>
      <div className="w-full max-w-7xl mx-auto py-4 flex items-center justify-between ">
      <div className="flex items-center gap-2">
        <div className="bg-green-600 rounded-[10px] p-3">
          <Image src="/logo-icon.png" alt="Logo" width={25} height={25} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#263329]">বাজার দর</h2>
          <div>{date}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="btn min-h-9 h-9 rounded-[8px] border-none bg-[#f5f5f599] px-5 py-5 text-sm text-black shadow-md hover:bg-[#dedede]">সাইন ইন</button>
        <button className="btn min-h-9 h-9 rounded-[8px] border-none bg-[#078b43] px-5 text-sm text-white shadow-md hover:bg-[#067537]">সাইন আপ</button>
      </div>
    </div>
        <Navlinks/>
    </nav>


  );
};

export default Navbar;
