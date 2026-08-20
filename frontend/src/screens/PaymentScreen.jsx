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

// framer-motion
import { motion } from "framer-motion";

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
      <h1 className="mb-8 font-display text-3xl font-semibold text-ink-800">
        Payment Method
      </h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <label
          className="mb-1 text-center text-sm font-medium text-ink-500"
          htmlFor="paymentMethod"
        >
          Select Method
        </label>
        <select
          name="paymentMethod"
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="rounded-xl border border-ink-100 bg-ink-50 p-3 text-ink-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
        >
          <option value="PayPal">PayPal or Credit Card</option>
        </select>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="btn mt-2"
        >
          Continue
        </motion.button>
      </form>
    </FormContainer>
  );
};

export default PaymentScreen;
