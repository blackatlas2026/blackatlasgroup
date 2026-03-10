import { db } from "@/lib/firebase-admin";

export async function getDashboardStats() {
  // Fetch collections in parallel (faster)
  const [productsSnap, brandsSnap, ] = await Promise.all([
    db.collection("products").get(),
    db.collection("brands").get(),
    
  ]);

  const totalProducts = productsSnap.size;
  const totalBrands = brandsSnap.size
  // 🔥 Count categories inside brands
  let totalCategories = 0;

  brandsSnap.forEach((doc) => {
    const data = doc.data();
    if (Array.isArray(data.categories)) {
      totalCategories += data.categories.length;
    }
  });

  return {
    totalProducts,
    totalBrands,
    totalCategories,
  };
}