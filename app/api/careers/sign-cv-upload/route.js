import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST() {
  const timestamp = Math.round(Date.now() / 1000);

  const paramsToSign = {
    folder: "careers/cv",
    use_filename: true,
    unique_filename: true,
    timestamp,
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

