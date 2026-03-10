import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import {
  getAllAdmins,
  createAdmin,
  removeAdminRole,
  deleteAdminUser,
} from "@/lib/services/adminServices";

export async function GET(req) {
  const decoded = await requireAdmin(req, true);
  if (decoded instanceof NextResponse) return decoded;

  try {
    const admins = await getAllAdmins();
    return NextResponse.json({ admins });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch admins" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const decoded = await requireAdmin(req, true);
  if (decoded instanceof NextResponse) return decoded;

  try {
    const body = await req.json();
    const admin = await createAdmin(body);

    return NextResponse.json({ success: true, admin });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}

export async function DELETE(req) {
  const decoded = await requireAdmin(req, true);
  if (decoded instanceof NextResponse) return decoded;

  try {
    const { uid } = await req.json();
    await deleteAdminUser(uid);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
