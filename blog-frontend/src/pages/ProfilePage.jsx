import { useEffect, useState, useContext } from "react";
import API from "../api";
import "./ProfilePage.css";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {

  const { user, token, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log(user);
    if (!user || !token) return;

    const fetchUserPosts = async () => {
      try {
        console.log("Fetching posts for user:", user._id);
        const res = await API.get(`/posts?user=${user._id}`);
        console.log("Fetched posts:", res.data);
        setPosts(res.data.posts || res.data);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    fetchUserPosts();
  }, [user, token]);

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await API.delete(`/posts/${id}`);
    setPosts(posts.filter((p) => p._id !== id));
  };

  const editPost = async (id) => {
    const newTitle = prompt("Enter new title:");
    const newContent = prompt("Enter new content:");
    if (!newTitle || !newContent) return;
    await API.put(`/posts/${id}`, { title: newTitle, content: newContent });
    setPosts(posts.map((p) => (p._id === id ? { ...p, title: newTitle, content: newContent } : p)));
  };

  const createPost = async () => {
    const title = prompt("Post title:");
    const content = prompt("Post content:");
    if (!title || !content) return;
    await API.post("/posts", { title, content, author: user.username });
    const res = await API.get(`/posts?user=${user._id}`);
    setPosts(res.data.posts || res.data);
  };

  // Redirect if not logged in
  if (!user || !token) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="container">
      {/* <Navbar token={token} onLogout={logout} user={user} /> */}

      <div className="profile-header">
        <h2>{user.username}'s Posts</h2>
        <button className="create-btn" onClick={createPost}>
          + New Post
        </button>
      </div>

      <div className="post-grid">
        {posts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          posts.map((p) => (
            <div key={p._id} className="post-card">
              <h3>{p.title}</h3>
              <p>{p.content}</p>
              <div className="post-actions">
                <button onClick={() => editPost(p._id)}>✏️ Edit</button>
                <button onClick={() => deletePost(p._id)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
