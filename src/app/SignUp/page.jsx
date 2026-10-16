"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { authClient } from "../lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { name, email, password, confirmPassword } =
      Object.fromEntries(formData.entries());

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড একই নয়");
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        const message = error.message?.toLowerCase() || "";

        if (
          message.includes("already") ||
          message.includes("exist") ||
          message.includes("duplicate")
        ) {
          toast.error("এই ইমেইল দিয়ে অ্যাকাউন্ট আগে থেকেই আছে!");
        } else {
          toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        }
        return;
      }

      if (data) {
        toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে!");
        router.push("/");
      }
    } catch (err) {
      console.error("Signup error:", err);
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
    } catch (err) {
      console.error("Social sign-in error:", err);
      toast.error("সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f5f0] px-4 py-10 text-[#202820]">
      <h1 className="mb-2 text-center text-2xl font-bold">
        অ্যাকাউন্ট তৈরি করুন
      </h1>

      <h2 className="mb-5 text-center text-sm">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </h2>

      <div className="mx-auto max-w-[370px] rounded-2xl border border-[#dfe7df] bg-[#fafcf9] p-5 sm:p-[21px]">
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              নাম
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="আপনার নাম"
              autoComplete="name"
              required
              className="w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 py-2 text-sm outline-none focus:border-green-600"
            />
          </div>

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
              className="w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 py-2 text-sm outline-none focus:border-green-600"
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
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 py-2 text-sm outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-sm font-medium"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="আবার লিখুন"
              autoComplete="new-password"
              minLength={8}
              required
              className="w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 py-2 text-sm outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#07883d] py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#067333]"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#d9e0d9]" />
          <span className="text-xs text-[#737c73]">অথবা</span>
          <div className="h-px flex-1 bg-[#d9e0d9]" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleSocialSignIn("google")}
            className="flex items-center justify-center gap-2 rounded-lg border border-[#dfe7df] px-2 py-2 text-xs font-semibold hover:bg-[#f0f5f0]"
          >
            <FontAwesomeIcon
              icon={faGoogle}
              className="h-4 w-4 text-[#4285f4]"
            />
            Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn("github")}
            className="flex items-center justify-center gap-2 rounded-lg border border-[#dfe7df] px-2 py-2 text-xs font-semibold hover:bg-[#f0f5f0]"
          >
            <FontAwesomeIcon icon={faGithub} className="h-4 w-4 text-black"/>
            GitHub
          </button>
        </div>

        <p className="mt-4 text-center text-xs">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/SignIn"
            className="font-medium text-[#07883d] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-5 block text-center text-xs text-[#737c73] transition hover:text-green-700"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignUp;