import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion";

const override = {
  display: "block",
  margin: "0 auto",
};

const Spinner = ({ loading }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-center py-24"
    >
      <ClipLoader
        color="#daa520"
        loading={loading}
        cssOverride={override}
        size={80}
        aria-label="Loading Spinner"
      />
    </motion.div>
  );
};

export default Spinner;
