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

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(saveShippingAddress?.country || "");

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
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-600 mb-10 ">
        Shipping
      </h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <label className=" text-gray-600 " htmlFor="address">
          Address
        </label>
        <input
          className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100"
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          id="address"
        />
        <label className=" text-gray-600 " htmlFor="city">
          City
        </label>
        <input
          className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100"
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          id="city"
        />

        <label className=" text-gray-600 " htmlFor="postalCode">
          Postal Code
        </label>
        <input
          className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100 "
          type="text"
          placeholder="Enter Pastal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          id="postalCode"
        />

        <label className=" text-gray-600 " htmlFor="country">
          Country
        </label>
        <input
          className="border border-primary rounded-md p-2 focus:outline-primary-dark focus:bg-slate-100 "
          type="text"
          placeholder="Confirm Password"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          id="country"
        />

        <button className="btn" type="submit">
          Continue
        </button>

        {/* {isLoading && <Spinner loading={isLoading} />} */}
      </form>
    </FormContainer>
  );
};

export default ShippingScreen;
