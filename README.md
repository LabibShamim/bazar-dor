# বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম, দামের পরিবর্তন এবং বিভিন্ন বাজারের দাম সহজে দেখার জন্য তৈরি একটি responsive Next.js অ্যাপ।

## প্রযুক্তি
- Next.js App Router
- React ও JavaScript
- Tailwind CSS / DaisyUI utility classes
- Better Auth (ইমেইল-পাসওয়ার্ড এবং Google/GitHub OAuth)
- MongoDB
- React Hot Toast
- Programming Hero BazarDor API

## প্রধান ফিচার
1. মোবাইল, ট্যাবলেট ও ডেস্কটপে ব্যবহারযোগ্য responsive layout
2. আজ দাম বেড়েছে এবং কমেছে—শীর্ষ পণ্যের তালিকা
3. চলমান price ticker এবং সব পণ্যের কার্ড
4. ক্যাটাগরি অনুযায়ী পণ্য দেখা ও দাম কম/বেশি অনুযায়ী sort
5. সাইন আপ, সাইন ইন, Google/GitHub login ও toast feedback
6. লগইন-সুরক্ষিত product details এবং বাজারভিত্তিক দাম
7. Profile থেকে আলাদা Update Information পেজে নাম পরিবর্তন
8. Loading skeleton এবং friendly 404 page

## শুরু করার নিয়ম

1. Node.js-এর উপযুক্ত LTS সংস্করণ ইনস্টল করুন।
2. `.env.example` কপি করে `.env.local` নাম দিন এবং নিজের credentials বসান।
3. প্যাকেজ ইনস্টল করুন:

```bash
npm install
```

4. Development server চালান:

```bash
npm run dev
```

তারপর `http://localhost:3000` খুলুন। Production build যাচাই করতে `npm run build` চালান।

## Environment variables
- `BETTER_AUTH_SECRET`: দীর্ঘ random secret
- `BETTER_AUTH_URL`: অ্যাপের base URL
- `NEXT_PUBLIC_BETTER_AUTH_URL`: browser auth client-এর base URL
- `MONGODB_URI`: MongoDB connection string
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`: Google OAuth credentials
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`: GitHub OAuth credentials

Google/GitHub login ব্যবহার করতে সংশ্লিষ্ট provider-এর OAuth app তৈরি করে credentials এবং callback URL Better Auth configuration-এর সঙ্গে মিলিয়ে দিন। বাস্তব `.env.local` বা secret GitHub-এ commit করবেন না।

## Deploy (Vercel)
GitHub repository Vercel-এ import করুন, উপরের environment variables Vercel Project Settings-এ যোগ করুন, তারপর deploy করুন। Production domain অনুযায়ী `BETTER_AUTH_URL` ও OAuth callback URLs আপডেট করুন।

## Data source
পণ্যের তথ্য Programming Hero BazarDor API থেকে আসে। দাম সম্ভাব্য এবং বাজারের অবস্থার সঙ্গে পরিবর্তিত হতে পারে।
