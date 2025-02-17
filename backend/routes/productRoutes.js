import expres from "express";
const router = expres.Router();

// Controllers
import {
  getProductById,
  getProducts,
  getRandomProducts,
  createProduct,
  updateProduct,
} from "../controllers/productController.js";

// middleware
import { protect, admin } from "../middleware/authMiddleware.js";

// route /api/products
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/random").get(getRandomProducts);
router.route("/:id").get(getProductById).put(protect, admin, updateProduct);

export default router;
