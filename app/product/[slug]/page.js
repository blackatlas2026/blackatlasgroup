// app/product/[slug]/page.js
import ProductClient from "@/app/components/product/ProductClient";

export default async function Page({ params }) {
  const { slug } = await params;

  return <ProductClient slug={slug} />;
}