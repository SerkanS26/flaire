// redux query
import { useGetProductDetailsQuery } from "../slices/productApiSlice";

//slices
import { addToCart } from "../slices/cartSlice";

import { useState } from "react";

// react-router-dom
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";

// framer-motion
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

// Components
import Rating from "../components/Rating";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Reveal from "../components/motion/Reveal";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <div className="container mx-auto my-10 px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition-colors hover:text-gold-600"
          >
            <FaArrowLeft className="text-xs" /> Back to shopping
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* image */}
            <Reveal className="lg:col-span-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-3xl shadow-card"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[420px] w-full object-cover md:h-[520px]"
                />
              </motion.div>
            </Reveal>

            {/* info + purchase */}
            <div className="lg:col-span-6 grid grid-cols-1 gap-6 sm:grid-cols-5">
              <Reveal delay={0.05} className="sm:col-span-3">
                <h1 className="font-display text-2xl font-semibold text-ink-800 md:text-3xl">
                  {product.name}
                </h1>
                <div className="mt-3">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
                <p className="mt-4 text-2xl font-semibold text-gold-600">
                  {product.price}€
                </p>
                <p className="mt-5 leading-relaxed text-ink-500">
                  {product.description}
                </p>
              </Reveal>

              <Reveal delay={0.12} className="sm:col-span-2">
                <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft sm:sticky sm:top-24">
                  <div className="flex items-center justify-between border-b border-ink-100 pb-3">
                    <span className="text-sm font-medium text-ink-500">Price</span>
                    <span className="font-semibold text-ink-800">{product.price}€</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-ink-100 py-3">
                    <span className="text-sm font-medium text-ink-500">Status</span>
                    <span
                      className={`text-sm font-semibold ${
                        product.countInStock > 0 ? "text-emerald-600" : "text-red-500"
                      }`}
                    >
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  {product.countInStock > 0 && (
                    <div className="flex items-center justify-between border-b border-ink-100 py-3">
                      <span className="text-sm font-medium text-ink-500">Qty</span>
                      <select
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="rounded-lg border border-ink-100 bg-ink-50 px-2 py-1 font-semibold text-ink-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: product.countInStock > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: product.countInStock > 0 ? 0.98 : 1 }}
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                    className="btn mt-4 w-full disabled:hover:translate-y-0"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
