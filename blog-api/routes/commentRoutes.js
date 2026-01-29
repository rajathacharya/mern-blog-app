import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all comments for a post
router.get("/:id/comments", getComments);

// POST a comment to a post (protected)
router.post("/:id/comments", protect, addComment);

export default router;
