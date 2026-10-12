"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const SignIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="min-h-screen bg-[#f0f5f0] px-4 py-8 text-[#202820]">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">সাইন ইন</h1>
          <p className="mt-2 text-sm text-[#737b73]">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#dce6dc] bg-[#ffffffb3] p-5 sm:p-6">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium"
              >
                ইমেইল
              </label>
              <input
                id="email"
                type="email"
                placeholder="আপনার ইমেইল"
                required
                className="h-9 w-full rounded-lg border border-[#dce6dc] bg-transparent px-3 text-sm outline-none focus:border-[#078b43]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
                minLength={8}
                className="h-9 w-full rounded-lg border border-[#dce6dc] bg-transparent px-3 text-sm outline-none focus:border-[#078b43]"
              />
            </div>

            <button
              type="submit"
              className="h-9 w-full rounded-lg bg-[#078b43] text-sm font-medium text-white shadow-md transition hover:bg-[#067537]"
            >
              সাইন ইন
            </button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dce6dc]" />
            <span className="text-xs text-[#737b73]">অথবা</span>
            <div className="h-px flex-1 bg-[#dce6dc]" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#dce6dc] text-xs font-semibold hover:bg-[#f0f5f0] sm:text-sm"
            >
              <FontAwesomeIcon
                icon={faGoogle}
                className="h-4 w-4 text-[#4285f4]"
              />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#dce6dc] text-xs font-semibold hover:bg-[#f0f5f0] sm:text-sm"
            >
              <FontAwesomeIcon icon={faGithub} className="h-4 w-4 text-black" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-4 text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#078b43] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-[#737b73] hover:text-[#078b43]"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
