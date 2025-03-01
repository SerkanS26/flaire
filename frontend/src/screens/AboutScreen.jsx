import { Link } from "react-router-dom";
import { motion } from "motion/react";

const AboutScreen = () => {
  return (
    <div className="bg-extra-light min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary-light py-16">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-primary-dark text-center mb-6"
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
            Our Story
          </motion.h1>
          <motion.p
            className="text-lg  text-center max-w-3xl mx-auto text-gray-600"
            initial={{ y: "100%" }} // start from the bottom
            variants={{
              hidden: { y: "100%" },
              visible: { y: 0 },
            }}
            animate={scrollY > 100 ? "visible" : "hidden"}
            transition={{ duration: 1.5 }} // animation duration
            viewport={{ once: true }} // animate only once when in view
            whileInView="visible"
          >
            At Flaire, we believe in blending timeless elegance with modern
            functionality to create bags that empower women&apos;s daily lives.
          </motion.p>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="order-2 md:order-1">
            <motion.h2
              className="text-3xl font-bold text-text-dark mb-6"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2 }}
            >
              Crafting Quality Since 2019
            </motion.h2>
            <motion.p
              className="text-text-light mb-6"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              Founded with a passion for artisanal craftsmanship, Flaire began
              as a small workshop dedicated to creating handcrafted bags that
              combine luxury with practicality. While we take pride in our
              original designs, we&apos;ve also partnered with world-renowned
              brands to bring you a curated selection of premium accessories.
            </motion.p>
            <motion.p
              className="text-text-light mb-6"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2, delay: 1 }}
            >
              Our designers work tirelessly to ensure every stitch and detail in
              our exclusive collection meets the highest standards of quality
              and aesthetic appeal. Complementing our own creations, we
              carefully select luxury brands that share our commitment to
              excellence and innovative design.
            </motion.p>
            <motion.p
              className="text-text-light"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 2, delay: 1.5 }}
            >
              From our studio to your wardrobe, Flaire offers both our signature
              pieces and carefully chosen designer labels - all united by
              exceptional craftsmanship and timeless style.
            </motion.p>
          </div>
          <motion.div
            className="order-1 md:order-2 relative h-80 rounded-lg overflow-hidden lg:h-auto"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <div className="absolute inset-0 bg-primary-dark/30"></div>
            <img
              src="/images/crafting-image.jpg"
              alt="Crafting Process"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-dark mb-3">
              Sustainable Materials
            </h3>
            <p className="text-text-light">
              Ethically sourced leathers and eco-friendly fabrics
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-dark mb-3">
              Quality Assurance
            </h3>
            <p className="text-text-light">
              Rigorous quality checks for every product
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-primary-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-dark mb-3">
              Customer Support
            </h3>
            <p className="text-text-light">
              24/7 assistance and style consultations
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text-dark mb-8">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
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
            ].map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg"
              >
                <img
                  src={member.imgSrc}
                  alt={`${member.name} - ${member.position}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 lg:h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-dark/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h4 className="text-xl font-semibold text-extra-light">
                    {member.name}
                  </h4>
                  <p className="text-primary-light">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-dark text-primary-light text-center py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-6">
            Ready to Find Your Perfect Bag?
          </h3>
          <Link to="/shop">
            <button className="bg-primary-light text-primary-dark px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors">
              Shop Collection
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
