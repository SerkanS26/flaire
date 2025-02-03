import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "@/components/CheckoutSteps";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const { shippingAddress, paymentMethod } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    } else if (!paymentMethod) {
      navigate("/payment");
    }
  }, [shippingAddress.address, paymentMethod, navigate]);

  return (
    <div className="container mx-auto mt-36">
      <CheckoutSteps step1 step2 step3 step4 />
      <h1 className="text-3xl text-center md:text-4xl font-semibold text-gray-600 mb-10">
        Place Order
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-70/30 gap-4">
        <div>Column</div>
        <div>Column</div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
