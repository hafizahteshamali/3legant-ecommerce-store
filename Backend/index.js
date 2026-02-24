// api/index.js
import express from "express";
import serverless from "serverless-http";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import AuthRoute from "../Routes/AuthRoutes.js";
import ProductRoute from "../Routes/ProductRoutes.js";
import CartRoute from "../Routes/CartRoutes.js";
import OrderRoute from "../Routes/OrderRoutes.js";
import PaymentRoute from "../Routes/PaymentRoutes.js";

// Database
import DbConnection from "../Database/DbConnection.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", AuthRoute);
app.use("/api/products", ProductRoute);
app.use("/api/cart", CartRoute);
app.use("/api/order", OrderRoute);
app.use("/api/payment", PaymentRoute);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Backend is running on Vercel!" });
});

// Connect to DB
DbConnection();

// Export as serverless function
export default serverless(app);