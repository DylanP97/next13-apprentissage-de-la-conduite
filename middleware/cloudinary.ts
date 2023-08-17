// import { NextResponse } from "next/server";

// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const cloudinaryUpload = async (dataImageUrl: any, next: any) => {

//   if (dataImageUrl) {
//     cloudinary.uploader.upload(
//       dataImageUrl.path,
//       { folder: "", public_id: dataImageUrl.filename },
//       (error: any, result: any) => {
//         if (error) {
//           return NextResponse.json({ message: error.message, status: 500 });
//         }
//         const fileSize = dataImageUrl.size;
//         const maxSize = 10000 * 1024;
//         if (fileSize > maxSize)
//           return NextResponse.json({
//             message: "Le fichier est trop grand.",
//             status: 400,
//           });

//         const cloudinaryUrl = result.secure_url;
//         return cloudinaryUrl;
//       }
//     );
//   }
// };

// module.exports = cloudinaryUpload;
