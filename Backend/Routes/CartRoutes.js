import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { addToCartController, clearCartController, deleteCartController, getCartController, updateCartController } from "../Controllers/CartControllers.js";

const cartRoute = express.Router();

cartRoute.post("/add", requireAuth, addToCartController);
cartRoute.get("/", requireAuth, getCartController);
cartRoute.put("/update", requireAuth, updateCartController);
cartRoute.delete("/remove/:productId", requireAuth, deleteCartController);
cartRoute.delete("/clear", requireAuth, clearCartController);

export default cartRoute;