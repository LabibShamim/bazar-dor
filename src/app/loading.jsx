export default function Loading() {
  return (
    <main
      className="mx-auto w-full max-w-7xl px-4 py-10"
      aria-label="লোড হচ্ছে"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div
          key={item}
          className="mb-3 h-24 animate-pulse rounded-2xl bg-[#e5ece5]"
        />
      ))}
    </main>
  );
}