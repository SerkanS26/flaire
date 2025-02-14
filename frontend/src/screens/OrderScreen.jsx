// React
import { useEffect } from "react";

// react router dom
import { Link, useParams } from "react-router-dom";

// components
import Message from "../components/Message";
import Spinner from "../components/Spinner";

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
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    refetch,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPayOrder, error: errorPayOrder }] =
    usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

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

  return (
    <div>
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error?.error}
        </Message>
      ) : (
        <div className="container mx-auto my-10 p-8 text-gray-600">
          <div className="flex flex-col items-center gap-2  md:flex-row md:justify-start md:gap-10">
            <h1 className="text-xl md:text-3xl font-semibold mb-2">Order</h1>
            <p className="text-sm md:text-xl font-semibold text-gray-500 border-b-2 border-dotted">
              {order._id}
            </p>
            <p className="text-xs">
              Placed on {order.createdAt.substring(0, 10)}
            </p>
          </div>

          {/* Container  */}
          <div className="grid grid-cols-1 md:grid-cols-70/30 gap-4 my-10">
            {/* Column left */}
            <div>
              {/* Item */}
              <div className="mt-10 border-b-2 border-gray-200">
                <h2 className="mb-2 font-semibold text-2xl">Shipping </h2>
                <p className="mb-2">
                  <strong>Name:</strong> {order.user.name}
                </p>

                <p className="mb-2">
                  <strong>Address:</strong> {order.shippingAddress.address},{" "}
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> {order.user.email}
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
              <div className="mt-10 border-b-2 border-gray-200">
                <h2 className="mb-2 font-semibold text-2xl">Payment Method</h2>
                <p className="mb-2">
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">
                    <span className="font-semibold ">Paid on</span>{" "}
                    {new Date(order.paidAt).toLocaleString()}
                  </Message>
                ) : (
                  <Message variant="warning">Not Paid</Message>
                )}
              </div>

              {/* Item */}
              <div className="mt-10 border border-gray-200 p-4 shadow-md">
                <h2 className="ml-2 mb-4 font-semibold text-2xl">
                  Order Items
                </h2>
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex items-center m-2 border-b-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <Link
                        to={`/product/${item.product}`}
                        className="underline"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="flex ml-auto">
                      {item.qty} x {item.price}€ = {item.qty * item.price} €
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Column right */}
            <div>
              {/* Item */}
              <div className="mt-10 shadow-md p-4">
                <h2 className="mb-4 font-semibold text-2xl">Order Summary</h2>
                {/* Item */}
                <div className="mb-3 flex justify-between border-b-2 border-gray-100">
                  <div>
                    <strong className="text-gray-500 font-medium">
                      Items:
                    </strong>
                  </div>
                  <div> {order.itemsPrice}€ </div>
                </div>
                {/* Item */}
                <div className="mb-3 flex justify-between border-b-2 border-gray-100">
                  <div>
                    <strong className="text-gray-500 font-medium">
                      Shipping:
                    </strong>
                  </div>
                  <div> {order.shippingPrice}€ </div>
                </div>
                {/* Item */}
                <div className="mb-3 flex justify-between border-b-2 border-gray-100">
                  <div>
                    <strong className="text-gray-500 font-medium">Tax:</strong>
                  </div>
                  <div> {order.taxPrice}€ </div>
                </div>
                {/* Item */}
                <div className="mb-3 flex justify-between border-b-2 border-gray-100">
                  <div>
                    <strong className="text-gray-500 font-medium">
                      Total:
                    </strong>
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderScreen;
