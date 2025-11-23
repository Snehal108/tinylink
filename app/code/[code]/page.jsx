
"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

export default function StatsPage({ params }) {
  const { code } = use(params); // unwrap params Promise

  const [link, setLink] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!code) return;

    fetch(`${API}/api/links/${code}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.error) setError("Link not found");
        else setLink(data);
      })
      .catch(() => setError("Failed to load stats"))
      .finally(() => setLoading(false));
  }, [code]);

  // ---------- LOADING UI ----------
  if (loading)
    return (
      <div className="min-h-screen bg-indigo-50 flex justify-center items-center">
        <div className="text-indigo-600 text-xl animate-pulse">
          Loading analytics...
        </div>
      </div>
    );

  // ---------- ERROR UI ----------
  if (error)
    return (
      <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3">
          Link Stats
        </h2>
        <p className="text-red-600 text-lg">{error}</p>

         <button
  onClick={() => (window.location.href = "/")}
  className="mt-6 px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-purple-700 transition-colors"
>
  Back to Dashboard
</button>

      </div>
    );

  // ---------- MAIN PAGE ----------
  return (
    <div className="min-h-screen bg-indigo-50 px-6 py-10">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-10">
      
        <button
  onClick={() => (window.location.href = "/")}
  className="mt-6 px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-purple-700 transition-colors"
>
  Back to Dashboard
</button>


        <h1 className="text-3xl font-bold text-gray-900 mt-5">
          Link Analytics
        </h1>
        <p className="text-gray-600 mt-1">
          Tracking insights for your shortened URL
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-10">
        {/* URL Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Shortened URL
          </h2>

          <div className="bg-indigo-50 px-4 py-3 rounded-lg font-mono text-sm text-indigo-700 mt-3 break-all border border-indigo-100">
            {typeof window !== "undefined"
              ? `${window.location.origin}/${link.code}`
              : `/${link.code}`}
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mt-8">
            Destination URL
          </h2>

          <a
            href={link.targetUrl}
            target="_blank"
            className="block bg-indigo-50 px-4 py-3 rounded-lg mt-3 text-indigo-700 break-words border border-indigo-100 hover:bg-indigo-100 transition"
          >
            {link.targetUrl}
          </a>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <p className="text-gray-600 text-sm">Total Clicks</p>
            <h3 className="text-3xl font-bold text-indigo-700 mt-2">
              {link.totalClicks}
            </h3>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <p className="text-gray-600 text-sm">Created At</p>
            <h3 className="text-lg font-medium text-gray-800 mt-2">
              {new Date(link.createdAt).toLocaleString()}
            </h3>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <p className="text-gray-600 text-sm">Last Clicked</p>
            <h3 className="text-lg font-medium text-gray-800 mt-2">
              {link.lastClicked
                ? new Date(link.lastClicked).toLocaleString()
                : "Never"}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
