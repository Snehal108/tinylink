
"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import AddLinkModal from "../components/AddLinkModal";
import LinkTable from "../components/LinkTable";
import EmptyState from "../components/EmptyState";
import "./globals.css";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function DashboardPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const loadLinks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/links`);
      if (!res.ok) throw new Error("Failed to load links");
      const data = await res.json();
      setLinks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load links");
      setLinks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const handleCreate = async (payload) => {
    setFormLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/links`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Server responded ${res.status}`);
      }

      await res.json();
      setShowModal(false);
      await loadLinks();
      setSuccessMessage("Link created successfully");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to create link");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (code) => {
    if (!confirm(`Delete link ${code}?`)) return;
    try {
      const res = await fetch(`${API}/api/links/${code}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Delete failed");
      }
      await loadLinks();
      setSuccessMessage("Link deleted");
      setTimeout(() => setSuccessMessage(""), 2500);
    } catch (err) {
      setError(err.message || "Failed to delete link");
    }
  };

  const filtered = links.filter((l) =>
    l.code.toLowerCase().includes(query.toLowerCase()) ||
    l.targetUrl.toLowerCase().includes(query.toLowerCase())
  );

  const isSearchEmpty = query.trim().length > 0 && filtered.length === 0;

  return (
    <div className="min-h-screen bg-green-100">
      <Nav />

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        <div className="flex items-center justify-between mb-6 bg-white p-5 rounded-xl shadow-md border">
          <div className="text-left">
            <h1 className="text-4xl font-extrabold text-blue-700 tracking-wide">
              TinyLink
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              Shorten links, track clicks, and manage URLs effortlessly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <input
                aria-label="Search links"
                placeholder="Search by code or URL..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-72 p-2 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            <button
  onClick={() => setShowModal(true)}
  className="px-5 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-purple-700 transition"
>
  + Create Link
</button>


          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-300">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-700 border border-green-300">
            {successMessage}
          </div>
        )}

        <div className="space-y-6">
          <section className="bg-white p-5 rounded-xl shadow-md border">
            <div className="flex items-center justify-between mb-3">
              {/* <h2 className="font-semibold text-xl text-blue-700">All Links</h2> */}

              <div className="sm:hidden">
                <input
                  aria-label="Search"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-48 p-2 border rounded-lg shadow-sm"
                />
              </div>
            </div>

            {loading ? (
              <div className="space-y-3 py-8">
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                <div className="h-48 bg-gray-100 rounded animate-pulse" />
              </div>
            ) : links.length === 0 ? (
              <EmptyState onCreate={() => setShowModal(true)} />
            ) : isSearchEmpty ? (
              <div className="text-center py-10 text-gray-600">
                <div className="text-2xl font-semibold mb-2">No Matching Links</div>
                <p className="text-gray-500">
                  No links found for "<span className="font-medium">{query}</span>"
                </p>
              </div>
            ) : (
              <LinkTable links={filtered} onDelete={handleDelete} />
            )}
          </section>
        </div>
      </main>

      <AddLinkModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreate}
        loading={formLoading}
      />
    </div>
  );
}
