import express from "express";
import { createCheckoutSession } from "../Controllers/PaymentControllers.js";

const paymentRoute = express.Router();

paymentRoute.post("/create-checkout-session", createCheckoutSession)

export default paymentRoute;