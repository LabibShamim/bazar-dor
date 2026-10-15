import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "../components/HomePage/Navbar";
import Footer from "../components/HomePage/Footer";
import Marquee from "../components/HomePage/Marquee";
import { Toaster } from "react-hot-toast";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata = {
  title: "বাজার দর | BazarDor",
  description: "চাল, ডাল, তেল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর এক নজরে দেখুন।",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <Marquee />
        {children}
        <Footer />
        <Toaster position="top-right"/>
        </body>
    </html>
  );
}
