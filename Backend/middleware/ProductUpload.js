import multer from "multer";
import productStorage from "../config/ProductCloudinary.js";

const productUpload = multer({storage: productStorage});

export default productUpload;