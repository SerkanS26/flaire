import expres from "express";
const router = expres.Router();

// Controllers
import {
  getProductById,
  getProducts,
  getRandomProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
} from "../controllers/productController.js";

// middleware
import { protect, admin } from "../middleware/authMiddleware.js";

// route /api/products
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/random").get(getRandomProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createProductReview);

export default router;
