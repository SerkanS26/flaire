import { Link } from "react-router-dom";
import { motion } from "motion/react";

const HomeProductCard = ({ bg, order, img, name, description, url }) => {
  return (
    <div
      className={`container ${bg} h-auto mx-auto mt-10 px-12 rounded-lg 
        grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 font-poppins 
     `}
    >
      {/* left */}
      <div className={`${order} md:order-first`}>
        <img
          className={`object-cover lg:h-96 lg:w-96  h-52 w-52 mx-auto rounded-2xl`}
          src={img}
          alt="lacoste bag blue"
        />
      </div>
      {/* right */}
      <div className="flex flex-col justify-center items-center ">
        <motion.h2
          className="font-semibold text-xl text-center text-[#555573] md:text-2xl lg:text-3xl"
          initial={{ y: "100%" }} // start from the bottom
          variants={{
            hidden: { y: "100%" },
            visible: { y: 0 },
          }}
          animate={scrollY > 100 ? "visible" : "hidden"}
          transition={{ duration: 1 }} // animation duration
          viewport={{ once: true }} // animate only once when in view
          whileInView="visible"
        >
          {name}
        </motion.h2>
        <motion.p
          className=" text-base text-gray-600 mt-3  text-left md:text-lg"
          initial={{ y: "100%" }} // start from the bottom
          variants={{
            hidden: { y: "100%" },
            visible: { y: 0 },
          }}
          animate={scrollY > 0 ? "visible" : "hidden"}
          transition={{ duration: 1 }} // animation duration
          viewport={{ once: true }} // animate only once when in view
          whileInView="visible"
        >
          {description}
        </motion.p>

        <motion.div
          className="mt-6"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Link to={url} className="btn mt-4">
            View Product
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeProductCard;
