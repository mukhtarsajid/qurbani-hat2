 // FILE: components/Toast.jsx

"use client";

import { useEffect, useState } from "react";
import "./Toast.css";

export default function Toast({ message, type = "success", onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={`toast toast-${type} animate__animated animate__slideInRight`}>
      <span>{type === "success" ? "✅" : "❌"}</span>
      <span>{message}</span>
    </div>
  );
}