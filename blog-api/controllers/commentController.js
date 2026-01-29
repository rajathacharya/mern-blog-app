import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// Add comment to post
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = await Comment.create({
      text,
      user: req.user._id,
      post: post._id,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all comments for a post
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
