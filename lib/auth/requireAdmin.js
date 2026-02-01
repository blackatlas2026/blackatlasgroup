// lib/adminAuth.js
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";

// Throws / returns NextResponse if not admin
export async function requireAdmin(req, requireSuperadmin = false) {
  const sessionCookie = req.cookies.get("admin_session")?.value;

  if (!sessionCookie) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch (err) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  if (!decoded.admin) {
    return NextResponse.json({ error: "Not authorized as admin" }, { status: 403 });
  }

  if (requireSuperadmin && !decoded.superadmin) {
    return NextResponse.json({ error: "Not authorized as superadmin" }, { status: 403 });
  }

  return decoded; // return decoded claims if needed
}
