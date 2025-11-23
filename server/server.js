"use client";

import { useEffect, useState } from "react";
import Nav from "../../components/Nav";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function HealthPage() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHealth() {
      try {
        const res = await fetch(`${API}/healthz`);
        if (!res.ok) throw new Error("Server unreachable");

        const data = await res.json();
        setStatus(data);
      } catch (error) {
        setStatus({ ok: false, message: "Server unreachable" });
      } finally {
        setLoading(false);
      }
    }

    loadHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200">
      <Nav />

      <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg border">
        <h1 className="text-3xl font-extrabold text-green-700 mb-4">
          System Health
        </h1>

        {loading ? (
          <p className="text-gray-600 text-lg">Checking system status...</p>
        ) : status?.ok ? (
          <div className="p-5 bg-green-100 border border-green-300 rounded-xl">
            <p className="text-green-800 font-semibold text-xl">✔ API Online</p>
            <p className="text-gray-700 mt-1 text-sm">
              Version: <span className="font-bold">{status.version}</span>
            </p>
          </div>
        ) : (
          <div className="p-5 bg-red-100 border border-red-300 rounded-xl">
            <p className="text-red-700 font-semibold text-xl">❌ API Offline</p>
            <p className="text-gray-700 mt-1 text-sm">
              {status?.message || "Unable to reach the server"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
