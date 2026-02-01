"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleEmailSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 🔐 Firebase Auth (identity)
      const userCred = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCred.user;

      // 🔑 Firebase ID token
      const idToken = await user.getIdToken();

      // 🔒 Send token to backend for admin verification
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!res.ok) {
        throw new Error("Not authorized as admin");
      }

      // ✅ Success
      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or not an admin.");
      await auth.signOut();
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleEmailSignIn}
        className="w-full max-w-sm bg-white rounded-xl shadow-md p-6"
      >
        <h1 className="text-2xl font-semibold text-center mb-6">
          Admin Sign In
        </h1>

        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded-lg py-2 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {error && (
          <p className="text-red-600 text-sm text-center mt-4">
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
