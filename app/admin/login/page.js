"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
	 // Debug: check if function runs
  console.log("Form submitted");

  // Debug: show current username/password values
  console.log("Username:", username);
  console.log("Password:", password);
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
		credentials: "include",
      });

      const data = await res.json();
 // Debug: show API response
    console.log("API Response:", data, res.status);
      if (res.ok) {
  // Optional short delay
  console.log("Login successful, redirecting...");
      router.push("/admin/dashboard");
} else {
	console.log("Login failed");
  setError(data.message || "Incorrect username or password");
}
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#42B3A5]">Enviol Polytech Solutions</h1>
          <p className="text-base font-semibold text-gray-600 mt-2">ERP</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#42B3A5]"
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#42B3A5]"
              autoComplete="current-password"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#42B3A5] hover:opacity-90 text-white font-semibold py-3 rounded-md transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}