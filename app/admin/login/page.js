// app/admin/login/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleEmailSignIn(e) {
    e.preventDefault();
    setLoading(true);
    setError(''); // ✅ Clear previous errors

    try {
      // 🔐 Firebase Auth (identity)
      const userCred = await signInWithEmailAndPassword(auth, email, password);
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
      router.push("/admin");
    } catch (err) {
      console.error(err);
      // ✅ Set error message
      setError(err.message || "Invalid credentials or not an admin.");
      // Sign out on auth failure
      try {
        await auth.signOut();
      } catch (signOutErr) {
        console.error('Sign out error:', signOutErr);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="font-display bg-background-light min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-110">
        {/* Login Card */}
        <div className="bg-white shadow-xl border border-slate-200 rounded-xl overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-900">
                Welcome Back
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Please enter your credentials to access your dashboard.
              </p>
            </div>

            {/* ✅ Error Display */}
            {error && (
              <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form className="space-y-5" onSubmit={handleEmailSignIn}>
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">
                      mail
                    </span>
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-slate-900 placeholder:text-slate-400 text-sm transition-colors"
                    id="email"
                    name="email"
                    placeholder="admin@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">
                      lock
                    </span>
                  </div>
                  <input
                    className="block w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-slate-900 placeholder:text-slate-400 text-sm transition-colors"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-orange-500 hover:bg-orange-500/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>

         
         
        </div>
      </div>
    </main>
  );
}
