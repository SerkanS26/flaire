import { useEffect, useState } from "react";
import axios from "axios";

// Components
import Banner from "../components/Banner";
import HomeProductCard from "../components/HomeProductCard";
import Product from "../components/Product";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  console.log(products);

  return (
    <>
      <Banner />
      <div className="container mx-auto text-center my-16">
        <h4 className="capitalize text-4xl font-semibold text-gray-700">
          Discover Your Next Favorite Bag
        </h4>
        <p className="w-96 font-poppins text-center mx-auto mt-3 text-gray-600 md:w-[500px]">
          Explore our curated selection of stylish and functional women&apos;s
          bags. From elegant totes to chic clutches, find the perfect accessory
          to elevate your look.
        </p>
      </div>
      <HomeProductCard
        bg="bg-[#F1F1F1]"
        img="/images/lacoste-blue.png"
        name="Lacoste Blue Leather Tote Bag"
        description="Elevate your style with this elegant blue leather tote bag from
          Lacoste. Crafted from premium leather, this bag exudes sophistication
          and durability. The smooth texture and minimalist design make it both
          versatile and timeless. With two long handles for easy carrying, it’s
          perfect for daily use or special outings. The zippered top closure
          keeps your belongings secure. Featuring the iconic Lacoste crocodile
          logo prominently in the center, this tote bag effortlessly combines
          fashion with function. Whether you're heading to work or a casual
          evening out, this bag is a statement piece that enhances any outfit."
      />
      <HomeProductCard
        bg="bg-slate-50"
        order="order-last"
        img="/images/boss-black.png"
        name="BOSS Leather Tote Bag"
        description="Make a bold statement with the sleek and elegant BOSS Leather Tote Bag. Crafted from premium leather, this black tote embodies sophistication and modern style. Its minimalistic design features the embossed BOSS branding on the front, adding a touch of luxury to any ensemble.The sturdy handles ensure comfort and durability, making it perfect for both professional and casual settings. Whether you're headed to the office, a meeting, or a day out, this bag is designed to complement your look with an air of confidence and refinement.Upgrade your accessory game with the BOSS Leather Tote Bag—a true symbol of elegance and function."
      />
      <div className="container mx-auto my-16 bg-[#F1F1F1] p-4">
        <h1 className="text-center font-poppins my-6 text-[#555573] font-semibold text-4xl capitalize">
          Latest Product
        </h1>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
      ;
    </>
  );
};

export default HomeScreen;
