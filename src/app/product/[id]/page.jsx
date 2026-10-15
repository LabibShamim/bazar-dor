import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProtectedRoute from "../../../components/ProtectedRoute";

const Page = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
    { cache: "no-store" },
  );

  if (!res.ok) notFound();

  const result = await res.json();
  const product = result.data || result;

  if (!product?.id) notFound();

  const markets = product.markets || [];
  const today = Number(product.today) || 0;
  const change = Number(product.change?.pct) || 0;

  const minPrice = markets.length
    ? Math.min(...markets.map((market) => Number(market.min)))
    : today;

  const maxPrice = markets.length
    ? Math.max(...markets.map((market) => Number(market.max)))
    : today;

  const averagePrice = markets.length
    ? Math.round(
        markets.reduce(
          (total, market) =>
            total + (Number(market.min) + Number(market.max)) / 2,
          0,
        ) / markets.length,
      )
    : today;

  return (
    <ProtectedRoute>
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-4 text-[#202820]">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm text-gray-500">
          <Link href="/">হোম</Link>
          {" › "}
          {product.categoryNameBn}
          {" › "}
          {product.nameBn}
        </p>

        <section className="mb-4 flex flex-col justify-between gap-4 rounded-xl border border-[#e0e8e0] bg-[#fafcf9] p-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div>
              <h1 className="text-2xl font-bold">{product.nameBn}</h1>

              <p className="text-sm text-gray-500">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                {" · "}
                {product.categoryNameBn}
              </p>

              <p className="mt-1 text-xs">
                {change > 0
                  ? "গতকালের তুলনায় আজ দাম বেড়েছে"
                  : change < 0
                    ? "গতকালের তুলনায় আজ দাম কমেছে"
                    : "দামে কোনো পরিবর্তন নেই"}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#f0f5f0] px-6 py-3 text-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-2xl font-bold">
              {today.toLocaleString("bn-BD")}
            </p>
            <p className="text-xs text-gray-500">টাকা / {product.unit}</p>

            <p
              className={`mt-1 text-xs font-semibold ${
                change > 0
                  ? "text-red-500"
                  : change < 0
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {change > 0 ? "▲" : change < 0 ? "▼" : "—"}{" "}
              {Math.abs(change).toLocaleString("bn-BD")}%
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-[#e0e8e0] bg-[#fafcf9] p-4">
          <h2 className="mb-3 font-bold">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-[#e0e8e0] p-4">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="text-xl font-bold text-green-600">
                {minPrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="text-xs text-gray-500">সব বাজারের মধ্যে</p>
            </div>

            <div className="rounded-xl border border-[#e0e8e0] p-4">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
              <p className="text-xl font-bold text-red-500">
                {maxPrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="text-xs text-gray-500">সব বাজারের মধ্যে</p>
            </div>

            <div className="rounded-xl border border-[#e0e8e0] p-4">
              <p className="text-xs text-gray-500">গড় বাজারদর</p>
              <p className="text-xl font-bold text-green-600">
                {averagePrice.toLocaleString("bn-BD")} টাকা
              </p>
              <p className="text-xs text-gray-500">বাজারগুলোর গড়</p>
            </div>
          </div>

          <h2 className="mb-3 mt-5 font-bold">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto rounded-xl border border-[#e0e8e0]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8faf8] text-gray-500">
                <tr>
                  <th className="p-3">বাজার</th>
                  <th className="p-3">বিভাগ</th>
                  <th className="p-3">সর্বনিম্ন</th>
                  <th className="p-3">সর্বাধিক</th>
                </tr>
              </thead>

              <tbody>
                {markets.length ? (
                  markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className="border-t border-[#e0e8e0] even:bg-[#f0f5f0]"
                    >
                      <td className="p-3">{market.market}</td>
                      <td className="p-3">{market.division}</td>
                      <td className="p-3">
                        {Number(market.min).toLocaleString("bn-BD")} টাকা
                      </td>
                      <td className="p-3 font-semibold">
                        {Number(market.max).toLocaleString("bn-BD")} টাকা
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-5 text-center text-gray-500">
                      বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
    </ProtectedRoute>
  );
};

export default Page;
