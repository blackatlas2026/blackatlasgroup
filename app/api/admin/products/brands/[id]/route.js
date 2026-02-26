import { NextResponse } from "next/server";
import { updateBrand,deactivateBrand } from "@/lib/services/productService";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function PUT(req, { params }) {
  try {
    // 🔐 Protect route
    const auth = await requireAdmin(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = params;
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Brand ID is required" },
        { status: 400 }
      );
    }

    const updatedBrand = await updateBrand(id, body);

    return NextResponse.json(updatedBrand);
  } catch (error) {
    console.error("Update brand error:", error);
    return NextResponse.json(
      { error: "Failed to update brand" },
      { status: 500 }
    );
  }
}




export async function DELETE(req, { params }) {
  try {
    const auth = await requireAdmin(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = params;

    await deactivateBrand(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete brand error:", error);
    return NextResponse.json(
      { error: "Failed to delete brand" },
      { status: 500 }
    );
  }
}