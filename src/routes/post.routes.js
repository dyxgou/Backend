import { Router } from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getPostById,
  updatePost,
  myPosts,
} from "../controllers/posts.controllers";

const router = Router();

router.post("/post/:id", createPost);

router.delete("/post/:id", deletePost);

router.put("/post/:id", updatePost);

router.get("/posts", getPosts);

router.get("/post/:id", getPostById);

router.get("/myposts/:id", myPosts);

export default router;
