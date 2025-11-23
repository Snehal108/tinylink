"use client";
import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700";

  return (
    <div className={`${bg} fixed bottom-6 right-6 px-4 py-3 rounded shadow-lg`}>
      {message}
    </div>
  );
}
