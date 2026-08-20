import { motion } from "framer-motion";

// Components
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Reveal from "../components/motion/Reveal";

// redux query
import { useGetProductsQuery } from "../slices/productApiSlice";
import { staggerContainer } from "../lib/motion";

const ShopScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <div className="container mx-auto my-16 px-4">
          <Reveal className="text-center">
            <h2 className="font-display text-3xl font-semibold capitalize text-ink-800 md:text-4xl">
              Shop
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink-500">
              The full collection — curated pieces for every occasion.
            </p>
          </Reveal>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ShopScreen;
