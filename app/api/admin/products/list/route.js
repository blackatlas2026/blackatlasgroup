import { NextResponse } from "next/server";
import { getProductsByAdmin } from "@/lib/services/productService";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function GET(req) {

  const admin = await requireAdmin(req);
    if (admin instanceof NextResponse) return admin;
  const adminId = admin.uid;

//   console.log(admin);

  const { searchParams } = new URL(req.url);

  const pageSize = Number(searchParams.get("limit")) || 20;
  const cursor = searchParams.get("cursor"); // last doc id / cursor token
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  try {
    const result = await getProductsByAdmin({
        user: admin,
      limit: pageSize,
      cursor,
      
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
