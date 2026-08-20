import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// components
import Footer from "./components/Footer";
import Header from "./components/Header";

//toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { pageTransition } from "./lib/motion";

const App = () => {
  const location = useLocation();

  return (
    <>
      <Header />

      <main className="py-3">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} {...pageTransition}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <ToastContainer position="top-right" theme="colored" />
    </>
  );
};

export default App;
