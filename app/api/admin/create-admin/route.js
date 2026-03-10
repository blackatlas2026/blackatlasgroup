import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/auth/requireAdmin"; // helper to check superadmin


export async function POST(req) {
  // Superadmin check
  // const check = await requireAdmin(req,  true);
  // if (check instanceof NextResponse) return check;

  const { email, password, displayName, superadmin } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    // Create user with Admin SDK
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName,
    });

    // Set custom claims (admin role if applicable)
    await adminAuth.setCustomUserClaims(userRecord.uid, {
    admin: true,
    superadmin: superadmin,
  });

    return NextResponse.json({
      success: true,
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
      admin: true,
      superadmin: superadmin
    });
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create user" },
      { status: 500 }
    );
  }
}
