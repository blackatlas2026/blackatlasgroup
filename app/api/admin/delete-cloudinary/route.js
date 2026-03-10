import { v2 as cloudinary } from "cloudinary";

export async function POST(request) {
  try {
    const { public_id } = await request.json();
    
    if (!public_id) {
      return Response.json({ error: "public_id required" }, { status: 400 });
    }

    // Validate Cloudinary config
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return Response.json({ error: "Cloudinary config missing" }, { status: 500 });
    }

    // Generate destroy signature
    const timestamp = Math.round(new Date().getTime() / 1000);
    const paramsToSign = { public_id, timestamp };
    
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    // Delete from Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          public_id,
          api_key: process.env.CLOUDINARY_API_KEY,
          timestamp,
          signature
        })
      }
    );

    const result = await response.json();

    return Response.json({ 
      success: result.result === 'ok' || result.result === 'not_found',
      result 
    });

  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
