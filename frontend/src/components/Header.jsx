import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaAlignRight, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-primary-light shadow-md">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="flex justify-center items-center p-2">
            <span className="text-2xl">Flaire</span>
          </div>

          {/* Left Menu */}
          <div className=" max-lg:hidden flex justify-between items-center gap-4 text-xl p-2 ">
            <a href="shop">Shop</a>
            <a href="about">About</a>
            <a heref="contact">Contact</a>
          </div>
          {/* Right Menu */}
          <div className="flex justify-center items-center p-2 gap-2 ">
            <a to="/login" className="">
              <button className="flex justify-center items-center gap-1  text-text-dark p-2 rounded-lg">
                <FaShoppingCart />
                Cart
              </button>
            </a>
            <a to="/login" className="">
              <button className="flex justify-center items-center gap-1  text-text-dark p-2 rounded-lg">
                <FaUser />
                Login
              </button>
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex justify-center items-center p-2">
            <button
              onClick={(prev) => setIsOpen(!prev)}
              className="block lg:hidden text-2xl"
            >
              {isOpen ? <FaTimes /> : <FaAlignRight />}
            </button>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
