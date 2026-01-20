import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Use promise-based fs
const uploadToCloudnary = async (file_path, file_name) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    if (!file_path) {
      console.log("Cloudinary expects file url.");
      return response.status(404).json({
        success: false,
        message: "Path not found for the image to upload to server.",
      });
    }

    // Add await to wait for upload to complete
    const uploadResponse = await cloudinary.uploader.upload(file_path, {
      // public_id: file_name,
      resource_type: "image",
    });

    console.log("cloudnary ------------", uploadResponse);

    return uploadResponse;
  } catch (error) {
    console.log(
      "Cloudinary.utils.js says :- Failed to Upload image to cloudnary:- ",
      error
    );
  } finally {
    try {
      // Use await with fs.promises.unlink for async deletion
      await fs.unlink(file_path);
      console.log("Successfully deleted local file:", file_path);
    } catch (error) {
      console.log(
        "Cloudinary.utils.js says :- Failed to delete file from local storage:- ",
        error
      );
    }
  }
};

export default uploadToCloudnary;
