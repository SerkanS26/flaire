import express from "express";
const router = express.Router();

// Controllers
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

// Middleware
import { protect, admin } from "../middleware/authMiddleware.js";

// Routes
// @route    /api/users
router.route("/").post(registerUser).get(protect, admin, getUsers);

router.post("/logout", logoutUser);
router.post("/auth", authUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
