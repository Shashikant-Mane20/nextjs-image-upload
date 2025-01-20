// import { NextResponse } from "next/server";
// import { Image } from "../../../../models/Image";
// import mongoose from "mongoose";
// export const POST = async(request)=>{
//     try{
//         await mongoose.connect('mongodb://localhost:27017/images');

//         const data = await request.formData();
//         const file = data.get('file');

//         if (!file){
//             return NextResponse.json({success:false})
//         }

//         const bufferData = await file.arrayBuffer();
//         const buffer = Buffer.from(bufferData);

//         const newImage = new Image({
//             name:file.name,
//             data:buffer,
//             contentType : file.type
//         });
//         await newImage.save();

//         return NextResponse.json({response:"Successfully Uploaded",success:true});
//     }
//     catch(error){
//         console.log(error);
//         Response.json({Response:"Error uploading",success:false});
//     }
// }

import { NextResponse } from "next/server";
import { Image } from "../../../../models/Image";
import mongoose from "mongoose";
import { promises as fs } from "fs";
import path from "path";

export const POST = async (request) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    const bufferData = await file.arrayBuffer();
    const buffer = Buffer.from(bufferData);

    // Save the file to the public/uploads folder
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true }); // Ensure the folder exists
    const filePath = path.join(uploadsDir, file.name);

    await fs.writeFile(filePath, buffer);

    // Save metadata to MongoDB
    const newImage = new Image({
      name: file.name,
      data: buffer, // Optional: If you also want to store the buffer in the database
      contentType: file.type,
    });
    await newImage.save();

    return NextResponse.json({ 
      response: "Successfully Uploaded", 
      success: true, 
      filePath: `/uploads/${file.name}` 
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ 
      response: "Error uploading", 
      success: false 
    });
  }
};
