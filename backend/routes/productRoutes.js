import expres from "express";
const router = expres.Router();

// Controllers
import {
  getProductById,
  getProducts,
  getRandomProducts,
} from "../controllers/productController.js";

router.route("/").get(getProducts);
router.route("/random").get(getRandomProducts);
router.route("/:id").get(getProductById);

export default router;
