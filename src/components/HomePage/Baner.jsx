import React from "react";
import Image from "next/image";

const Baner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="mx-auto mt-5 flex  max-w-7xl items-center justify-between gap-6 rounded-[22px] border border-[#dfe8e0] bg-[#f9fcf9] px-4 py-5 sm:px-8 md:px-10">
      <div className="flex-1">
        <p className="mb-3 w-fit rounded-full bg-[#e1f1e7] px-4 py-1 text-sm font-medium text-green-700">
          {date}
        </p>

        <h1 className="mb-4 text-2xl font-bold leading-tight text-[#202b23] sm:text-3xl md:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mb-6 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <button className="btn min-h-9 h-9 rounded-[8px] border-none bg-[#078b43] px-5 text-sm text-white shadow-md hover:bg-[#067537]">
          সব পণ্য দেখুন
        </button>
      </div>

      <div className="hidden shrink-0 items-center justify-center sm:flex">
        <Image
          src="/bazar-hero.png"
          alt="বাজারের পণ্য"
          width={230}
          height={190}
          priority
          className="h-auto w-[180px] object-contain md:w-[230px]"
        />
      </div>
    </section>
  );
};

export default Baner;
