import "./App.css";
import { Outlet } from "react-router-dom";

// components
import Footer from "./components/Footer";
import Header from "./components/Header";

//toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Header />

      <main className="py-3">
        <Outlet />
      </main>

      <Footer />

      <ToastContainer />
    </>
  );
};

export default App;
