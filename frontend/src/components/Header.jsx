import { useEffect, useState } from "react";
// react-router
import { Link, useNavigate } from "react-router-dom";

// icons
import { FaUser, FaShoppingBag, FaAlignRight, FaTimes } from "react-icons/fa";

// framer-motion
import { AnimatePresence, motion } from "framer-motion";

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
import { resetCart } from "@/slices/cartSlice";

// toast
import { toast } from "react-toastify";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const NavLink = ({ to, children }) => (
  <Link to={to} className="group relative py-1 transition-colors hover:text-gold-500">
    {children}
    <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-gold-500 transition-all duration-300 ease-out group-hover:w-full" />
  </Link>
);

const menuContentClass =
  "min-w-[10rem] bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-card border border-ink-100/60 overflow-y-auto";

const menuItemClass =
  "cursor-pointer rounded-xl px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-gold-50 hover:text-gold-600 mb-0.5 last:mb-0";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logOut());
      dispatch(resetCart());
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 text-ink-700">
        <div className="flex items-center justify-between max-lg:px-2 py-3">
          {/* Left Menu */}
          <div className="max-lg:hidden flex items-center gap-8 text-[0.95rem] font-medium">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center justify-center cursor-pointer group">
            <motion.span
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="font-display text-3xl font-extrabold tracking-tight text-ink-800"
            >
              Flaire<span className="text-gold-500">.</span>
            </motion.span>
          </Link>

          {/* Right Menu */}
          <div className="max-lg:hidden flex items-center gap-6">
            <Link to="/cart">
              <button className="relative flex items-center gap-1 p-2 transition-colors hover:text-gold-500">
                <FaShoppingBag className="text-lg" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[0.7rem] font-semibold text-white shadow-glow"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </Link>

            {userInfo ? (
              <DropdownMenu modal>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-2 transition-colors hover:text-gold-500">
                    <FaUser /> {userInfo.name}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={menuContentClass}>
                  <Link to="/profile">
                    <DropdownMenuItem className={menuItemClass}>Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className={menuItemClass} onClick={logoutHandler}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <button className="flex items-center gap-2 p-2 transition-colors hover:text-gold-500">
                  <FaUser /> Sign In
                </button>
              </Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <DropdownMenu modal>
                <DropdownMenuTrigger asChild>
                  <button className="rounded-full bg-ink-gradient px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-soft transition-transform hover:scale-105">
                    DASHBOARD
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={menuContentClass}>
                  <Link to="/admin/productlist">
                    <DropdownMenuItem className={menuItemClass}>Product List</DropdownMenuItem>
                  </Link>
                  <Link to="/admin/userlist">
                    <DropdownMenuItem className={menuItemClass}>User List</DropdownMenuItem>
                  </Link>
                  <Link to="/admin/orderlist">
                    <DropdownMenuItem className={menuItemClass}>Order List</DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Menu hamburger */}
          <div className="lg:hidden flex items-center p-2">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="block lg:hidden text-2xl text-ink-700"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {isOpen ? <FaTimes /> : <FaAlignRight />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 text-lg p-2 pb-4 mt-1 font-medium border-t border-ink-100/70 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    className="hover:text-gold-500 transition-colors"
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-4 p-2 pb-4">
                <Link to="/cart">
                  <button
                    className="relative flex items-center gap-2 hover:text-gold-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaShoppingBag />
                    Cart
                    {cartCount > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-xs font-semibold text-white">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </Link>
                {userInfo ? (
                  <DropdownMenu modal>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 hover:text-gold-500 transition-colors">
                        <FaUser /> {userInfo.name}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={menuContentClass} align="start">
                      <Link to="/profile">
                        <DropdownMenuItem
                          className={menuItemClass}
                          onClick={() => setIsOpen(false)}
                        >
                          Profile
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className={menuItemClass} onClick={logoutHandler}>
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to="/login">
                    <button
                      className="flex items-center gap-2 hover:text-gold-500 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <FaUser /> Sign In
                    </button>
                  </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <DropdownMenu modal>
                    <DropdownMenuTrigger asChild>
                      <button className="w-fit rounded-full bg-ink-gradient px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-soft">
                        DASHBOARD
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={menuContentClass}>
                      <Link to="/admin/productlist">
                        <DropdownMenuItem className={menuItemClass}>Product List</DropdownMenuItem>
                      </Link>
                      <Link to="/admin/userlist">
                        <DropdownMenuItem className={menuItemClass}>User List</DropdownMenuItem>
                      </Link>
                      <Link to="/admin/orderlist">
                        <DropdownMenuItem className={menuItemClass}>Order List</DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
