import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users_table",
        required: true
    },
    items: [
        {
            products:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true
            },
            quantity: Number,
            price: Number
        }
    ],
    shippingAddress:{
        fullname: String,
        phone: String,
        address: String,
        city: String,
        postalCode: String,
        country: String
    },
    paymentMethod:{
        type: String,
        enum: ["COD", "STRIPE"],
        default: "COD"
    },
    paymentStatus:{
        type: String,
        enum: ["pending", "paid"],
        defualt: "pending"
    },
    orderStatus:{
        type: String,
        enum: ["processing", "shipped", "delivered", "cancelling"],
        default: "processing"
    },
    totalAmount: Number
},{timestamps: true})

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;