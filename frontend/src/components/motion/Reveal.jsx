import { motion } from "framer-motion";
import { fadeUp, reveal } from "@/lib/motion";

// Wrap any block of content to fade/slide it in once it scrolls into view.
const Reveal = ({ as = "div", variants = fadeUp, delay = 0, className = "", children, ...props }) => {
  const MotionTag = motion[as] || motion.div;
  const resolvedVariants = delay
    ? {
        ...variants,
        show: {
          ...variants.show,
          transition: { ...variants.show.transition, delay },
        },
      }
    : variants;

  return (
    <MotionTag
      {...reveal}
      variants={resolvedVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
