import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, reveal } from "@/lib/motion";
import Reveal from "@/components/motion/Reveal";

const HomeProductCard = ({ bg, order, img, name, description, url }) => {
  return (
    <div className={`${bg} py-4`}>
      <div
        className={`container mx-auto grid grid-cols-1 items-center gap-8 rounded-3xl p-4 font-poppins lg:grid-cols-2 lg:gap-12`}
      >
        {/* image */}
        <motion.div
          {...reveal}
          variants={fadeUp}
          className={`${order} md:order-first flex justify-center`}
        >
          <motion.img
            whileHover={{ scale: 1.04, rotate: -0.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="h-52 w-52 rounded-3xl object-cover shadow-card lg:h-96 lg:w-96"
            src={img}
            alt={name}
          />
        </motion.div>

        {/* content */}
        <Reveal
          delay={0.1}
          className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left"
        >
          <h2 className="font-display text-2xl font-semibold text-ink-800 md:text-3xl lg:text-4xl">
            {name}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500 md:text-lg">
            {description}
          </p>
          <Link to={url} className="mt-6">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn"
            >
              View Product
            </motion.button>
          </Link>
        </Reveal>
      </div>
    </div>
  );
};

export default HomeProductCard;
