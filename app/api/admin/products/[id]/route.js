import { NextResponse } from "next/server";
import { updateProduct,deleteProduct } from "@/lib/services/productService";
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

export async function DELETE(req, { params }) {
  const check = await requireAdmin(req, false);
  if (check instanceof NextResponse) return check;

  try {
    const { id } = await params;

    await deleteProduct(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE error:", err);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}