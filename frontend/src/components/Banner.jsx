import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/motion";

const Banner = () => {
  return (
    <section className="relative mt-4 min-h-[650px] overflow-hidden rounded-b-[2.5rem] bg-gradient-to-br from-gold-100 via-gold-50 to-white">
      {/* decorative glow blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold-300/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-gold-500/20 blur-3xl" />

      <div className="container relative mx-auto grid grid-cols-1 items-center gap-4 lg:grid-cols-2">
        <motion.div
          variants={staggerContainer(0.14, 0.1)}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-xl px-3 py-16 text-center lg:text-left"
        >
          <motion.p
            variants={fadeUp}
            className="inline-block rounded-full bg-white/70 px-4 py-1.5 text-sm font-semibold capitalize tracking-wide text-gold-700 shadow-soft backdrop-blur"
          >
            Up to 30% discount
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-5xl font-extrabold capitalize leading-[1.08] text-ink-800 md:text-6xl lg:text-7xl"
          >
            Discover the <span className="text-gradient-gold">elegance</span> of
            flaire
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 text-base text-ink-500 md:text-lg">
            Step into a world of style and sophistication with our exclusive
            collection of women&apos;s bags. Each piece is meticulously designed
            to complete your look, whether you&apos;re heading to the office, a
            night out, or a weekend getaway. At Flaire, you&apos;ll find the
            perfect bag for every occasion.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8">
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="btn"
              >
                Explore Now
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto mt-10 h-96 w-96 lg:mt-0 lg:h-full lg:w-full">
          <motion.img
            src="/images/header.png"
            alt="banner image"
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="absolute bottom-0 h-96 object-cover drop-shadow-2xl lg:bottom-0 lg:right-0 lg:h-[650px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
