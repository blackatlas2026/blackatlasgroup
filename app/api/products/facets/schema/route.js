import {
  getFacetSchema,
  upsertFacetSchema,
  deleteFacetSchema,
} from "@/lib/services/facetServices";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/requireAdmin";

/**
 * GET → Fetch Schema
 * /api/facet-schema?brand=apple&category=electronics
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");

    if (!brand || !category) {
      return NextResponse.json(
        { error: "Brand and category required" },
        { status: 400 }
      );
    }

    const schema = await getFacetSchema(brand, category);

    return NextResponse.json(schema || null);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch schema" },
      { status: 500 }
    );
  }
}

/**
 * POST → Create / Update Schema
 */
export async function POST(req) {
  try {
     const auth = await requireAdmin(req);
      if (auth instanceof NextResponse) return auth;

    const body = await req.json();
    const { brand, category, facets } = body;

    if (!brand || !category || !facets) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await upsertFacetSchema(brand, category, facets);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save schema" },
      { status: 500 }
    );
  }
}

/**
 * DELETE → Remove Schema
 */
export async function DELETE(req) {
  try {
     const auth = await requireAdmin(req);
        if (auth instanceof NextResponse) return auth;

    const { searchParams } = new URL(req.url);
    const brand = searchParams.get("brand");
    const category = searchParams.get("category");

    if (!brand || !category) {
      return NextResponse.json(
        { error: "Brand and category required" },
        { status: 400 }
      );
    }

    await deleteFacetSchema(brand, category);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to delete schema" },
      { status: 500 }
    );
  }
}