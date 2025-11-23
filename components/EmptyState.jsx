

"use client";

export default function EmptyState({ onCreate }) {
  return (
    <div className="text-center py-12">
      <img src="/images/empty-state.png" alt="empty" className="mx-auto mb-6 w-40 h-40 object-contain" />
      <h3 className="text-lg font-semibold mb-2">Empty</h3>
      <p className="text-gray-600 mb-4">No links yet. Create your first short link to start tracking clicks and stats.</p>
      <div>
        <button onClick={onCreate} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-purple-600 transition">Create First Link</button>
      </div>
    </div>
  );
}
