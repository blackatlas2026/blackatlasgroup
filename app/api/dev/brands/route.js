import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST() {
  const now = new Date();

  await Promise.all([
    db.collection("brands").doc("wayleaf").set({
      name: "Wayleaf",
      isActive: true,
      categories: ["Plates"],
      createdAt: now,
    }),

    db.collection("brands").doc("b-studio").set({
      name: "B Studio",
      isActive: true,
      categories: ["Pallanguzhi"],
      createdAt: now,
    }),
  ]);

  return NextResponse.json({ success: true });
}
