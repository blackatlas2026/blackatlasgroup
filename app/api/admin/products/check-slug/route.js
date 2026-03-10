import { NextResponse } from "next/server";
import { checkSlugAvailability } from "@/lib/services/productService";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { available: false },
      { status: 400 }
    );
  }

  const available = await checkSlugAvailability(slug);

  return NextResponse.json({ available });
}
