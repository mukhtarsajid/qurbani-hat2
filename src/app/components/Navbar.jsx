 // FILE: components/Navbar.jsx

// FILE: components/Navbar.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">
          🐄 <span>QurbaniHat</span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/animals">All Animals</Link></li>
      </ul>
      <div className="navbar-auth">
        {!mounted ? null : user ? (
          <div className="navbar-user">
            <Link href="/my-profile">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="avatar"
                className="navbar-avatar"
              />
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navbar-guest">
            <Link href="/login" className="login-btn">Login</Link>
            <Link href="/register" className="register-btn">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}