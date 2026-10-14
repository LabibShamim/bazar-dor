"use client";
import Link from "next/link";
import { useState } from "react";

export default function ProductList({ products }) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.today - b.today;
    if (sort === "high") return b.today - a.today;
    return a.id - b.id;
  });

  return (
    <>
      <section className="mt-5 flex items-center justify-end rounded-2xl border border-[#dfe7df] bg-[#fafcf9] p-4">
        <label htmlFor="sort" className="mr-2 text-sm text-gray-500">
          সাজান
        </label>

        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-[#d1d9d1] bg-transparent px-3 py-2 text-sm outline-none"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">কম থেকে বেশি</option>
          <option value="high">বেশি থেকে কম</option>
        </select>
      </section>

      <p className="my-4 text-sm text-[#707970]">
        মোট {sortedProducts.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
      </p>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="block rounded-2xl border border-[#dfe7df] bg-[#fafcf9] p-4 transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-2xl">
                {product.image || product.categoryIcon}
              </div>

              <div>
                <h2 className="font-bold">{product.nameBn}</h2>
                <p className="text-xs text-[#707970]">
                  প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-xs text-[#707970]">আজকের দাম</p>
                <p className="text-lg font-bold">
                  {product.today.toLocaleString("bn-BD")} টাকা
                </p>
              </div>

              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                  product.change?.dir === "up"
                    ? "bg-red-50 text-red-600"
                    : product.change?.dir === "down"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-600"
                }`}
              >
                {product.change?.dir === "up"
                  ? "▲"
                  : product.change?.dir === "down"
                    ? "▼"
                    : "—"}{" "}
                {Math.abs(product.change?.pct || 0).toLocaleString("bn-BD")}%
              </span>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
