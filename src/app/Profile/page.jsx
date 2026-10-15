
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../lib/auth-client";

export default function Profile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/SignIn");
    }
  }, [isPending, session, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি");
      } else {
        toast.success("নাম সফলভাবে আপডেট হয়েছে");
        router.refresh();
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সাইন আউট সফল হয়েছে");
      router.replace("/SignIn");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি");
    }
  };

  if (isPending || !session) {
    return (
      <main className="min-h-screen bg-[#f0f5f0] p-8">
        <div className="mx-auto max-w-5xl animate-pulse">
          <div className="mb-5 h-8 w-48 rounded bg-gray-200" />
          <div className="h-28 rounded-2xl bg-gray-200" />
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-5 py-8 text-[#263329]">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-xl font-bold">আমার প্রোফাইল</h1>

        <p className="mt-1 text-xs text-[#7b857c]">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        <section className="mt-6 flex flex-col justify-between gap-5 rounded-2xl border border-[#dfe7df] bg-[#fafcf9] p-5 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <div className="relative h-16 w-[72px] shrink-0 overflow-hidden rounded-2xl bg-[#edf1ed]">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-2xl font-bold text-[#078b43]">
                  {(user.name || user.email || "U")
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate font-semibold">
                {user.name}
              </h2>
              <p className="truncate text-sm text-[#737d74]">
                {user.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="shrink-0 rounded-lg border border-red-400 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            ↶ সাইন আউট
          </button>
        </section>

        <section className="mt-5 rounded-2xl border border-[#dfe7df] bg-[#fafcf9] p-5 sm:p-6">
          <h2 className="font-semibold">তথ্য</h2>

          <form
            onSubmit={handleUpdate}
            className="mt-8 space-y-3 px-1 sm:px-4"
          >
            <label
              htmlFor="profile-name"
              className="block text-sm font-medium"
            >
              নাম
            </label>

            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={2}
              required
              className="h-10 w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 outline-none focus:border-[#078b43]"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-lg bg-[#078b43] px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#067537] disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
