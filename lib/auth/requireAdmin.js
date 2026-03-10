// lib/adminAuth.js
import { NextResponse } from "next/server";
import { redirect } from 'next/navigation';
import { adminAuth } from "@/lib/firebase-admin";
import { auth } from "@/lib/firebase-client";
import { cookies } from "next/headers";


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








/**
 * 🔐 For Server Components (pages / layouts)
 */
export async function requireAdminPage(requireSuperadmin = false) {
  const cookieStore = await cookies(); // Next 15 requires await
  const sessionCookie = cookieStore.get("admin_session")?.value;

  let redirectPath = null;
  let decoded = null;

  if (!sessionCookie) {
    redirectPath = "/admin/login";
  }

  try {
    if (!redirectPath) {
      decoded = await adminAuth.verifySessionCookie(sessionCookie, true);

      if (!decoded.admin) {
        redirectPath = "/admin/login";
      }
        
      if (requireSuperadmin && !decoded.superadmin) {
        redirectPath = "/admin/";
      }
    }
  } catch (err) {
    console.log(err);
    redirectPath = "/admin/login";
  }

  if (redirectPath) {
    redirect(redirectPath);
  }

  return decoded;
}




export async function getAdminRole() {
  const user = auth.currentUser;

  if (!user) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      isSuperadmin: false,
    };
  }

  const tokenResult = await user.getIdTokenResult(true);

  return {
    isAuthenticated: true,
    isAdmin: tokenResult.claims.admin === true,
    isSuperadmin: tokenResult.claims.superadmin === true,
  };
}
