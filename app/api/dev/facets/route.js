import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import admin from "firebase-admin";

export async function POST() {
  const data = {
    brand: "Wayleaf",
    category: "Plates",

    facets: [
      {
        key: "size",
        label: "Size",
        type: "select",
        options: ['4"', '6"', '10"', '12"'],
      },
      {
        key: "shape",
        label: "Shape",
        type: "select",
        options: ["Round", "Rectangle","Round Compartment"],
      },
    ],

    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await db
    .collection("facetSchemas")
    .doc("wayleaf-plates")
    .set(data);

  return NextResponse.json({ success: true });
}
