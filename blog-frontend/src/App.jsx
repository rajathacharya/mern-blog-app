import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import API from "./api";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

export default function App({ page, pageType }) {
  const { token, setToken, user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      logout();
      navigate("/login");
    }
  };

  const renderPage = () => {
    if (pageType === "login") {
      return <Login setToken={setToken} setUser={setUser} />;
    }
    return page;
  };

  return (
    <div className="container">
      <Navbar token={token} onLogout={handleLogout} user={user} />
      <main>{renderPage()}</main>
    </div>
  );
}
