import express from "express";

import { protect } from "../middleware/auth.js";

import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const postRoutes = (io) => {
  const router = express.Router();

  // Create Post + Emit Socket Event
  router.post("/", protect, (req, res, next) => {
    createPost(req, res, next, io);
  });

  // Get All Posts
  router.get("/", protect, getPosts);

  // Get Single Post
  router.get("/:id", protect, getPostById);

  // Update Post
  router.put("/:id", protect, updatePost);

  // Delete Post
  router.delete("/:id", protect, deletePost);

  return router;
};

export default postRoutes;