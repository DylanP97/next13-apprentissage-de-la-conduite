import { NextResponse } from "next/server";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryUpload = async (request: Request, next: any) => {
  const body = await request.json();

  if (body.file) {
    cloudinary.uploader.upload(
      body.file.path,
      { folder: "", public_id: body.file.filename },
      (error: any, result: any) => {
        if (error) {
          return NextResponse.json({ message: error.message, status: 500 });
        }
        const fileSize = body.file.size;
        const maxSize = 10000 * 1024;
        if (fileSize > maxSize)
          return NextResponse.json({
            message: "Le fichier est trop grand.",
            status: 400,
          });

        const cloudinaryUrl = result.secure_url;
        return cloudinaryUrl;
      }
    );
  }
};

module.exports = cloudinaryUpload;
