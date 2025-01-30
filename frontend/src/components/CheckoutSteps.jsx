// react router dom

import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="container text-gray-700  flex flex-wrap justify-center gap-4 mb-14 -mt-28">
      <div>
        {step1 ? (
          <Link to="/login">Sign In</Link>
        ) : (
          <Link to="/login" className="text-gray-400 cursor-not-allowed">
            Sign In
          </Link>
        )}
      </div>{" "}
      {"/"}
      <div>
        {step2 ? (
          <Link to="/shipping">Shipping</Link>
        ) : (
          <Link to="" className="text-gray-400 cursor-not-allowed">
            Shipping
          </Link>
        )}
      </div>
      {"/"}
      <div>
        {step3 ? (
          <Link to="/payment">Payment</Link>
        ) : (
          <Link to="" className="text-gray-400 cursor-not-allowed">
            Payment
          </Link>
        )}
      </div>
      {"/"}
      <div>
        {step4 ? (
          <Link to="/placeorder">Place Order</Link>
        ) : (
          <Link to="" className="text-gray-400 cursor-not-allowed">
            Place Order
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
