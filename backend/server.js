import express from "express";

import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

// database
import connectDB from "./config/db.js";

// middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// connect to database
connectDB();

const port = process.env.PORT || 5000;

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
