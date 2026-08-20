import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

const icons = {
  primary: FaInfoCircle,
  secondary: FaInfoCircle,
  success: FaCheckCircle,
  danger: FaTimesCircle,
  warning: FaExclamationTriangle,
  info: FaInfoCircle,
  light: FaInfoCircle,
  dark: FaInfoCircle,
};

const Message = ({ variant = "primary", children }) => {
  const Icon = icons[variant] || FaInfoCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`alert alert-${variant} container mx-auto`}
    >
      <Icon className="shrink-0 text-base" />
      <span>{children}</span>
    </motion.div>
  );
};

//Define prop types
Message.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ]),
  children: PropTypes.node.isRequired,
};

export default Message;
