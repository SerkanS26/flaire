// redux query
import { useGetProductDetailsQuery } from "../slices/productApiSlice";

// react-router-dom
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Components
import Rating from "../components/Rating";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  return (
    <>
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <div className="container mx-auto my-16 font-poppins">
          <Link to="/" className="btn ml-4">
            Go Back
          </Link>

          <div className="flex flex-col justify-center my-16 p-4">
            <div className="flex flex-col fit gap-4 p-4 shadow-md md:flex-row md:max-h-">
              {/* col 1 */}
              <div className="md:w-5/12 px-12">
                <div className="w-full h-96">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full object-cover h-full rounded-xl shadow-md hover:scale-105 transition-transform"
                  />
                </div>
              </div>
              {/* col 2 */}
              <div className=" gap-8 p-4 flex flex-col justify-center md:w-4/12 ">
                <h2 className="text-gray-700 text-lg font-semibold border-b-2 py-1 border-primary">
                  {product.name}
                </h2>
                <div className="border-b-2 py-1 border-primary">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </div>
                <span className="text-gray-700 font-semibold border-b-2 py-1 border-primary">
                  Price: {product.price}€
                </span>
                <div>
                  <p className="text-gray-600 p-2">{product.description}</p>
                </div>
              </div>
              {/* col 3 */}
              <div className=" p-4 md:w-3/12">
                <div className="flex flex-col gap-4">
                  <div className=" flex justify-around w-full border border-primary p-2 rounded-md">
                    <span className="text-gray-700 font-semibold">Price:</span>
                    <span className="text-gray-700 font-semibold">
                      {product.price}€
                    </span>
                  </div>
                  <div className="flex justify-around border border-primary p-2 rounded-md">
                    <span className="text-gray-700 font-semibold">Status:</span>
                    <span className="text-gray-700 font-semibold">
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  {/* QTY */}
                  {/* <div className="flex gap-4">
                <span className="text-gray-700 font-semibold">Qty:</span>
                <select
                  className="w-16 p-2"
                  value={product.qty}
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div> */}
                  <div>
                    <button
                      className={`bg-primary text-white font-medium p-2 rounded-md w-full disabled:opacity-50 hover:${
                        product.countInStock > 0 ? "bg-primary-dark" : ""
                      } transition-all`}
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
