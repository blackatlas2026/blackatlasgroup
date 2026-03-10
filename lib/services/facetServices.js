import { db } from "@/lib/firebase-admin";
import { slugify } from "@/lib/slugify";

/**
 * Format brand + category into document ID
 */
function formatDocId(brand, category) {
  if (!brand || !category) {
    throw new Error("Brand and category are required");
  }

  const formattedBrand = slugify(brand);
  const formattedCategory = slugify(category);

  return `${formattedBrand}-${formattedCategory}`;
}

/**
 * Get Facet Schema
 */
export async function getFacetSchema(brand, category) {
  const docId = formatDocId(brand, category);

  const snap = await db.collection("facetSchemas").doc(docId).get();

  if (!snap.exists) {
    return null;
  }

  return snap.data();
}

/**
 * Create or Update Facet Schema (UPSERT)
 */
export async function upsertFacetSchema(brand, category, facets) {
  const docId = formatDocId(brand, category);

  await db.collection("facetSchemas").doc(docId).set(
    {
      brand,
      category,
      facets,
      updatedAt: new Date(),
    },
    { merge: true }
  );

  return { success: true };
}

/**
 * Delete Facet Schema
 */
export async function deleteFacetSchema(brand, category) {
  const docId = formatDocId(brand, category);

  await db.collection("facetSchemas").doc(docId).delete();

  return { success: true };
}
