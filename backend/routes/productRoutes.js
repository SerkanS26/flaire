import expres from "express";
const router = expres.Router();

// Controllers
import {
  getProductById,
  getProducts,
} from "../controllers/productController.js";

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
