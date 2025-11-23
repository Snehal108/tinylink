
"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function HealthPage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const res = await fetch(`${API}/healthz`);
        if (!res.ok) throw new Error("Failed to fetch health");
        const data = await res.json();
        setStatus(data);
      } catch (err) {
        setError(err.message || "Error fetching health");
      } finally {
        setLoading(false);
      }
    };
    fetchHealth();
  }, []);

  if (loading) return <div className="p-8 text-center text-gray-500">Loading Health Status...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button
          onClick={() => window.location.href = "/"}
          className="mb-6 px-4 py-2 bg-green-700 text-white rounded shadow hover:bg-purple-800 transition"
        >
          &larr; Back to Dashboard
        </button>

        <h2 className="text-3xl font-bold mb-6 text-green-800">Health Status</h2>
        <div className="bg-white p-6 rounded-xl shadow border">
          <p className="text-lg font-semibold">OK: {status.ok ? "✅ Healthy" : "❌ Unhealthy"}</p>
          <p className="mt-2 text-gray-700">Version: {status.version}</p>
        </div>
      </div>
    </div>
  );
}
