import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, reveal } from "@/lib/motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      {...reveal}
      variants={fadeUp}
      className="mt-20 border-t border-ink-100 bg-ink-900 text-ink-200"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <Link to="/" className="font-display text-2xl font-extrabold text-white">
              Flaire<span className="text-gold-500">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-ink-300">
              Timeless bags, modern craftsmanship. Elevate every outfit with a
              piece made to last.
            </p>
          </div>

          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-white">Explore</span>
              <Link to="/shop" className="text-ink-300 transition-colors hover:text-gold-400">
                Shop
              </Link>
              <Link to="/about" className="text-ink-300 transition-colors hover:text-gold-400">
                About
              </Link>
              <Link to="/contact" className="text-ink-300 transition-colors hover:text-gold-400">
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-semibold text-white">Account</span>
              <Link to="/cart" className="text-ink-300 transition-colors hover:text-gold-400">
                Cart
              </Link>
              <Link to="/login" className="text-ink-300 transition-colors hover:text-gold-400">
                Sign In
              </Link>
              <Link to="/profile" className="text-ink-300 transition-colors hover:text-gold-400">
                Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-ink-400">
          © {currentYear} Flaire. All Rights Reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
