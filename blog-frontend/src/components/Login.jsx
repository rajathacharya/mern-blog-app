// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api";

// export default function Login({ setToken, setUser }) {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await API.post("/auth/login", form);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       setToken(res.data.token);
//       setUser(res.data.user);
//       navigate("/");
//     } catch {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Log in to BlogSpace</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={form.password}
//         onChange={(e) => setForm({ ...form, password: e.target.value })}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }


import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setToken, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);

      // ✅ Backend already sends _id, username, email, token
      const userData = {
        _id: res.data._id,
        username: res.data.username,
        email: res.data.email,
      };


      // ✅ Store both token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      // ✅ Update context
      setToken(res.data.token);
      setUser(userData);

      // Redirect to home
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <h2>Log in to BlogSpace</h2>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
