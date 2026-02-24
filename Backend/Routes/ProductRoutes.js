import express from "express";
import { addProductController, deleteProductController, filterProductController, getAllProductController, getSingleProductController, searchProductController, updateProductController } from "../Controllers/ProductController.js";
import productUpload from "../middleware/ProductUpload.js";
import { isAdmin, requireAuth } from "../middleware/requireAuth.js";

const productRoute = express.Router();

productRoute.post("/", requireAuth, isAdmin, productUpload.fields([
    {name: "images", maxCount: 5}
]), addProductController);
productRoute.get("/search-product", searchProductController);
productRoute.get("/", getAllProductController);
productRoute.get("/filter-product", filterProductController)
productRoute.get("/:id", getSingleProductController);
productRoute.delete("/:id", requireAuth, isAdmin, deleteProductController);
productRoute.put("/:id", requireAuth, isAdmin, productUpload.fields([
    {name: "images", maxCount: 5}
]), updateProductController);

export default productRoute;