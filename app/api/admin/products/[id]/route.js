import { NextResponse } from "next/server";
import { updateProduct } from "@/lib/services/productService";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function PUT(req, { params }) {
  const check = await requireAdmin(req,  false);
    if (check instanceof NextResponse) return check;
  const body = await req.json();
  const decoded = await params;
  const id = decoded.id;

  await updateProduct(id,body);

  return NextResponse.json({ success: true });
}