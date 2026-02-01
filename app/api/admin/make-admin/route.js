import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function POST(req) {
  // ❌ HARD STOP in production
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Disabled in production" },
      { status: 403 }
    );
  }

  const adminCheck = await requireAdmin(req, true);
  if (adminCheck instanceof NextResponse) {
    return adminCheck; // not authorized
  }

  const { uid, superadmin } = await req.json();



  if (!uid) {
    return NextResponse.json(
      { error: "UID required" },
      { status: 400 }
    );
  }

  // ✅ Assign claims
  await adminAuth.setCustomUserClaims(uid, {
    admin: true,
    superadmin: Boolean(superadmin),
  });

  return NextResponse.json({
    success: true,
    admin: true,
    superadmin: Boolean(superadmin),
  });
}
