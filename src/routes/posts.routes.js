import express from "express";
import auth from "../middlewares/auth.middleware.js";
import upload from "../utils/multer.utils.js";
import {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    likePost
} from "../controllers/posts.controller.js";

const router = express.Router();

router.post("/", auth, upload.single("image"), createPost);
router.get("/", auth, getPosts);
router.put("/:id", auth, upload.single("image"), updatePost);
router.delete("/:id", auth, deletePost);
router.put("/:id/like", auth, likePost);

export default router;
