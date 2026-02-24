import cartModel from "../Database/Models/CartModel.js";
import productModel from "../Database/Models/ProductModel.js";

const addToCartController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        const qty = quantity && quantity > 0 ? quantity : 1;
        const product = await productModel.findById(productId);
        if (!product || product.status !== "active") {
            return res.status(404).send({ success: false, message: "Product not available" });
        }
        if (product.stock < qty) {
            return res.status(400).send({ success: false, message: "not enough stock available" });
        }

        let cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            cart = await cartModel.create({
                user: userId,
                items: [{ product: productId, quantity: qty }]
            })
        } else {
            const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
            if (itemIndex > -1) {
                const newQty = cart.items[itemIndex].quantity + qty;
                if (product.stock < newQty) {
                    return res.status(400).send({ success: false, message: "exceed available stock" });
                } else {
                    cart.items[itemIndex].quantity = newQty;
                }
            } else {
                cart.items.push({
                    product: productId,
                    quantity: qty
                })
            }
            await cart.save();
        }

        return res.status(200).send({ success: true, message: "product added in cart", cart });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

const getCartController = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await cartModel.findOne({ user: userId }).populate("items.product");
        if (!cart) {
            return res.status(200).send({ success: true, cart: { items: [], totalItems: 0, subTotal: 0, totalQuantity: 0 } });
        }
        let subTotal = 0;
        let totalQuantity = 0;
        cart.items.forEach((item) => {
            item.product.discountedPrice && item.product.discountedPrice > 1 ? item.product.discountedPrice : item.product.price;
            subTotal += ((item.product.discountedPrice ? item.product.discountedPrice : item.product.price) * item.quantity);
            totalQuantity += item.quantity;
        });
        const totalItems = cart.items.length;
        return res.status(200).send({ success: true, items: cart.items, totalItems, subTotal, totalQuantity });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

const updateCartController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).send({ success: false, message: "quanity must be at least 1" });
        }

        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).send({ success: false, message: "cart not found" });
        }
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).send({ success: false, message: "product not found" });
        }
        if (quantity > product.stock) {
            return res.status(400).send({ success: false, message: "exceed available stock" });
        }

        const item = cart.items.find((item) => item.product.toString() === productId);
        if (!item) {
            return res.status(404).send({ success: false, message: "product not in cart" });
        }
        item.quantity = quantity;
        await cart.save();

        return res.status(200).send({ success: true, message: "cart updated", cart })

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

const deleteCartController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;
        const cart = await cartModel.findOne({ user: userId });
        if (!cart) {
            return res.status(404).send({ success: false, message: "cart not found" });
        }
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        await cart.save();
        return res.status(200).send({ success: true, message: "Item removed from cart", cart });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

const clearCartController = async (req, res) => {
    try {
        const userId = req.user._id;
        await cartModel.findOneAndUpdate({ user: userId }, { items: [] });
        res.status(200).send({ success: true, message: "cart cleared" });
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

export { addToCartController, getCartController, updateCartController, deleteCartController, clearCartController };