import cartModel from "../Database/Models/CartModel.js";
import orderModel from "../Database/Models/OrderModel.js";

export const CreateOrderController = async(req, res)=>{
    try {
        const userId = req.user._id;
        const {shippingAddress, paymentMethod} = req.body;
        
        const cart = await cartModel.findOne({user: userId}).populate("items.product");

        if(!cart || cart.items.length === 0){
            return res.status(400).send({success: false, message: "cart is empty"});
        }

        let totalAmount = 0;

        const orderItems = cart.items.map((item)=>{
            totalAmount += item.product.discountedPrice * item.quantity;

            return {products: item.product._id, quantity: item.quantity, price: item.product.price};
        })

        const order = await orderModel.create({
            user: userId,
            items: orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod,
            paymentStatus: paymentMethod === "COD" ? "pending" : "unpaid",
            orderStatus: "processing",
        })

        cart.items = [];
        await cart.save();

        return res.status(201).send({success: true, message: "order placed successfully", order});

    } catch (error) {
        return res.status(500).send({success: false, message: error.message});
    }
}

export const GetOrderConfirmation = async (req, res)=>{
    try {
        const orderId = req.params.id;
        const userId = req.user._id;

        const order = await orderModel.findOne({_id: orderId, user: userId}).populate("items.products");
        if(!order){
            return res.status(404).send({success: false, message: "order not found"})
        }

        return res.status(200).send({success: true, order})

    } catch (error) {
        return res.status(500).send({success: true, message: error.message});
    }
}