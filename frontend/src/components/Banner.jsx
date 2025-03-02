import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <section
      className="container mx-auto bg-primary-light  min-h-[600px]
        rounded-b-xl grid grid-cols-1 lg:grid-cols-2 gap-4 items-center
    "
    >
      <div className="header__content mx-auto text-center px-3 lg:text-left">
        <motion.h4
          className="text-[#daa520] capitalize p-4 mt-2"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 2,
          }}
        >
          up to 30% discount on
        </motion.h4>
        <motion.h1
          className="text-3xl p-4  md:text-7xl"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 2,
          }}
        >
          Discover the elegance of flaire
        </motion.h1>
        <motion.p
          className="p-4"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 2,
          }}
        >
          Step into a world of style and sophistication with our exclusive
          collection of women&apos;s bags. Each piece is meticulously designed
          to complete your look, whether you&apos;re heading to the office, a
          night out, or a weekend getaway. At Flaire, you&apos;ll find the
          perfect bag for every occasion.
        </motion.p>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 2,
            delay: 1,
          }}
        >
          <div className="text-center md:text-left md:ml-3 my-6">
            <Link to="/shop" className="btn">
              Explore Now
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        className=" h-auto mx-auto w-96 mt-[340px]  lg:mt-0 lg:h-full lg:w-full relative "
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <img
          src="/images/header.png"
          alt="banner image"
          className=" absolute bottom-0 h-96  lg:h-[650px] lg:bottom-0 lg:right-0  object-cover"
        />
      </motion.div>
    </section>
  );
};

export default Banner;
