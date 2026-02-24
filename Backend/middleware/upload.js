import multer from "multer";
import storage from "../config/Cloudinary.js";

const profileUpload = multer({storage: storage})

export default profileUpload;