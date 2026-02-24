import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const productStorage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "Product_images",
        allowed_formats: ["jpg", "jpeg", "png"],
        transformation: [{height: 500, width: 500, crop: "limit"}]
    }
})

export default productStorage;
