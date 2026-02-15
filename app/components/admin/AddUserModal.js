"use client";

import { useState } from "react";

export default function AddUserModal({ isOpen, onClose, onSuccess }) {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [superadmin, setSuperadmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/superadmin/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          displayName,
          superadmin,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Reset form
      setDisplayName("");
      setEmail("");
      setPassword("");
      setSuperadmin(false);

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-background-dark rounded-xl shadow-2xl border border-gray-100 dark:border-orange-400/20 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-orange-400/10">
          <h3 className="text-2xl font-bold">Create New Admin</h3>
          <button onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">

          {/* Display Name */}
          <div className="space-y-2">
            <label className="block text-sm font-bold">Full Name</label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-orange-400/5 border rounded-lg"
              placeholder="e.g. John Doe"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-bold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-orange-400/5 border rounded-lg"
              placeholder="john@company.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-orange-400/5 border rounded-lg"
              placeholder="Enter temporary password"
            />
          </div>

          {/* Superadmin Toggle */}
          <div className="flex items-center justify-between bg-gray-50 dark:bg-orange-400/5 p-4 rounded-lg">
            <span className="text-sm font-medium">Make Superadmin</span>
            <input
              type="checkbox"
              checked={superadmin}
              onChange={(e) => setSuperadmin(e.target.checked)}
              className="h-4 w-4 accent-orange-400"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="pt-4 flex flex-col gap-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-400 text-white font-bold py-3 rounded-lg disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Admin"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="text-sm text-gray-500 hover:text-orange-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
