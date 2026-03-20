import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "doctor",
    allowed_formats: ["png", "jpg", "jpeg"],
  },
});

export { cloudinary, storage, connectCloudinary };