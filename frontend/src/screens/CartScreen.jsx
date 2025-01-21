// react-router
import { Link, useNavigate } from "react-router-dom";

// icons
import { FaTrash } from "react-icons/fa";

// components
import Message from "../components/Message";

// redux
import { useDispatch, useSelector } from "react-redux";

// slices
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <section className="container mx-auto mt-10 p-6 ">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-70/30">
        {/* column 1 */}
        <div>
          <h1 className=" text-center text-3xl md:text-4xl font-semibold mb-6 text-gray-600">
            Shopping Cart
          </h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty{" "}
              <Link
                to="/"
                className="underline ml-2
              "
              >
                Go Back
              </Link>
            </Message>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-1 md:grid-cols-5 justify-center items-center gap-4 mb-4 text-center shadow-md p-4 rounded-3xl"
                >
                  <div className="mx-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-3xl h-40 w-40 "
                    />
                  </div>
                  <div className="underline text-gray-600">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </div>
                  <div className="text-gray-600">{item.price} €</div>
                  <div className="flex justify-around w-full p-2 rounded-md">
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      className="w-24 px-2 border text-primary-dark bg-slate-100 border-primary rounded-md focus:outline-primary-dark  "
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
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
                  <div className="mx-auto ">
                    <button
                      className="text-red-600 bg-red-50 p-2 rounded-md hover:text-red-700 hover:scale-110 hover:duration-300 "
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* column 2 */}
        <div className="shadow-md p-4 rounded-3xl h-min ">
          <div>
            <h3 className=" text-center text-xl md:text-3xl font-semibold mb-6 text-gray-500 border-b-2">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              items
            </h3>
            <div className=" text-center text-gray-600">
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}{" "}
              €
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={checkoutHandler}
              className="btn w-full"
              disabled={cartItems.length === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartScreen;
