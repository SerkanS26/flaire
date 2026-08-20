// react-router
import { Link, useNavigate } from "react-router-dom";

// icons
import { FaTrash } from "react-icons/fa";

// framer-motion
import { AnimatePresence, motion } from "framer-motion";

// components
import Message from "../components/Message";
import Reveal from "../components/motion/Reveal";

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

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <section className="container mx-auto mt-10 px-4 pb-16">
      <Reveal>
        <h1 className="mb-8 text-center font-display text-3xl font-semibold text-ink-800 md:text-4xl">
          Shopping Cart
        </h1>
      </Reveal>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-70/30">
        {/* column 1 */}
        <div>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty
              <Link to="/" className="ml-1 font-semibold underline">
                Go Back
              </Link>
            </Message>
          ) : (
            <AnimatePresence initial={false}>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-4 grid grid-cols-1 items-center gap-4 rounded-2xl bg-white p-4 text-center shadow-soft md:grid-cols-5"
                >
                  <div className="mx-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-32 w-32 rounded-xl object-cover md:h-40 md:w-40"
                    />
                  </div>
                  <div className="font-medium text-ink-700 hover:text-gold-600">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </div>
                  <div className="font-semibold text-ink-800">{item.price} €</div>
                  <div className="flex w-full justify-center">
                    <select
                      value={item.qty}
                      onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                      className="rounded-lg border border-ink-100 bg-ink-50 px-2 py-1.5 font-semibold text-ink-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mx-auto">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="rounded-full bg-red-50 p-3 text-red-600 transition-colors hover:bg-red-100"
                      onClick={() => removeFromCartHandler(item._id)}
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* column 2 */}
        <Reveal delay={0.1} className="h-min rounded-2xl bg-white p-6 shadow-soft">
          <div>
            <h3 className="mb-4 border-b border-ink-100 pb-4 text-center text-xl font-semibold text-ink-700 md:text-2xl">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
            </h3>
            <div className="text-center text-2xl font-semibold text-gold-600">
              {subtotal.toFixed(2)} €
            </div>
          </div>
          <div className="mt-6 text-center">
            <motion.button
              whileHover={{ scale: cartItems.length ? 1.03 : 1 }}
              whileTap={{ scale: cartItems.length ? 0.97 : 1 }}
              type="button"
              onClick={checkoutHandler}
              className="btn w-full disabled:hover:translate-y-0"
              disabled={cartItems.length === 0}
            >
              Checkout
            </motion.button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CartScreen;
