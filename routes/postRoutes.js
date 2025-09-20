import express from "express";
import {
  createPost,
  getPosts,
  toggleLike,
  addComment,
  sharePost,
} from "../controllers/postController.js";
import { userAuth } from "../middleware/userAuth.js";

const router = express.Router();

router.post("/", userAuth, createPost);
router.get("/", getPosts);
router.patch("/:id/like", userAuth, toggleLike);
router.post("/:id/comment", userAuth, addComment);
router.patch("/:id/share", userAuth, sharePost);

export default router;
