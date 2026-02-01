// lib/productService.js

// Example: You can swap Firebase with any DB later
import { adminFirestore } from "@/firebase/admin"; // Firebase Admin SDK

export async function getAllProducts() {
  const snapshot = await adminFirestore.collection("products").get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function createProduct(data) {
  const ref = await adminFirestore.collection("products").add(data);
  return { id: ref.id, ...data };
}

export async function updateProduct(id, data) {
  await adminFirestore.collection("products").doc(id).update(data);
  return { id, ...data };
}

export async function deleteProduct(id) {
  await adminFirestore.collection("products").doc(id).delete();
  return { id };
}
