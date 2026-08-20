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
import checkObjectId from "../middleware/chekObjectId.js";

// route /api/products
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/random").get(getRandomProducts);
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

export default router;
