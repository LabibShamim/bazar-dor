"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../app/lib/auth-client";
import toast from "react-hot-toast";
export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("বিস্তারিত দাম দেখতে আগে সাইন ইন করুন");
      router.replace("/SignIn");
    }
  }, [isPending, session, router]);
  if (isPending || !session)
    return (
      <main className="mx-auto min-h-[50vh] max-w-5xl px-4 py-10">
        <div className="h-28 animate-pulse rounded-2xl bg-[#e5ece5]" />
        <p className="mt-3 text-sm text-gray-500">লোড হচ্ছে...</p>
      </main>
    );
  return children;
}
