import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment,
} from "../controllers/comments.controller.js";

const router = express.Router();

router.post("/:postId", auth, createComment);
router.get("/:postId", auth, getCommentsByPost);
router.put("/:id", auth, updateComment);
router.delete("/:id", auth, deleteComment);

export default router;
