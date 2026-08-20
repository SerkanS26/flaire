import { motion } from "framer-motion";

// Components
import Banner from "../components/Banner";
import HomeProductCard from "../components/HomeProductCard";
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Reveal from "../components/motion/Reveal";

// redux query
import { useGetRandomProductsQuery } from "../slices/productApiSlice";
import { Link } from "react-router-dom";
import { staggerContainer } from "../lib/motion";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetRandomProductsQuery();

  return (
    <>
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <>
          <Meta />
          <Banner />

          <Reveal className="container mx-auto my-20 max-w-2xl px-4 text-center">
            <h4 className="font-display text-3xl font-semibold capitalize text-ink-800 md:text-4xl">
              Discover Your Next Favorite Bag
            </h4>
            <p className="mx-auto mt-4 text-ink-500">
              Explore our curated selection of stylish and functional
              women&apos;s bags. From elegant totes to chic clutches, find the
              perfect accessory to elevate your look.
            </p>
          </Reveal>

          <HomeProductCard
            bg="bg-[#F8F6F1]"
            img="/images/lacoste-blue.png"
            name="Lacoste Blue Leather Tote Bag"
            url="/product/677b9df04c9b00e18689af69"
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
            bg="bg-white"
            order="order-last"
            img="/images/boss-black.png"
            name="BOSS Leather Tote Bag"
            url="/product/677b9df04c9b00e18689af6a"
            description="Make a bold statement with the sleek and elegant BOSS Leather Tote Bag. Crafted from premium leather, this black tote embodies sophistication and modern style. Its minimalistic design features the embossed BOSS branding on the front, adding a touch of luxury to any ensemble.The sturdy handles ensure comfort and durability, making it perfect for both professional and casual settings. Whether you're headed to the office, a meeting, or a day out, this bag is designed to complement your look with an air of confidence and refinement.Upgrade your accessory game with the BOSS Leather Tote Bag—a true symbol of elegance and function."
          />

          <div className="mt-16 bg-[#F8F6F1] py-16">
            <div className="container mx-auto px-4">
              <Reveal className="text-center">
                <h1 className="font-display text-3xl font-semibold capitalize text-ink-800 md:text-4xl">
                  Current Favorites
                </h1>
              </Reveal>

              <motion.div
                variants={staggerContainer(0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              >
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </motion.div>

              <div className="my-10 text-center">
                <Link to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn"
                  >
                    Shop Now
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
