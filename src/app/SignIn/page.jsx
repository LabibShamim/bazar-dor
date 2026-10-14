"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { error } = await authClient.signIn.email({
        email: formData.get("email"),
        password: formData.get("password"),
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে!");
      router.push("/");
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি");
      }
    } catch {
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                ইমেইল
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="আপনার ইমেইল"
                autoComplete="email"
                required
                className="h-9 w-full rounded-lg border border-[#dce6dc] bg-transparent px-3 text-sm outline-none focus:border-[#078b43]"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                পাসওয়ার্ড
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                autoComplete="current-password"
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
              onClick={() => handleSocialSignIn("google")}
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
              onClick={() => handleSocialSignIn("github")}
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#dce6dc] text-xs font-semibold hover:bg-[#f0f5f0] sm:text-sm"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="h-4 w-4 text-black"
              />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-4 text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/SignUp"
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