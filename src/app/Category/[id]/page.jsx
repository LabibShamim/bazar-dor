import React from "react";
import ProductList from "./ProductList";

const Page = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${id}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const products = Array.isArray(data) ? data : [];
  const category = products[0];

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-5 text-[#202820]">
      <div className="mx-auto max-w-7xl">
        <section className="flex items-center gap-3 rounded-2xl border border-[#dfe7df] bg-[#fafcf9] p-5">
          <div className="text-4xl">
            {category?.categoryIcon }
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              {category?.categoryNameBn || id}
            </h1>
            <p className="text-sm text-[#707970]">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        <ProductList products={products} />
      </div>
    </main>
  );
};

export default Page;