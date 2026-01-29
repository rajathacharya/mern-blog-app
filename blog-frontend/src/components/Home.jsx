import { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    tags: "",
  });

  useEffect(() => {
    if (token) fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data.posts || res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const createPost = async () => {
    await API.post("/posts", {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()),
    });
    fetchPosts();
    setForm({ title: "", content: "", author: "", tags: "" });
  };

  if (!token)
    return (
      <div className="login-reminder">
        <h2>Welcome to BlogSpace 📰</h2>
        <p>Please log in or sign up to continue.</p>
      </div>
    );

  return (
    <div className="content">
      <h2>All Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="post-grid">
          {posts.map((p) => (
            <div key={p._id} className="post-card">
              <h3>{p.title}</h3>
              <p>{p.content.slice(0, 100)}...</p>
              <div className="post-meta">
                <span>{p.author}</span>
                <button className="like-btn">❤️ {p.likes?.length || 0}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
