import { useState } from "react";
// react-router
import { Link } from "react-router-dom";

// icons
import { FaUser, FaShoppingBag, FaAlignRight, FaTimes } from "react-icons/fa";

// redux
import { useSelector } from "react-redux";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="">
      <nav className="container mx-auto p-4 text-primary-dark">
        <div className=" flex justify-between items-center max-lg:px-2">
          {/* Left Menu */}
          <div className=" max-lg:hidden flex justify-between items-center gap-6 text-xl font-poppins p-2 font-medium">
            <Link className=" hover:text-primary" to="/shop">
              Shop
            </Link>
            <Link className=" hover:text-primary" to="/about">
              About
            </Link>
            <Link className=" hover:text-primary" to="/contact">
              Contact
            </Link>
          </div>
          {/* Logo */}
          <div className="flex justify-center items-center p-2 font-playfair cursor-pointer">
            <Link to="/" className="text-3xl hover:text-primary font-extrabold">
              Flaire<span className="text-primary">.</span>
            </Link>
          </div>
          {/* Right Menu */}
          <div className="max-lg:hidden flex justify-center items-center p-2 gap-6 ">
            <Link to="/cart" className=" ">
              <button className=" relative flex justify-center items-center gap-1 p-2 hover:text-primary">
                <FaShoppingBag className="mt-1 mr-2" />
                {cartItems.length > 0 && (
                  <span className="text-sm absolute top-0 right-0 bg-primary text-white w-5 h-5 flex justify-center items-center rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                )}
              </button>
            </Link>
            <Link to="/login" className="">
              <button className="flex justify-center items-center gap-1  p-2  hover:text-primary">
                <FaUser /> Sign In
              </button>
            </Link>
          </div>

          {/* Mobile Menu hamburger */}
          <div className="lg:hidden flex justify-center items-center p-2">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="block lg:hidden text-2xl"
            >
              {isOpen ? <FaTimes /> : <FaAlignRight />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:hidden max-w-[1400px] mx-auto px-4 text-primary-dark`}
        >
          <div className="flex flex-col gap-4 text-xl p-2 mt-2 font-medium">
            <Link className=" hover:text-primary" to="/shop">
              Shop
            </Link>
            <Link className=" hover:text-primary" to="/about">
              About
            </Link>
            <Link className=" hover:text-primary" to="/contact">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-4 p-2 mt-2">
            <Link to="/cart" className="">
              <button className="relative  hover:text-primary">
                <div
                  className={`flex justify-center items-center ${
                    cartItems > 0 ? "gap-3" : "gap-2"
                  }  `}
                >
                  <FaShoppingBag />
                  Cart
                </div>
                {cartItems.length > 0 && (
                  <span className="text-sm absolute top-[-7px] left-3 bg-primary p-2 text-white w-4 h-4 flex justify-center items-center rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                )}
              </button>
            </Link>
            <Link to="/login" className="">
              <button className="flex justify-center items-center gap-2 rounded-lg hover:text-primary">
                <FaUser /> Sign In
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
