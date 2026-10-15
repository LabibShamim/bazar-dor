"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "../../lib/auth-client";
export default function UpdateProfile() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session]);
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("আগে সাইন ইন করুন");
      router.replace("/SignIn");
    }
  }, [isPending, session, router]);
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await authClient.updateUser({ name: name.trim() });
      if (error) toast.error(error.message || "নাম আপডেট করা যায়নি");
      else {
        toast.success("নাম আপডেট হয়েছে");
        router.push("/Profile");
        router.refresh();
      }
    } catch {
      toast.error("আবার চেষ্টা করুন");
    } finally {
      setSaving(false);
    }
  }
  if (isPending || !session)
    return <main className="min-h-[50vh] p-8">লোড হচ্ছে...</main>;
  return (
    <main className="min-h-[55vh] px-4 py-10">
      <section className="mx-auto max-w-lg rounded-2xl border border-[#dfe7df] bg-[#fafcf9] p-6">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label htmlFor="name" className="block text-sm font-medium">
            নাম
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={2}
            required
            className="w-full rounded-lg border border-[#dfe7df] px-3 py-3 outline-none focus:border-[#078b43]"
          />
          <button
            disabled={saving}
            className="w-full rounded-lg bg-[#078b43] px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {saving ? "আপডেট হচ্ছে..." : "Update Information"}
          </button>
        </form>
      </section>
    </main>
  );
}
