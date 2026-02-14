import { NextResponse } from "next/server";
import { getAllBrands } from "@/lib/services/productService";

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