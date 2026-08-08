 // FILE: app/register/page.jsx

"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast from "../../components/Toast";
// import "../details-page/[id]/login/login.css";
import "../login/login.css";

export default function RegisterPage() {
  const { register, googleLogin, updateUserProfile } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await register(form.email, form.password);
      await updateUserProfile(form.name, form.photoURL);
      setToast({ message: "Registration successful!", type: "success" });
      setTimeout(() => router.push("/login"), 1000);
    } catch (err) {
      setError("Registration failed. Email may already be in use.");
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
          <h2>Create Account</h2>
          <p>Register to start booking</p>
        </div>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleRegister} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
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
            <label>Photo URL</label>
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={form.photoURL}
              onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Register</button>
        </form>

        <div className="auth-divider"><span>or</span></div>

        <button className="google-btn" onClick={handleGoogle}>
          <span>G</span>
          {/* <img src="/google-icon.png" alt="Google" width={20} /> */}
          Continue with Google
        </button>

        <p className="auth-switch">
          Already have an account? <Link href="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}