import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingBag, FaAlignRight, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);

  return (
    <section className="">
      <nav className="container mx-auto px-4 text-primary-dark">
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
          <div className="max-lg:hidden flex justify-center items-center p-2 gap-6 font-poppins ">
            <Link to="/cart" className="">
              <button className="flex justify-center items-center gap-1 p-2 rounded-lg hover:text-primary">
                <FaShoppingBag />
              </button>
            </Link>
            <Link to="/login" className="">
              <button className="flex justify-center items-center gap-1  p-2 rounded-lg hover:text-primary">
                <FaUser />
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
          <div className="flex flex-col gap-4 text-xl font-poppins p-2 mt-2 font-medium">
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
          <div className="flex justify-center items-center p-2 gap-8 font-poppins ">
            <Link to="/cart" className="">
              <button className="flex justify-center items-center gap-1 p-2 rounded-lg hover:text-primary">
                <FaShoppingBag />
              </button>
            </Link>
            <Link to="/login" className="">
              <button className="flex justify-center items-center gap-1  p-2 rounded-lg hover:text-primary">
                <FaUser />
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
