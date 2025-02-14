import { useState } from "react";
// react-router
import { Link, useNavigate } from "react-router-dom";

// icons
import { FaUser, FaShoppingBag, FaAlignRight, FaTimes } from "react-icons/fa";

// Chadcn ui
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

// redux
import { useSelector, useDispatch } from "react-redux";

//slices
import { logOut } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

// toast
import { toast } from "react-toastify";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logOut());
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      console.log(error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="">
      <nav className="container mx-auto p-4 text-primary-dark">
        <div className=" flex justify-between items-center max-lg:px-2">
          {/* Left Menu */}
          <div className=" max-lg:hidden flex justify-between items-center gap-6 text-xl font-poppins p-2 font-medium">
            <Link className="hover:text-[#daa520]" to="/shop">
              Shop
            </Link>
            <Link className=" hover:text-[#daa520]" to="/about">
              About
            </Link>
            <Link className=" hover:text-[#daa520]" to="/contact">
              Contact
            </Link>
          </div>
          {/* Logo */}
          <div className="flex justify-center items-center p-2  cursor-pointer">
            <Link
              to="/"
              className="text-3xl hover:text-[#daa520] font-extrabold"
            >
              Flaire<span className="text-[#daa520]">.</span>
            </Link>
          </div>
          {/* Right Menu */}
          <div className="max-lg:hidden flex justify-center items-center p-2 gap-6 ">
            <Link to="/cart" className=" ">
              <button className=" relative flex justify-center items-center gap-1 p-2 hover:text-[#daa520]">
                <FaShoppingBag className="mt-1 mr-2" />
                {cartItems.length > 0 && (
                  <span className="text-sm absolute top-0 right-0 bg-[#daa520] text-white w-5 h-5 flex justify-center items-center rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                )}
              </button>
            </Link>

            {userInfo ? (
              <DropdownMenu modal>
                <DropdownMenuTrigger asChild>
                  <button className="flex justify-center items-center gap-1 p-2 hover:text-[#daa520]">
                    <FaUser /> {userInfo.name}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#f1f1f1] p-4 rounded-xl shadow-lg overflow-y-auto">
                  <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer hover:text-[#daa520] mb-1">
                      Profile
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem
                    className="cursor-pointer hover:text-[#daa520] mb-1"
                    onClick={logoutHandler}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="">
                <button className="flex justify-center items-center gap-1  p-2  hover:text-[#daa520]">
                  <FaUser /> Sign In
                </button>
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <DropdownMenu modal>
                <DropdownMenuTrigger asChild>
                  <button className="flex justify-center items-center gap-1 p-2 bg-orange-500 text-slate-50 rounded-md hover:bg-orange-400">
                    DASHBOARD
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#f1f1f1] p-4 rounded-xl shadow-lg overflow-y-auto">
                  <Link to="/admin/productlist">
                    <DropdownMenuItem className="cursor-pointer hover:text-[#daa520] mb-1">
                      Product List
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/admin/userlist">
                    <DropdownMenuItem className="cursor-pointer hover:text-[#daa520] mb-1">
                      User List
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/admin/orderlist">
                    <DropdownMenuItem className="cursor-pointer hover:text-[#daa520] mb-1">
                      Order List
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
            <Link
              className=" hover:text-[#daa520]"
              to="/shop"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              Shop
            </Link>
            <Link
              className=" hover:text-[#daa520]"
              to="/about"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              About
            </Link>
            <Link className=" hover:text-[#daa520]" to="/contact">
              Contact
            </Link>
          </div>
          <div className="flex flex-col gap-4 p-2 mt-2">
            <Link to="/cart" className="">
              <button
                className="relative  hover:text-[#daa520]"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <div
                  className={`flex justify-center items-center ${
                    cartItems > 0 ? "gap-3" : "gap-2"
                  }  `}
                >
                  <FaShoppingBag />
                  Cart
                </div>
                {cartItems.length > 0 && (
                  <span className="text-sm absolute top-[-7px] left-3 bg-[#daa520] p-2 text-white w-4 h-4 flex justify-center items-center rounded-full">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                )}
              </button>
            </Link>
            {userInfo ? (
              <DropdownMenu modal>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:text-[#daa520]">
                    <FaUser /> {userInfo.name}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-[#f1f1f1] p-4 rounded-xl shadow-lg overflow-y-auto"
                  align="start"
                >
                  <Link to="/profile">
                    <DropdownMenuItem
                      className="cursor-pointer hover:text-[#daa520] mb-1"
                      onClick={() => setIsOpen((prev) => !prev)}
                    >
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="cursor-pointer hover:text-[#daa520] mb-1"
                    onClick={logoutHandler}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="">
                <button
                  className="flex justify-center items-center gap-2 rounded-lg hover:text-[#daa520]"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <FaUser /> Sign In
                </button>
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <DropdownMenu modal>
                <DropdownMenuTrigger asChild>
                  <button className="flex justify-center items-center gap-2 p-2 bg-orange-500 text-slate-50 rounded-md hover:bg-orange-400">
                    DASHBOARD
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#f1f1f1] p-4 rounded-xl shadow-lg overflow-y-auto">
                  <Link to="/admin/productlist">
                    <DropdownMenuItem className="cursor-pointer hover:text-[#daa520] mb-1">
                      Product List
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/admin/userlist">
                    <DropdownMenuItem className="cursor-pointer hover:text-[#daa520] mb-1">
                      User List
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/admin/orderlist">
                    <DropdownMenuItem className="cursor-pointer hover:text-[#daa520] mb-1">
                      Order List
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;
