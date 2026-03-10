"use client";

import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      // Force full reload so middleware runs again
      window.location.href = "/admin/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50">

      {/* Header */}
      <header className="bg-[#42B3A5] text-white px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">ENVIOL Admin Panel</h1>
          <p className="text-sm opacity-90">
            Enviol Polytech Solutions
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white text-[#42B3A5] px-4 py-2 rounded font-semibold hover:opacity-90 transition"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="p-8">
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-[#42B3A5] mb-4">
            Welcome, Admin 👋
          </h2>

          <p className="text-gray-600">
            This is your dashboard.
          </p>
        </div>
      </main>

    </div>
  );
}