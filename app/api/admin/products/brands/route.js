import { NextResponse } from "next/server";
import { getAllBrands } from "@/lib/services/productService";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { createBrand } from "@/lib/services/productService";




export async function GET() {
  try {
    const brands = await getAllBrands();
    return NextResponse.json(brands);
  } catch (err) {
    console.error("GET /brands failed", err);
    return NextResponse.json(
      { error: "Failed to fetch brands" },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    // 🔐 Protect route
    const auth = await requireAdmin(req);
    if (auth instanceof NextResponse) return auth;

    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Brand name is required" },
        { status: 400 }
      );
    }

    const brand = await createBrand(body);

    return NextResponse.json(brand, { status: 201 });
  } catch (error) {
    console.error("Create brand error:", error);
    return NextResponse.json(
      { error: "Failed to create brand" },
      { status: 500 }
    );
  }
}