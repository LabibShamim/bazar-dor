import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[55vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl">🛒</p>

      <h1 className="mt-4 text-3xl font-bold">
        পৃষ্ঠা খুঁজে পাওয়া যায়নি
      </h1>

      <p className="mt-2 text-gray-500">
        আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি নেই অথবা সরানো হয়েছে।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-[#078b43] px-5 py-3 font-semibold text-white"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}