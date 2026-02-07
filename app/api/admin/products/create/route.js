import { NextResponse } from "next/server";
import { createProduct } from "@/lib/services/productService";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function POST(req) {
  // 🔐 Admin guard
  const admin = await requireAdmin(req);
  if (admin instanceof NextResponse) return admin;

  const body = await req.json();

  const {
    slug,
    brand,
    category,
    name,
    description,
    price,
    inStock,

    images,             // { main, gallery }
    variantAttributes,  // []
    externalLinks,      // []
  } = body;

  /* ----------------------------
     Basic validation
  ----------------------------- */
  if (!slug || !name || price == null) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!images?.main) {
    return NextResponse.json(
      { error: "Main product image is required" },
      { status: 400 }
    );
  }

  /* ----------------------------
     Normalize / sanitize
  ----------------------------- */
const normalizedProduct = {
  slug: String(slug).trim(),
  brand: brand?.trim() || null,
  category: category?.trim() || null,
  name: String(name).trim(),
  description: description?.trim() || "",
  price: Number(price),
  inStock: Boolean(inStock),

  images: {
    main: images?.main || null,
    gallery: Array.isArray(images?.gallery) ? images.gallery : [],
  },

  variantAttributes: Array.isArray(variantAttributes)
    ? variantAttributes.map(attr => ({
        key: String(attr.key).trim(),
        label: String(attr.label).trim(),
        type: attr.type || "select",
        options: Array.isArray(attr.options)
          ? attr.options.map(o => String(o).trim())
          : [],
      }))
    : [],

  externalLinks: Array.isArray(externalLinks)
    ? externalLinks.map(link => {
        const rawUrl = String(link.url || "").trim();

        return {
          platform: String(link.platform || "").trim(),
          url: rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
            ? rawUrl
            : `https://${rawUrl}`,
        };
      })
    : [],

  // 🧾 Audit fields
  createdBy: admin.uid,
  createdByEmail: admin.email,
  createdAt: new Date(),
};



  /* ----------------------------
     Persist
  ----------------------------- */
  await createProduct(normalizedProduct);

  return NextResponse.json({ success: true });
}
