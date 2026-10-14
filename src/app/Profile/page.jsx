"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";

export default function Profile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
    setMessage("");

    try {
      const { error } = await authClient.updateUser({ name: name.trim() });

      if (error) {
        setMessage(error.message || "নাম আপডেট করা যায়নি");
      } else {
        setMessage("নাম সফলভাবে আপডেট হয়েছে");
      }
    } catch {
      setMessage("কিছু একটা সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/SignIn");
    router.refresh();
  };

  if (isPending || !session) {
    return (
      <main className="min-h-screen bg-[#f0f5f0] px-5 py-8 text-[#263329]">
        লোড হচ্ছে...
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
          <div className="flex min-w-0 items-center gap-3">
            <div className="relative h-[60px] w-[68px] shrink-0 overflow-hidden rounded-2xl bg-[#edf1ed]">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  fill
                  sizes="68px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-[#078b43]">
                  {(user.name || user.email || "U").charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h2 className="truncate font-semibold">{user.name}</h2>
              <p className="truncate text-sm text-[#737d74]">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="shrink-0 rounded-lg border border-red-400 px-4 py-2 text-sm text-red-500 transition hover:bg-red-50"
          >
            ↶ সাইন আউট
          </button>
        </section>

        <section className="mt-5 rounded-2xl border border-[#dfe7df] bg-[#fafcf9] p-5 sm:p-6">
          <h2 className="text-sm font-semibold">তথ্য</h2>

          <form onSubmit={handleUpdate} className="mt-8 space-y-3">
            <label htmlFor="name" className="block text-sm">
              নাম
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              className="w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 py-2.5 text-sm outline-none focus:border-[#078b43]"
            />

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full rounded-lg bg-[#078b43] py-2.5 text-sm font-medium text-white shadow-md transition hover:bg-[#067638] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>

            {message && (
              <p className="pt-1 text-sm" role="status">
                {message}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
