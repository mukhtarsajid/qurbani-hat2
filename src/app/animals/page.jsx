 // FILE: app/animals/page.jsx

"use client";

import { useState, useEffect } from "react";
import AnimalCard from "../components/AnimalCard";
import "./animals.css";

export default function AnimalsPage() {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    fetch("/animals.json")
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      });
  }, []);

  const sorted = [...animals].sort((a, b) => {
    if (sortOrder === "low") return a.price - b.price;
    if (sortOrder === "high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="animals-page">
      <div className="animals-header">
        <h1>All Animals</h1>
        <p>Browse our full collection of Qurbani animals</p>
        <div className="sort-container">
          <label>Sort by Price:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="sort-select"
          >
            <option value="default">Default</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading animals...</p>
        </div>
      ) : (
        <div className="animals-grid">
          {sorted.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      )}
    </div>
  );
}