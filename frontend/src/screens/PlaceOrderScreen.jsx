// react
import { useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
// react router
import { Link, useNavigate } from "react-router-dom";
// components
import CheckoutSteps from "@/components/CheckoutSteps";
import Message from "@/components/Message";
import Spinner from "@/components/Spinner";
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
    <div className="container mx-auto mt-36">
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="text-3xl text-center md:text-4xl font-semibold text-gray-600 mb-10">
        Place Order
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-70/30 gap-4 mt-16">
        {/* Column 1 */}
        <div>
          {/* Group */}
          <div className="shadow-lg rounded-lg p-4">
            {/* Group Item */}
            <div className="p-4 border-b-2 border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                Shipping
              </h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            {/* Group Item */}
            <div className="p-4 border-b-2 border-gray-200 ">
              <h2 className="text-2xl  font-semibold text-gray-600 mb-2">
                Payment Method
              </h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
            {/* Group Item */}
            <div className="p-4">
              <h2 className="text-2xl  font-semibold text-gray-600 mb-2">
                Order Items
              </h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <div>
                  {cart.cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="mb-2 p-2 border-b-2 border-gray-200"
                    >
                      <div className="grid grid-cols-3 text-center">
                        <div>
                          <img
                            className="rounded-md h-20 w-20 "
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div>
                          <Link
                            to={`/product/${item._id || item.product}`}
                            className="underline text-gray-600"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="text-gray-600">
                          {item.qty} x {item.price} € = {item.qty * item.price}{" "}
                          €
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          {/* Group */}
          <div className="shadow-md p-6  rounded-3xl text-gray-600 h-min">
            {/* Group Item */}
            <div className="border-b-2 border-gray-200 mb-4">
              <h2 className=" text-2xl font-semibold">Order Summary</h2>
            </div>
            {/* Group Item */}
            <div className="flex justify-between mb-2 border-b-2 border-gray-200">
              <div>Items:</div>
              <div>{cart.itemsPrice} €</div>
            </div>
            {/* Group Item */}
            <div className="flex justify-between mb-2 border-b-2 border-gray-200">
              <div>Shipping:</div>
              <div>{cart.shippingPrice} €</div>
            </div>
            {/* Group Item */}
            <div className="flex justify-between mb-2 border-b-2 border-gray-200">
              <div>Tax:</div>
              <div>{cart.taxPrice} €</div>
            </div>
            {/* Group Item */}
            <div className="flex justify-between mb-4">
              <div>Total:</div>
              <div>{cart.totalPrice} €</div>
            </div>
            {/* Group Item */}
            <div>{error && <Message variant="danger">{error}</Message>}</div>
            {/* Group Item */}
            <div>
              <button
                type="button"
                className="btn"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
              {isLoading && <Spinner loading={isLoading} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
