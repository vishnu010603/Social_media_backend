import Comment from "../models/comments.model.js";

export const createComment = async (req, res) => {
    try {
        const { text, parentId } = req.body;
        const { postId } = req.params;

        const comment = await Comment.create({
            postId,
            userId: req.user.id,
            text,
            parentId: parentId || null,
        });

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ postId }).populate("userId", "name profilePic").lean();

        const map = {};
        comments.forEach(comment => {
            comment.replies = [];
            map[comment._id] = comment;
        });

        const nested = [];

        comments.forEach(comment => {
            if (comment.parentId) {
                map[comment.parentId]?.replies.push(comment);
            } else {
                nested.push(comment);
            }
        });

        res.json(nested);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: "Comment not found" });

        if (comment.userId.toString() !== req.user.id)
            return res.status(403).json({ message: "Unauthorized" });

        comment.text = req.body.text || comment.text;
        await comment.save();

        res.json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            console.error("Comment ID not provided");
            return res.status(400).json({ message: "Comment ID is required" });
        }

        const comment = await Comment.findById(id);
        if (!comment) {
            console.error("Comment not found");
            return res.status(404).json({ message: "Comment not found" });
        }

        if (comment.userId.toString() !== req.user.id) {
            console.error("Unauthorized deletion attempt by user:", req.user.id);
            return res.status(403).json({ message: "Unauthorized" });
        }

        // ✅ Delete child comments first
        await Comment.deleteMany({ parentId: comment._id });

        // ✅ Then delete the comment itself
        await Comment.findByIdAndDelete(comment._id);

        return res.json({ message: "Comment deleted" });
    } catch (err) {
        console.error("Error while deleting comment:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
