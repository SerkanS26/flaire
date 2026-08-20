import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const steps = [
  { key: "step1", label: "Sign In", to: "/login" },
  { key: "step2", label: "Shipping", to: "/shipping" },
  { key: "step3", label: "Payment", to: "/payment" },
  { key: "step4", label: "Place Order", to: "/placeorder" },
];

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const activeMap = { step1, step2, step3, step4 };

  return (
    <div className="mx-auto mb-10 flex w-full max-w-xl items-center justify-between">
      {steps.map((step, index) => {
        const isActive = activeMap[step.key];
        const isLast = index === steps.length - 1;

        return (
          <div key={step.key} className="flex flex-1 items-center last:flex-none">
            <Link
              to={isActive ? step.to : ""}
              className={`flex flex-col items-center gap-1.5 ${
                isActive ? "" : "pointer-events-none"
              }`}
            >
              <motion.span
                initial={false}
                animate={{
                  backgroundColor: isActive ? "#daa520" : "#ebebf1",
                  color: isActive ? "#ffffff" : "#a6a8bd",
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold shadow-soft"
              >
                {index + 1}
              </motion.span>
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-ink-700" : "text-ink-300"
                }`}
              >
                {step.label}
              </span>
            </Link>

            {!isLast && (
              <div className="mx-2 h-[2px] flex-1 bg-ink-100">
                <motion.div
                  initial={false}
                  animate={{ width: isActive && activeMap[steps[index + 1].key] ? "100%" : "0%" }}
                  className="h-full bg-gold-500"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
