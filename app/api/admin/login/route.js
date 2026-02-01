import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

const ADMIN_EMAILS = [
  "shazilmohemmedkp@gmail.com",
  "admin2@gmail.com",
  "admin@blackatlas.com"
];

export async function POST(req) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 400 }
      );
    }

    // 🔍 Verify Firebase ID token
    const decoded = await adminAuth.verifyIdToken(idToken);

    console.log(decoded);

    // 🔒 Admin check
    if (!decoded.admin) {
      return NextResponse.json(
        { error: "Not authorized as admin" },
        { status: 403 }
      );
    }

    // 🍪 Create session cookie
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: 5 * 24 * 60 * 60 * 1000, // 5 days
    });

    // ✅ Create response
    const res = NextResponse.json({
      success: true,
      email: decoded.email,
    });

    // ✅ Set cookie on response (THIS IS THE FIX)
    res.cookies.set("admin_session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 5 * 24 * 60 * 60,
    });

    return res;
  } catch (err) {
    console.error("Admin login error:", err);

    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
