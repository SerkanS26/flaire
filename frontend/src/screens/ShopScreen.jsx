import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";

// Components
import Product from "../components/Product";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Reveal from "../components/motion/Reveal";
import Paginate from "../components/Paginate";
import SearchBox from "@/components/SearchBox";

// redux query
import { useGetProductsQuery } from "../slices/productApiSlice";
import { staggerContainer } from "../lib/motion";

const ShopScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [keyword, pageNumber]);

  return (
    <>
      {keyword && (
        <div className="container mx-auto my-16 flex items-center justify-center gap-10 ">
          <Link
            to="/shop"
            className="text-gray-500 font-semibold flex items-center justify-center gap-2 hover:text-gray-600 hover:underline"
          >
            <FaArrowLeft />
            Go Back
          </Link>
          <h1 className="text-xl text-center text-gray-700 font-semibold my-4">
            Search results for
            <span className="text-blue-500 italic"> &quot;{keyword}&quot;</span>
          </h1>
        </div>
      )}

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

          <div className="mt-8">
            <SearchBox />
          </div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {data?.products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </motion.div>

          <div className="mt-10">
            <Paginate
              pages={data?.pages}
              page={data?.page}
              keyword={keyword ? keyword : ""}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShopScreen;
