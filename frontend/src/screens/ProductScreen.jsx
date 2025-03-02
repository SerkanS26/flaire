// redux query
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productApiSlice";

//slices
import { addToCart } from "../slices/cartSlice";

import { useState } from "react";

// react-router-dom
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";

// Components
import Rating from "../components/Rating";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import Meta from "../components/Meta";

// toastify
import { toast } from "react-toastify";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);

  const [comment, setComment] = useState("");

  // get product details
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  // create review
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  // get user info
  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
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
        <>
          <Meta title={product.name} />
          <div className="container mx-auto my-16 ">
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
                  <h2 className="text-gray-700 text-lg font-semibold border-b-2 py-1 border-[#daa520]">
                    {product.name}
                  </h2>
                  <div className="border-b-2 py-1 border-[#daa520]">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>
                  <span className="text-gray-700 font-semibold border-b-2 py-1 border-[#daa520]">
                    Price: {product.price}€
                  </span>
                  <div>
                    <p className="text-gray-600 p-2">{product.description}</p>
                  </div>
                </div>
                {/* col 3 */}
                <div className=" p-4 md:w-3/12">
                  <div className="flex flex-col gap-4">
                    <div className=" flex justify-around w-full border border-[#daa520] p-2 rounded-md">
                      <span className="text-gray-700 font-semibold">
                        Price:
                      </span>
                      <span className="text-gray-700 font-semibold">
                        {product.price}€
                      </span>
                    </div>
                    <div className="flex justify-around w-full border border-[#daa520] p-2 rounded-md">
                      <span className="text-gray-700 font-semibold">
                        Status:
                      </span>
                      <span className="text-gray-700 font-semibold">
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                    {/* QTY */}
                    {product.countInStock > 0 && (
                      <div className="flex justify-around  w-full border border-[#daa520] p-2 rounded-md">
                        <span className="text-gray-700 font-semibold">
                          Qty:
                        </span>
                        <select
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="w-24 px-2 border text-primary-dark bg-slate-200 border-[#daa520] rounded-md focus:outline-primary-dark  "
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option
                              key={x + 1}
                              value={x + 1}
                              className="text-primary-dark font-semibold"
                            >
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <button
                        className={`bg-[#daa520] text-white font-medium p-2 rounded-md w-full disabled:opacity-50 hover:${
                          product.countInStock > 0 ? "bg-primary-dark" : ""
                        } transition-all`}
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 container mx-auto w-1/2">
            <div>
              <h2 className="text-sm md:text-2xl font-semibold text-gray-700 mb-4">
                Reviews
              </h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <div>
                {product.reviews.map((review) => (
                  <div
                    className="bg-white p-4 my-4 rounded-md shadow-md"
                    key={review._id}
                  >
                    <strong className="text-primary-dark">{review.name}</strong>
                    <Rating value={review.rating} />
                    <span className="text-gray-400">
                      {review.createdAt.substring(0, 10)}
                    </span>
                    <p className="text-gray-600 my-4">{review.comment}</p>
                  </div>
                ))}
                <div>
                  <h2 className=" text-sm  md:text-2xl font-semibold text-gray-700 my-6">
                    Write a Customer Review
                  </h2>
                  {loadingProductReview && (
                    <spinner loading={loadingProductReview} />
                  )}
                  {userInfo ? (
                    <form className="my-2" onSubmit={submitHandler}>
                      <div>
                        <label
                          htmlFor="rating"
                          className="text-gray-700 mr-3 italic"
                        >
                          Rating
                        </label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className="p-2 border border-[#daa520] rounded-md focus:outline-primary-dark bg-slate-50 "
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>
                      <div className="my-2 flex flex-col">
                        <label
                          htmlFor="comment"
                          className="text-gray-700 my-3 italic"
                        >
                          Comment
                        </label>
                        <textarea
                          name="comment"
                          id="comment"
                          value={comment}
                          rows="5"
                          onChange={(e) => setComment(e.target.value)}
                          className="p-2 border border-[#daa520] rounded-md focus:outline-primary-dark bg-slate-50 "
                        ></textarea>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="bg-[#daa520] text-white font-medium p-2 my-3 rounded-md "
                          disabled={loadingProductReview}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  ) : (
                    <Message>
                      Please{" "}
                      <Link to="/login" className="text-primary-dark underline">
                        sign in
                      </Link>{" "}
                      to write a review
                    </Message>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;
