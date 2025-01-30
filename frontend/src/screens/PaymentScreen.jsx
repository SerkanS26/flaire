import { useState, useEffect } from "react";

//components
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

//redux
import { useSelector, useDispatch } from "react-redux";

//react router dom
import { useNavigate } from "react-router-dom";

//slices
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-10">
        Payment Method
      </h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <label
          className="text-gray-600 text-center mb-3"
          htmlFor="paymentMethod"
        >
          Select Method
        </label>
        <select
          name="paymentMethod"
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="bg-gray-100 text-gray-700 p-3 rounded-lg"
        >
          <option value="PayPal">PayPal or Credit Card</option>
        </select>
        <button
          type="submit"
          className="bg-gray-600 text-white p-3 mt-3 rounded-lg"
        >
          Continue
        </button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
