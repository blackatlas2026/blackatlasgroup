import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import admin from "firebase-admin";


const wayleafPlates = {
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


  const wayleafBowls = {
    brand: "Wayleaf",
    category: "Bowls",
    facets: [
      {
        key: "size",
        label: "Size",
        type: "select",
        options: ['4"'],
      },
    ],

    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };

export async function POST() {
  

  await db
    .collection("facetSchemas")
    .doc("wayleaf-bowls")
    .set(wayleafBowls);

  return NextResponse.json({ success: true });
}
