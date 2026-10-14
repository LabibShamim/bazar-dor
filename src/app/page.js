import Baner from "../components/HomePage/Baner";
import Increase from "../components/HomePage/IncreaseProducts";
import Decrease from "../components/HomePage/DecreaseProducts";
import Products from "../components/HomePage/Products";

export default function Home() {
  return (
    <div>
      <Baner />
      <Increase />
      <Decrease />
      <Products />
    </div>
  );
}