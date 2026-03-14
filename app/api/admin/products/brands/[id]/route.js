import { NextResponse } from "next/server";
import { updateBrand,deactivateBrand,updateBrandStory,getBrandById, deleteBrand } from "@/lib/services/productService";
import { requireAdmin } from "@/lib/auth/requireAdmin";


export async function GET(request, { params }) {
  try {
    // 🔐 Protect route
  

    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'Brand ID required' }, { status: 400 });
    }

    const brand = await getBrandById(id);
    
    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }

    return NextResponse.json(brand);
  } catch (error) {
    console.error('Error fetching brand:', error);
    return NextResponse.json({ error: 'Failed to fetch brand' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    // 🔐 Protect route
    const auth = await requireAdmin(req);
    if (auth instanceof NextResponse) return auth;

    const { id } = await params;
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

    const { id } = await params;

 
    await deleteBrand(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete brand error:", error);
    return NextResponse.json(
      { error: "Failed to delete brand" },
      { status: 500 }
    );
  }
}



export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const data = await request.json();

    await updateBrandStory(id, data);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
