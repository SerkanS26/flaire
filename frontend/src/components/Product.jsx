import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Rating from "./Rating";
import { fadeUp, reveal } from "@/lib/motion";

const Product = ({ product }) => {
  return (
    <motion.div
      {...reveal}
      variants={fadeUp}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group m-3 overflow-hidden rounded-2xl bg-white p-4 shadow-soft transition-shadow duration-300 hover:shadow-card-hover"
    >
      <Link to={`/product/${product._id}`} className="block overflow-hidden rounded-xl">
        <motion.img
          src={product.image}
          alt={product.name}
          className="h-80 w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </Link>
      <div className="pt-4">
        <Link to={`/product/${product._id}`}>
          <h2 className="product-title my-1 text-lg font-semibold text-ink-700 transition-colors group-hover:text-gold-600">
            {product.name}
          </h2>
        </Link>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <h3 className="mt-2 text-lg font-semibold text-ink-800">{product.price}€</h3>
      </div>
    </motion.div>
  );
};

export default Product;
