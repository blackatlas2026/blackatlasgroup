import { db } from "@/lib/firebase-admin";

/**
 * Fetch facet schema for a given brand + category
 * @param {string} brand
 * @param {string} category
 * @returns {object|null} facet schema or null if not found
 */
export async function getFacetSchema(brand,category) {
  if (!brand ) {
    throw new Error("brand and category are required");
  }

  const docId = `${brand.toLowerCase()}-${category.toLowerCase()}`;
  const snap = await db
    .collection("facetSchemas")
    .doc(docId)
    .get();

  if (!snap.exists) {
    return null;
  }

  return snap.data();
}
