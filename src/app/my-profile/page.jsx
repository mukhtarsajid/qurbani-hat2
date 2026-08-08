 // FILE: app/my-profile/page.jsx

"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import "./profile.css";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading || !user) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card animate__animated animate__fadeInUp">
        <div className="profile-avatar-wrapper">
          <img
            src={user.photoURL || "/default-avatar.png"}
            alt="Profile"
            className="profile-avatar"
            onError={(e) => (e.target.src = "/default-avatar.png")}
          />
        </div>
        <h1 className="profile-name">{user.displayName || "User"}</h1>
        <p className="profile-email">{user.email}</p>

        <div className="profile-info">
          <div className="profile-info-item">
            <span className="info-label">Name</span>
            <span className="info-value">{user.displayName || "Not set"}</span>
          </div>
          <div className="profile-info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="profile-info-item">
            <span className="info-label">Account Created</span>
            <span className="info-value">
              {new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <Link href="/my-profile/update" className="update-btn">
          Update Profile
        </Link>
      </div>
    </div>
  );
}