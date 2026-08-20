import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/motion/Reveal";
import { staggerContainer, fadeUp, reveal } from "../lib/motion";

const AboutScreen = () => {
  return (
    <div className="min-h-screen bg-extra-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-100 via-gold-50 to-white py-20">
        <Reveal className="container mx-auto px-4">
          <h1 className="mb-6 text-center font-display text-4xl font-bold text-ink-800 md:text-5xl">
            Our Story
          </h1>
          <p className="mx-auto max-w-3xl text-center text-lg text-ink-500">
            At Flaire, we believe in blending timeless elegance with modern
            functionality to create bags that empower women&apos;s daily lives.
          </p>
        </Reveal>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="mb-20 grid items-center gap-12 md:grid-cols-2">
          <Reveal as="div" className="order-2 md:order-1">
            <h2 className="mb-6 font-display text-3xl font-bold text-ink-800">
              Crafting Quality Since 2019
            </h2>
            <p className="mb-6 text-text-light">
              Founded with a passion for artisanal craftsmanship, Flaire began
              as a small workshop dedicated to creating handcrafted bags that
              combine luxury with practicality. While we take pride in our
              original designs, we&apos;ve also partnered with world-renowned
              brands to bring you a curated selection of premium accessories.
            </p>
            <p className="mb-6 text-text-light">
              Our designers work tirelessly to ensure every stitch and detail in
              our exclusive collection meets the highest standards of quality
              and aesthetic appeal. Complementing our own creations, we
              carefully select luxury brands that share our commitment to
              excellence and innovative design.
            </p>
            <p className="text-text-light">
              From our studio to your wardrobe, Flaire offers both our signature
              pieces and carefully chosen designer labels - all united by
              exceptional craftsmanship and timeless style.
            </p>
          </Reveal>
          <motion.div
            {...reveal}
            variants={fadeUp}
            className="relative order-1 h-80 overflow-hidden rounded-3xl shadow-card md:order-2 lg:h-auto"
          >
            <div className="absolute inset-0 z-10 bg-ink-900/25"></div>
            <img
              src="/images/crafting-image.jpg"
              alt="Crafting Process"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 grid gap-8 md:grid-cols-3"
        >
          {[
            {
              title: "Sustainable Materials",
              desc: "Ethically sourced leathers and eco-friendly fabrics",
              path: "M13 10V3L4 14h7v7l9-11h-7z",
            },
            {
              title: "Quality Assurance",
              desc: "Rigorous quality checks for every product",
              path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Customer Support",
              desc: "24/7 assistance and style consultations",
              path: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-white p-6 shadow-soft transition-shadow hover:shadow-card-hover"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-100">
                <svg
                  className="h-6 w-6 text-gold-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.path} />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-text-dark">{item.title}</h3>
              <p className="text-text-light">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Section */}
        <div className="mb-16 text-center">
          <Reveal>
            <h2 className="mb-8 font-display text-3xl font-bold text-ink-800">
              Meet Our Team
            </h2>
          </Reveal>
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-8 md:grid-cols-3"
          >
            {[
              {
                name: "Emma Wilson",
                position: "Lead Designer",
                imgSrc: "/images/designer-1.jpg",
              },
              {
                name: "Michael Chen",
                position: "Sales Manager",
                imgSrc: "/images/sales-manager.jpg",
              },
              {
                name: "Sophia Rodriguez",
                position: "Customer Support Lead",
                imgSrc: "/images/customer-support.jpg",
              },
            ].map((member) => (
              <motion.div
                key={member.name}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl shadow-soft"
              >
                <img
                  src={member.imgSrc}
                  alt={`${member.name} - ${member.position}`}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105 lg:h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h4 className="text-xl font-semibold text-white">{member.name}</h4>
                  <p className="text-gold-200">{member.position}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <Reveal className="bg-ink-gradient py-14 text-center text-gold-100">
        <div className="container mx-auto px-4">
          <h3 className="mb-6 font-display text-2xl font-bold text-white">
            Ready to Find Your Perfect Bag?
          </h3>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-gold-500 px-8 py-3 font-semibold text-white shadow-glow transition-colors hover:bg-gold-600"
            >
              Shop Collection
            </motion.button>
          </Link>
        </div>
      </Reveal>
    </div>
  );
};

export default AboutScreen;
