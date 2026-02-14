import { NextResponse } from "next/server";
import { getFacetSchema } from "@/lib/services/facetServices";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");

  if (!brand || !category) {
    return NextResponse.json(
      { error: "Missing params" },
      { status: 400 }
    );
  }

  const schema = await getFacetSchema(brand, category);

  if (!schema) {
    return NextResponse.json(
      { exists: false },
      { status: 404 }
    );
  }

  return NextResponse.json(schema);
}
