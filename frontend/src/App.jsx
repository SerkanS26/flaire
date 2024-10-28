import "./App.css";
import Footer from "./components/Footer";

import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <HomeScreen />
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
