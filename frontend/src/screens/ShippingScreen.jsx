import { useState } from "react";

// components
import FormContainer from "@/components/FormContainer";
import CheckoutSteps from "@/components/CheckoutSteps";

// react router dom
import { useNavigate } from "react-router-dom";

// redux
import { useDispatch, useSelector } from "react-redux";

// slices
import { saveShippingAddress } from "../slices/cartSlice";

// framer-motion
import { motion } from "framer-motion";

const inputClass =
  "w-full rounded-xl border border-ink-100 bg-ink-50 p-3 text-ink-700 placeholder:text-ink-300 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1 className="mb-8 font-display text-3xl font-semibold text-ink-800">
        Shipping
      </h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <label className="-mb-2 text-sm font-medium text-ink-500" htmlFor="address">
          Address
        </label>
        <input
          className={inputClass}
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="address"
        />
        <label className="-mb-2 text-sm font-medium text-ink-500" htmlFor="city">
          City
        </label>
        <input
          className={inputClass}
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          id="city"
        />

        <label className="-mb-2 text-sm font-medium text-ink-500" htmlFor="postalCode">
          Postal Code
        </label>
        <input
          className={inputClass}
          type="text"
          placeholder="Enter Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          id="postalCode"
        />

        <label className="-mb-2 text-sm font-medium text-ink-500" htmlFor="country">
          Country
        </label>
        <input
          className={inputClass}
          type="text"
          placeholder="Enter Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          id="country"
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn mt-2"
          type="submit"
        >
          Continue
        </motion.button>
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
