import Post from "../model/postModel.js";
import User from "../model/userModel.js"; // чтобы брать username и avatar

// создать пост
export const createPost = async (req, res) => {
  try {
    const { text, photo } = req.body;

    // достаём юзера из базы
    const user = await User.findById(req.body.userId).select("username avatar");
    if (!user) return res.status(404).json({ error: "User not found" });

    const newPost = new Post({
      author: {
        id: req.body.userId,
        username: user.username,
        avatar: user.avatar,
      },
      title,
      text,
      photo,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// получить все посты
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// лайк/анлайк
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const userId = req.body.userId;
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// добавить комментарий
export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push({
      user: req.body.userId,
      text: req.body.text,
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// поделиться
export const sharePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.shares += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
