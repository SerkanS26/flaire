import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
//react router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//Paypal
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

//redux
import { Provider } from "react-redux";
import store from "./store.js";

import App from "./App.jsx";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import ShopScreen from "./screens/ShopScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";

// private route and admin route
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/shop" element={<ShopScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="/contact" element={<ContactScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>
);
