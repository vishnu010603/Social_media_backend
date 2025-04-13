import Post from "../models/posts.model.js";
import cloudinary from "../utils/cloudinary.utils.js";

export const createPost = async (req, res) => {
    try {
        const { text } = req.body;
        let imageUrl = "";

        if (req.file) {
            const upload = await cloudinary.uploader.upload(req.file.path);
            imageUrl = upload.secure_url;
        }

        const post = await Post.create({
            text,
            image: imageUrl,
            createdBy: req.user.id,
        });

        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("createdBy", "name profilePic")
            .lean();

        const count = await Post.countDocuments();

        res.json({ posts, totalPages: Math.ceil(count / limit), currentPage: page });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const { text } = req.body;
        post.text = text || post.text;

        if (req.file) {
            const upload = await cloudinary.uploader.upload(req.file.path);
            post.image = upload.secure_url;
        }

        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deletePost = async (req, res) => {
        const { postId } = req.query;

  if (!postId) {
    return res.status(400).json({ error: 'postId is required' });
  }

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);
    
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.likes.includes(req.user.id)) {
            post.likes = post.likes.filter(uid => uid.toString() !== req.user.id);
        } else {
            post.likes.push(req.user.id);
        }

        await post.save();
        res.json({ likes: post.likes.length });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
