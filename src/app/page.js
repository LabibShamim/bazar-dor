import Image from "next/image";
import Marquee from "@/components/Marquee";
import Baner from "@/components/HomePage/Baner";
import Increase from "@/components/HomePage/IncreaseProducts";
import Decrease from "@/components/HomePage/DecreaseProducts";
import Products from "@/components/HomePage/Products";
import Footer from "@/components/HomePage/Footer";

export default function Home() {
  return (
    <div>
      <Marquee />
      <Baner />
      <Increase />
      <Decrease />
      <Products />
      <Footer />
    </div>
  );
}
