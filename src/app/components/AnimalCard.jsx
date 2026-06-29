 // FILE: components/AnimalCard.jsx
"use client";
import Link from "next/link";
import "./AnimalCard.css";

export default function AnimalCard({ animal }) {
  return (
    <div className="animal-card animate__animated animate__fadeInUp">
      <div className="card-img-wrapper">
        <img
          src={animal?.image}
          alt={animal?.name}
          className="card-img"
          onError={(e) => (e.target.src = "/placeholder-animal.jpg")}
        />
        <span className="card-category">{animal?.category}</span>
      </div>
      <div className="card-body">
        <h3 className="card-name">{animal?.name}</h3>
        <p className="card-breed">
          {animal?.type} • {animal?.breed}
        </p>
        <div className="card-info">
          <span>⚖️ {animal?.weight} kg</span>
          <span>📍 {animal?.location}</span>
        </div>
        <div className="card-footer">
          <span className="card-price">৳ {animal?.price.toLocaleString()}</span>
          <Link href={`/details-page/${animal?.id}`} className="details-btn">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}