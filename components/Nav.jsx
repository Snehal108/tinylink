
"use client";

export default function Nav() {
  return (
    <header className="bg-blue-100 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900" style={{ fontFamily: "Times New Roman, serif" }}>
          TinyLink
        </h1>

        <nav className="flex gap-6 text-lg font-semibold">
          <a href="/" className="text-blue-700 hover:text-blue-900 transition-colors">
            Dashboard
          </a>
          <a href="/healthz" className="text-blue-700 hover:text-blue-900 transition-colors">
            Health
          </a>
        </nav>
      </div>
    </header>
  );
}
