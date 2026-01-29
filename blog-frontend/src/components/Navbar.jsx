import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar({ onLogout }) {
  const { token, user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="/" className="nav-logo">📝 Blog Platform</a>
      </div>

      <div className="nav-right">
        {!token ? (
          <>
            <a href="/login" className="nav-link">Login</a>
            <a href="/signup" className="nav-link">Register</a>
          </>
        ) : (
          <div className="profile-section" ref={dropdownRef}>
            <button className="profile-button" onClick={() => setOpen(!open)}>
              <div className="user-avatar">
                {user?.username?.[0]?.toUpperCase() || "?"}
              </div>
              <span className="username-label">{user?.username}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="white"
                viewBox="0 0 24 24"
                className={`arrow ${open ? "rotate" : ""}`}
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </button>

            <div className={`dropdown ${open ? "show" : ""}`}>
              <a href="/profile" className="dropdown-item">Profile</a>
              <button className="dropdown-item logout" onClick={onLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
