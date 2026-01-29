import Post from "../models/Post.js";

//@desc Get all posts
// export const getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// controllers/postController.js

export const getAllPosts = async (req, res) => {
  try {
    // If ?user= is passed, filter by user ID
    const filter = req.query.user ? { user: req.query.user } : {};

    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new post
// Create new post
// export const createPost = async (req, res) => {
//   try {
//     const { title, content, author, tags } = req.body;

//     // user info is attached by auth middleware
//     const newPost = new Post({
//       title,
//       content,
//       author,
//       tags,
//       user: req.user._id, // link post to logged-in user
//     });

//     const savedPost = await newPost.save();
//     res.status(201).json(savedPost);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


export const createPost = async (req, res) => {
  try {
    const userId = req.user?._id; // extracted from token
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { title, content, author, tags } = req.body;

    const newPost = new Post({
      title,
      content,
      author,
      tags,
      user: userId, // 🔥 attach logged-in user
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Get single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a post
// Update post
export const updatePost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if the logged-in user owns this post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this post" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.author = author || post.author;
    post.tags = tags || post.tags;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// @desc Delete a post
// Delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check ownership
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like or unlike a post
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user._id;

    // Check if user already liked
    if (post.likes.includes(userId)) {
      post.likes.pull(userId); // remove like
      await post.save();
      return res.json({ message: "Post unliked" });
    }

    post.likes.push(userId); // add like
    await post.save();
    res.json({ message: "Post liked" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};


