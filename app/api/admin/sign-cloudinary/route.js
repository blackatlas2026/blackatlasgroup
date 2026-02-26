import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function POST(req) {
  const auth = await requireAdmin(req);
  if (auth instanceof NextResponse) return auth;

  const timestamp = Math.round(new Date().getTime() / 1000);
  const { folder, public_id } = await req.json(); // ✅ Add public_id!

  const paramsToSign = {
    folder,
    timestamp,
    ...(public_id && { public_id }) // ✅ Include for destroy requests
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  return NextResponse.json({
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  });
}
