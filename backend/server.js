import express from "express";

import dotenv from "dotenv";
dotenv.config();

// database
import connectDB from "./config/db.js";

// middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// routes
import productRoutes from "./routes/productRoutes.js";

// connect to database
connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
