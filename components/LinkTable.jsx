
"use client";

import React from "react";

export default function LinkTable({ links = [], onDelete }) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 
    (typeof window !== "undefined" ? window.location.origin : "");

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard");
    } catch {
      alert("Copy failed");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="text-left">
            <th className="px-3 py-2 text-sm font-medium text-gray-700">Code</th>
            <th className="px-3 py-2 text-sm font-medium text-gray-700">Target URL</th>
            <th className="px-3 py-2 text-sm font-medium text-gray-700">Clicks</th>
            <th className="px-3 py-2 text-sm font-medium text-gray-700">Last Clicked</th>
            <th className="px-3 py-2 text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {links.map((l) => (
            <tr key={l._id}>
              <td className="px-3 py-3 text-sm font-medium text-gray-900">{l.code}</td>

              <td className="px-3 py-3 text-sm text-gray-700 w-96">
                <div className="truncate-ellipsis" title={l.targetUrl}>{l.targetUrl}</div>
              </td>

              <td className="px-3 py-3 text-sm">{l.totalClicks}</td>

              <td className="px-3 py-3 text-sm">
                {l.lastClicked ? new Date(l.lastClicked).toLocaleString() : "—"}
              </td>

              <td className="px-3 py-3 text-sm">
                <div className="flex items-center gap-2">

                  {/* ✔ Stats Page */}
                  <a
                    href={`/code/${l.code}`}
                    className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200"
                  >
                    Open
                  </a>

                  {/* Copy */}
                  <button
                    onClick={() => handleCopy(`${base}/${l.code}`)}
                    className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200"
                  >
                    Copy
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onDelete(l.code)}
                    className="px-2 py-1 text-sm rounded bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    Delete
                  </button>

                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
