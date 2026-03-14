// lib/productService.js

// Example: You can swap Firebase with any DB later
import { db } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { use } from "react";


export async function getFeaturedProducts() {
  const snapshot = await db.collection("products").where("featuredProducts","==",true).get();
  return snapshot.docs.map(doc => {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,

    createdAt: data.createdAt?.toDate()?.toISOString() || null,
    updatedAt: data.updatedAt?.toDate()?.toISOString() || null,
  };
});
}

export async function checkSlugAvailability(slug) {
  if (!slug) return false;

  const snapshot = await db
    .collection("products")
    .where("slug", "==", slug)
    .limit(1)
    .get();

  return snapshot.empty;
}



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

export async function getBrandById(brandId) {
  try {
    const brandRef = db.collection('brands').doc(brandId);
    const brandSnap = await brandRef.get();
    
    if (!brandSnap.exists) {
      return null; // or throw new Error('Brand not found')
    }
    
    return {
      id: brandSnap.id,
      ...brandSnap.data(),
    };
  } catch (error) {
    console.error('Error getting brand:', error);
    throw error;
  }
}


export async function createBrand(data) {
  if (!data.name) {
    throw new Error("Brand name is required");
  }

  const brandId = data.name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

  const brandRef = db.collection("brands").doc(brandId);

  const existing = await brandRef.get();
  if (existing.exists) {
    throw new Error("Brand already exists");
  }

  const newBrand = {
    name: data.name,
    tagline: data.tagline || "",
    categories: data.categories || [],
    logo: data.logo || "",
    storySection: {
      title: "",
      stories: []
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await brandRef.set(newBrand);

  return {
    id: brandId,
    ...newBrand,
  };
}



export async function updateBrand(id, data) {
  const brandRef = db.collection("brands").doc(id);

  const updatePayload = {
    name: data.name,
    tagline: data.tagline || "",
    categories: data.categories || [],
    logo: data.logo || "",
    updatedAt: new Date(),
  };

  await brandRef.update(updatePayload);

  const updatedSnap = await brandRef.get();

  return {
    id: updatedSnap.id,
    ...updatedSnap.data(),
  };
}

export async function deactivateBrand(id) {
  const brandRef = db.collection("brands").doc(id);

  await brandRef.update({
    isActive: false,
    updatedAt: new Date(),
  });

  return { success: true };
}


export async function deleteBrand(id) {
  if (!id) {
    throw new Error("Brand ID is required");
  }

  await db.collection("brands").doc(id).delete();

  return { success: true };
}


export async function updateBrandStory(brandId, { action, section, sectionId }) {
  const brandRef = db.collection("brands").doc(brandId);
  const brandSnap = await brandRef.get();
  if (!brandSnap.exists) throw new Error("Brand not found");

  const brand = brandSnap.data();

  let storySections = brand.storySections || 
    (brand.storySection ? [{ ...brand.storySection, id: Date.now().toString() }] : []);

  if (action === "add") {
    storySections = [...storySections, section];
  } else if (action === "edit") {
    storySections = storySections.map(s => s.id === section.id ? section : s);
  } else if (action === "delete") {
    storySections = storySections.filter(s => s.id !== sectionId);
  }

  await brandRef.update({ 
    storySections,
    updatedAt: new Date(),
    storySection: FieldValue.delete()  // ← clean up old field
  });
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

  const snapshot = await query.get();

  let products = snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      // 🔥 Convert Firestore Timestamp to ISO string
      createdAt: data.createdAt
        ? data.createdAt.toDate().toISOString()
        : null,
    };
  });

  // Client-side search filtering
  if (search) {
    const q = search.toLowerCase();

    products = products.filter((p) =>
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  }

  const lastDoc = snapshot.docs.at(-1);

  return {
    products,
    nextCursor: lastDoc ? lastDoc.id : null,
    hasMore: snapshot.size === limit,
  };
}

export async function getProductsByAdmin({
  user, // pass decoded token
  limit = 20,
  cursor = null,
}) {
  
  // console.log(user);
  if (!user?.admin) {
    throw new Error("Not authorized");
  }

  let query = db
    .collection("products")
    .orderBy("createdAt", "desc")
    .limit(limit);

  // 🔐 Only restrict if NOT superadmin
  if (!user.superadmin) {
    query = query.where("createdBy", "==", user.uid);
  }

  if (cursor) {
    const cursorDoc = await db
      .collection("products")
      .doc(cursor)
      .get();

    if (cursorDoc.exists) {
      query = query.startAfter(cursorDoc);
    }
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