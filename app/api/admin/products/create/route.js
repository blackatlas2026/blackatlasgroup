import { NextResponse } from "next/server";
import { createProduct } from "@/lib/services/productService";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function POST(req) {
  //  Admin guard
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;

  const body = await req.json();

  const {
    slug,
    brand,
    category,
    name,
    description,
    price,
    inStock,
    images,
    colors,
    sizes,
    specs,
  } = body;

  if (!slug || !name || !price) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  await createProduct({
    slug,
    brand,
    category,
    name,
    description,
    price: Number(price),
    inStock: Boolean(inStock),
    images,
    colors,
    sizes,
    specs,

    // 🧾 AUDIT FIELDS
    createdBy: admin.uid,
    createdByEmail: admin.email,
  });

  return NextResponse.json({ success: true });
}
