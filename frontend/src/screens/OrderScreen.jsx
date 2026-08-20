// React
import { useEffect } from "react";

// react router dom
import { Link, useParams } from "react-router-dom";

// components
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import Reveal from "../components/motion/Reveal";

// toastify
import { toast } from "react-toastify";

// Paypal
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// redux
import { useSelector } from "react-redux";

// redux api call
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  // get order id from url
  const { id: orderId } = useParams();

  // useGetOrderDetailsQuery
  const {
    data: order,
    isLoading,
    refetch,
    error,
  } = useGetOrderDetailsQuery(orderId);

  // usePayOrderMutation
  const [payOrder, { isLoading: loadingPayOrder, error: errorPayOrder }] =
    usePayOrderMutation();

  // useDeliverOrderMutation
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  // usePayPalScriptReducer
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // get paypal client id
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  // get user info from redux store
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "EUR",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, paypal, order, paypalDispatch]);

  // functions
  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order delivered");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <div className="container mx-auto my-10 p-4 text-ink-600 md:p-8">
          <Reveal className="flex flex-col items-center gap-2 md:flex-row md:justify-start md:gap-6">
            <h1 className="mb-2 font-display text-xl font-semibold text-ink-800 md:text-3xl">
              Order
            </h1>
            <p className="border-b-2 border-dotted border-ink-200 text-sm font-semibold text-ink-500 md:text-xl">
              {order._id}
            </p>
            <p className="text-xs text-ink-400">
              Placed on {order.createdAt.substring(0, 10)}
            </p>
          </Reveal>

          {/* Container  */}
          <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-70/30">
            {/* Column left */}
            <Reveal delay={0.05}>
              {/* Item */}
              <div className="rounded-2xl bg-white p-5 shadow-soft">
                <h2 className="mb-3 text-2xl font-semibold text-ink-700">Shipping</h2>
                <p className="mb-2">
                  <strong className="text-ink-700">Name:</strong> {order.user.name}
                </p>

                <p className="mb-2">
                  <strong className="text-ink-700">Address:</strong>{" "}
                  {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                <p className="mb-3">
                  <strong className="text-ink-700">Email:</strong> {order.user.email}
                </p>

                {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="warning">Not Delivered</Message>
                )}
              </div>

              {/* Item */}
              <div className="mt-6 rounded-2xl bg-white p-5 shadow-soft">
                <h2 className="mb-3 text-2xl font-semibold text-ink-700">Payment Method</h2>
                <p className="mb-3">
                  <strong className="text-ink-700">Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">
                    <span className="font-semibold">Paid on</span>{" "}
                    {new Date(order.paidAt).toLocaleString()}
                  </Message>
                ) : (
                  <Message variant="warning">Not Paid</Message>
                )}
              </div>

              {/* Item */}
              <div className="mt-6 rounded-2xl bg-white p-5 shadow-soft">
                <h2 className="mb-4 text-2xl font-semibold text-ink-700">
                  Order Items
                </h2>
                {order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b border-ink-100 py-3 last:border-none"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                    <Link
                      to={`/product/${item.product}`}
                      className="text-ink-600 hover:text-gold-600"
                    >
                      {item.name}
                    </Link>
                    <div className="ml-auto text-ink-500">
                      {item.qty} x {item.price}€ = {item.qty * item.price} €
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            {/* Column right */}
            <Reveal delay={0.1}>
              {/* Item */}
              <div className="rounded-2xl bg-white p-5 shadow-soft">
                <h2 className="mb-4 text-2xl font-semibold text-ink-700">Order Summary</h2>
                {/* Item */}
                <div className="mb-3 flex justify-between border-b border-ink-100 pb-2">
                  <div>
                    <strong className="font-medium text-ink-500">
                      Items:
                    </strong>
                  </div>
                  <div> {order.itemsPrice}€ </div>
                </div>
                {/* Item */}
                <div className="mb-3 flex justify-between border-b border-ink-100 pb-2">
                  <div>
                    <strong className="font-medium text-ink-500">
                      Shipping:
                    </strong>
                  </div>
                  <div> {order.shippingPrice}€ </div>
                </div>
                {/* Item */}
                <div className="mb-3 flex justify-between border-b border-ink-100 pb-2">
                  <div>
                    <strong className="font-medium text-ink-500">Tax:</strong>
                  </div>
                  <div> {order.taxPrice}€ </div>
                </div>
                {/* Item */}
                <div className="mb-3 flex justify-between text-lg font-semibold text-ink-800">
                  <div>
                    Total:
                  </div>
                  <div> {order.totalPrice}€ </div>
                </div>
                {!order.isPaid && (
                  <div className="mt-4">
                    {loadingPayOrder && <Spinner loading={loadingPayOrder} />}
                    {isPending && <Spinner loading={isPending} />}
                    {errorPayOrder && (
                      <Message variant="danger">
                        {errorPayOrder?.data?.message}
                      </Message>
                    )}

                    <PayPalButtons
                      createOrder={async (data, actions) => {
                        const orderId = await actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: order.totalPrice,
                              },
                            },
                          ],
                        });
                        return orderId;
                      }}
                      onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        try {
                          await payOrder({ orderId, details }).unwrap();
                          refetch();
                          toast.success("Payment Order Successfully");
                        } catch (err) {
                          toast.error(err?.data?.message || err.message);
                        }
                      }}
                      onError={(err) => {
                        toast.error(err.message);
                      }}
                      onCancel={(err) => {
                        toast.error(err.message);
                      }}
                      style={{
                        layout: "vertical",
                        color: "blue",
                        shape: "rect",
                        label: "pay",
                        tagline: false,
                        height: 40,
                        size: "responsive",
                        width: "100%",
                      }}
                    />
                  </div>
                )}
                {/* MARK AS DELIVERED */}
                {loadingDeliver && <Spinner loading={loadingDeliver} />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <div className="mt-4">
                      <button
                        className="btn btn-primary"
                        onClick={deliverOrderHandler}
                      >
                        Mark As Delivered
                      </button>
                    </div>
                  )}
              </div>
            </Reveal>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderScreen;
