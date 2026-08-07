 // FILE: app/login/page.jsx

"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "../components/Toast";
import "./login.css";

export default function LoginPage() {
  const { login, googleLogin } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      setToast({ message: "Login successful!", type: "success" });
      setTimeout(() => router.push("/"), 1000);
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      router.push("/");
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="auth-card animate__animated animate__fadeInUp">
        <div className="auth-header">
          <h1>🐄 QurbaniHat</h1>
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button className="google-btn" onClick={handleGoogle}>
          <span>G</span>
          {/* <img src="/google-icon.png" alt="Google" width={20} /> */}
          Continue with Google
        </button>

        <p className="auth-switch">
          Don't have an account? <Link href="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}