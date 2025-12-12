import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
const uploadToCloudnary = async (file_details) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!file_details) {
      console.log("Cloudinary expects file url.");
      return null;
    }

    const uploadResponse = cloudinary.uploader.upload(file_path, {
      public_id: " ",
      resource_type: "image",
    });

    return uploadResponse;
  } catch (error) {
    console.log(
      "Cloudinary.utils.js says :- Failed to Upload image to cloudnary:- ",
      error
    );
  } finally {
    try {
      fs.unlink(file_details);
    } catch (error) {
      console.log(
        "Cloudinary.utils.js says :- Failed to delete file from local storage:- ",
        error
      );
    }
  }
};

export default uploadToCloudnary;
