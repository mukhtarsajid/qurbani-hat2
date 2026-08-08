 // FILE: app/details-page/[id]/page.jsx

"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import Toast from "../../../components/Toast";
import "./details.css";

export default function DetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [animal, setAnimal] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetch("/animals.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((a) => a.id === parseInt(id));
        if (!found) router.push("/not-found");
        else setAnimal(found);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    setToast({ message: "Booking successful! We will contact you soon.", type: "success" });
    setForm({ name: "", email: "", phone: "", address: "" });
  };

  if (!animal) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="details-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="details-container">
        {/* Left - Animal Info */}
        <div className="details-left">
          <img
            src={animal.image}
            alt={animal.name}
            className="details-img"
            onError={(e) => (e.target.src = "/placeholder-animal.jpg")}
          />
          <div className="details-info">
            <span className="details-category">{animal.category}</span>
            <h1 className="details-name">{animal.name}</h1>
            <p className="details-description">{animal.description}</p>
            <div className="details-specs">
              <div className="spec-item">
                <span className="spec-label">Type</span>
                <span className="spec-value">{animal.type}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Breed</span>
                <span className="spec-value">{animal.breed}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Weight</span>
                <span className="spec-value">{animal.weight} kg</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Age</span>
                <span className="spec-value">{animal.age} years</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Location</span>
                <span className="spec-value">{animal.location}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Price</span>
                <span className="spec-value spec-price">
                  ৳ {animal.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Booking Form */}
        <div className="details-right">
          <div className="booking-card">
            <h2>Book This Animal</h2>
            {!user && (
              <p className="login-warning">
                ⚠️ Please{" "}
                <a href="/login">login</a> to book this animal.
              </p>
            )}
            <form onSubmit={handleSubmit} className="booking-form">
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
                <label>Phone</label>
                <input
                  type="tel"
                  placeholder="+880 1700-000000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  placeholder="Your delivery address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="book-btn"
                disabled={!user}
              >
                {user ? "Confirm Booking" : "Login to Book"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}