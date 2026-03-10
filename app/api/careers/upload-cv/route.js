import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 10MB)" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const originalName = file.name; // e.g. "resume.pdf"

    const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
        {
        folder: "careers/cv",
          resource_type: "raw",
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
        if (error) reject(error);
        else resolve(result);
        }
    ).end(buffer);
    });

     const downloadUrl = cloudinary.utils.private_download_url(
      result.public_id,
      "", // 👈 no extension here
      {
        resource_type: "raw",
        attachment: file.name, // 👈 preserves original filename + extension
      }
    );

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      downloadUrl: downloadUrl
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "CV upload failed" },
      { status: 500 }
    );
  }
}
