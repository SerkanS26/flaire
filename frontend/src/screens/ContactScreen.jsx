import { motion } from "framer-motion";

const inputClass =
  "w-full rounded-xl border border-ink-100 bg-extra-light p-3 text-text-dark placeholder:text-ink-300 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-400";

const ContactScreen = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-extra-light p-6">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-card"
      >
        <h2 className="mb-2 text-center font-display text-3xl font-semibold text-primary-dark">
          Contact Us
        </h2>
        <p className="mb-6 text-center text-text-light">
          Have questions? We&apos;d love to hear from you.
        </p>
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dark">Name</label>
            <input className={inputClass} type="text" placeholder="Your Name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dark">Email</label>
            <input className={inputClass} type="email" placeholder="Your Email" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dark">Message</label>
            <textarea rows="4" className={inputClass} placeholder="Your Message"></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="btn w-full"
          >
            Send Message
          </motion.button>
        </form>
        <div className="mt-6 space-y-1 text-center text-sm text-text-light">
          <p>Email: contact@flaire.be</p>
          <p>Phone: +32 2 123 45 67</p>
          <p>Address: 1000 Brussels, Belgium</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactScreen;
