// app/api/products/[slug]/route.js
import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/services/productService";

export async function GET(req, { params }) {
  const { slug } = await params; // string directly, no await needed

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  try {
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
