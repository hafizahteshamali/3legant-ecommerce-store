import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import { CreateOrderController, GetOrderConfirmation } from "../Controllers/OrderControllers.js";

const orderRoute = express.Router();

orderRoute.post("/create", requireAuth, CreateOrderController);
orderRoute.get("/confirmation/:id", requireAuth, GetOrderConfirmation);

export default orderRoute;