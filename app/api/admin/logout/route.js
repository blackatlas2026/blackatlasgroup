import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req) {
  try {
    const sessionCookie = req.cookies.get("admin_session")?.value;

    if (sessionCookie) {
      // 🔍 Verify session cookie
      const decoded = await adminAuth.verifySessionCookie(
        sessionCookie,
        true
      );

      // 🔒 Revoke refresh tokens (forces full logout everywhere)
      await adminAuth.revokeRefreshTokens(decoded.uid);
    }

    const res = NextResponse.json({ success: true });

    // 🍪 Clear cookie
    res.cookies.set("admin_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // immediately expire
    });

    return res;
  } catch (err) {
    console.error("Admin logout error:", err);

    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}
