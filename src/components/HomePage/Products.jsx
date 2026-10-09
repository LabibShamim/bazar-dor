import React from "react";

const Products = async () => {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products");
  const data = await res.json();

  return (
    <section className="mx-auto max-w-7xl py-10 ">
      <h2 className=" text-xl font-bold text-[#263329]">
        সব পণ্য
      </h2>
      <h2 className="py-2 text-mauve-500">মোট ৩৩টি পণ্য দেখানো হচ্ছে</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => {
          const pct = Number(product.change?.pct ?? 0);

          return (
            <div
              key={product.id}
              className="rounded-2xl border border-[#dfe7df] bg-[#f9fcf9] p-3.5 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff4ef] text-2xl">
                  {product.image}
                </div>

                <div>
                  <h3 className="font-bold text-[#263329]">
                    {product.nameBn}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {product.unitBn || "প্রতি কেজি"}
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-gray-500">আজকের দাম</p>
                  <p className="text-lg font-bold text-[#263329]">
                    {Number(product.today).toLocaleString("bn-BD")}{" "}
                    <span className="text-sm font-normal">টাকা</span>
                  </p>
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                    pct > 0
                      ? "bg-red-50 text-red-500"
                      : pct < 0
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {pct > 0 ? "▲" : pct < 0 ? "▼" : "—"}{" "}
                  {Math.abs(pct).toLocaleString("bn-BD")}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Products;