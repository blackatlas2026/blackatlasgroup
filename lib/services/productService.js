// lib/productService.js

// Example: You can swap Firebase with any DB later
import { db } from "@/lib/firebase-admin";


export async function getAllProducts() {
  const snapshot = await db.collection("products").get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}



export async function getAllBrands() {
  const snap = await db
    .collection("brands")
    .where("isActive", "==", true)
    .orderBy("createdAt", "asc")
    .get();

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}


export async function getProducts({
  limit = 20,
  cursor = null,
  category = null,
  search = null,
}) {
  let query = db
    .collection("products")
    .orderBy("createdAt", "desc")
    .limit(limit);

  if (cursor) {
    const cursorDoc = await db
      .collection("products")
      .doc(cursor)
      .get();

    if (cursorDoc.exists) {
      query = query.startAfter(cursorDoc);
    }
  }

  if (category) {
    query = query.where("category", "==", category);
  }

  // NOTE: Firestore doesn't support full text search
  // For now, this is a basic prefix match workaround
  if (search) {
    query = query
      .where("searchKeywords", "array-contains", search.toLowerCase());
  }

  const snapshot = await query.get();

  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  const lastDoc = snapshot.docs.at(-1);

  return {
    products,
    nextCursor: lastDoc ? lastDoc.id : null,
    hasMore: snapshot.size === limit,
  };
}


export async function createProduct(product) {
  const now = new Date();

  const docRef = db
    .collection("products")
    .doc(product.slug);

  await docRef.set({
    ...product,

    createdAt: now,
    updatedAt: now,

    // future-proof
    updatedBy: null,
    updatedByEmail: null,
  });

  return { id: docRef.id };
}


export async function updateProduct(id, data) {
  await db.collection("products").doc(id).update(data);
  return { id, ...data };
}

export async function deleteProduct(id) {
  await db.collection("products").doc(id).delete();
  return { id };
}


export async function getProductBySlug(slug) {
  if (!slug) return null;

  const docRef = db.collection("products").doc(slug);
  const doc = await docRef.get();

  if (!doc.exists) return null;

  return { id: doc.id, ...doc.data() };
}