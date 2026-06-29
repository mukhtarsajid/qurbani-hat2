 // FILE: app/my-profile/update/page.jsx

"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import Toast from "../../components/Toast";
import "./update.css";

export default function UpdateProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });
  const [toast, setToast] = useState(null);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await updateUserProfile(form.name, form.photoURL);
      setToast({ message: "Profile updated successfully!", type: "success" });
      setTimeout(() => router.push("/my-profile"), 1500);
    } catch (err) {
      setError("Update failed. Please try again.");
    }
  };

  return (
    <div className="update-page">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="update-card animate__animated animate__fadeInUp">
        <h2>Update Profile</h2>
        <p>Change your name or profile photo</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleUpdate} className="auth-form">
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
            <label>Photo URL</label>
            <input
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={form.photoURL}
              onChange={(e) => setForm({ ...form, photoURL: e.target.value })}
            />
          </div>
          <button type="submit" className="auth-btn">Update Information</button>
        </form>
      </div>
    </div>
  );
}