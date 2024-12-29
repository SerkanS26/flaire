import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="my-3 py-3 px-6 rounded-md shadow-lg mx-4">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-md hover:scale-105 transition transform duration-500 shadow-md"
        />
      </Link>
      <div>
        <Link to={`/product/${product._id}`}>
          <h2 className="text-lg font-semibold text-gray-700 my-3 product-title">
            {product.name}
          </h2>
        </Link>
        <div>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>

        <div>
          <h3 className="text-gray-600 mt-2 text-lg font-medium">
            {product.price}€
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Product;
