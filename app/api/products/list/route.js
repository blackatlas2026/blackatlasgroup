import { NextResponse } from "next/server";
import { getProducts } from "@/lib/services/productService";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const pageSize = Number(searchParams.get("limit")) || 20;
  const cursor = searchParams.get("cursor"); // last doc id / cursor token
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  try {
    const result = await getProducts({
      limit: pageSize,
      cursor,
      category,
      search,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("Product list error:", err);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
