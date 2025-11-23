
"use client";

import { useEffect, useState } from "react";

export default function AddLinkModal({ open, onClose, onCreate, loading }) {
  const [code, setCode] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setCode("");
      setUrl("");
      setError("");
    }
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[A-Za-z0-9]{6,8}$/.test(code)) {
      setError("Code must be 6–8 alphanumeric characters.");
      return;
    }

    try {
      new URL(url);
    } catch {
      setError("Enter a valid URL (include https://).");
      return;
    }

    await onCreate({ code, targetUrl: url });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white/95 rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Create Short Link</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-lg">✕</button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg border border-red-100 shadow-sm">{error}</div>}

          <label className="block">
            <div className="text-sm font-medium text-gray-600 mb-1">Short Code</div>
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="6–8 characters (e.g. abc123)" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400" disabled={loading} />
          </label>

          <label className="block">
            <div className="text-sm font-medium text-gray-600 mb-1">Target URL</div>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400" disabled={loading} />
          </label>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</button>
            <button type="submit" disabled={loading} className="px-5 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-purple-600 transition">
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
