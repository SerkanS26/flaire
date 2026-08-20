import { motion } from "framer-motion";

const FormContainer = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-card md:p-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default FormContainer;
