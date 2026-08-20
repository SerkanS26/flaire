// react
import { useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
// react router
import { Link, useNavigate } from "react-router-dom";
// framer-motion
import { motion } from "framer-motion";
// components
import CheckoutSteps from "@/components/CheckoutSteps";
import Message from "@/components/Message";
import Spinner from "@/components/Spinner";
import Reveal from "@/components/motion/Reveal";
// toast
import { toast } from "react-toastify";
// slices
import { clearCartItems } from "../slices/cartSlice";
// api call
import { useCreateOrderMutation } from "../slices/ordersApiSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="mb-10 text-center font-display text-3xl font-semibold text-ink-800 md:text-4xl">
        Place Order
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-70/30">
        {/* Column 1 */}
        <Reveal className="rounded-2xl bg-white p-4 shadow-soft">
          {/* Group Item */}
          <div className="border-b border-ink-100 p-4">
            <h2 className="mb-2 text-xl font-semibold text-ink-700">Shipping</h2>
            <p className="text-ink-500">
              <strong className="text-ink-700">Address:</strong> {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
              {cart.shippingAddress.country}
            </p>
          </div>
          {/* Group Item */}
          <div className="border-b border-ink-100 p-4">
            <h2 className="mb-2 text-xl font-semibold text-ink-700">Payment Method</h2>
            <p className="text-ink-500">
              <strong className="text-ink-700">Method:</strong> {cart.paymentMethod}
            </p>
          </div>
          {/* Group Item */}
          <div className="p-4">
            <h2 className="mb-2 text-xl font-semibold text-ink-700">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <div>
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="mb-2 border-b border-ink-100 p-2">
                    <div className="grid grid-cols-3 items-center text-center">
                      <div>
                        <img
                          className="mx-auto h-20 w-20 rounded-xl object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div>
                        <Link
                          to={`/product/${item._id || item.product}`}
                          className="text-ink-600 hover:text-gold-600"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="text-ink-600">
                        {item.qty} x {item.price} € = {item.qty * item.price} €
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {/* Column 2 */}
        <Reveal delay={0.1} className="h-min rounded-2xl bg-white p-6 shadow-soft text-ink-600">
          <div className="mb-4 border-b border-ink-100 pb-3">
            <h2 className="text-xl font-semibold text-ink-700">Order Summary</h2>
          </div>
          <div className="mb-2 flex justify-between border-b border-ink-100 pb-2">
            <div>Items:</div>
            <div>{cart.itemsPrice} €</div>
          </div>
          <div className="mb-2 flex justify-between border-b border-ink-100 pb-2">
            <div>Shipping:</div>
            <div>{cart.shippingPrice} €</div>
          </div>
          <div className="mb-2 flex justify-between border-b border-ink-100 pb-2">
            <div>Tax:</div>
            <div>{cart.taxPrice} €</div>
          </div>
          <div className="mb-4 flex justify-between text-lg font-semibold text-ink-800">
            <div>Total:</div>
            <div>{cart.totalPrice} €</div>
          </div>
          {error && <Message variant="danger">{error}</Message>}
          <div>
            <motion.button
              whileHover={{ scale: cart.cartItems.length ? 1.02 : 1 }}
              whileTap={{ scale: cart.cartItems.length ? 0.98 : 1 }}
              type="button"
              className="btn w-full"
              disabled={cart.cartItems.length === 0}
              onClick={placeOrderHandler}
            >
              Place Order
            </motion.button>
            {isLoading && <Spinner loading={isLoading} />}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
