import {
  FaTrashAlt,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaArrowLeft,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteRequest, getRequest, putRequest } from "../../apiRequest/axios";
import { setProducts } from "../../store/productSlice";
import {
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
} from "../../store/cartSlice";

const Cartpage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { cart, product } = useSelector((state) => state);

  // ✅ SAFE CART MAPPING (MOST IMPORTANT)
  const cartData =
    cart?.items
      ?.map((cartItem) => {
        const productData = product.products.find(
          (p) => p._id === cartItem.product
        );

        if (!productData) return null;

        return {
          ...productData,
          quantity: cartItem.quantity,
          cartProductId: cartItem.product, // ⭐ IMPORTANT
        };
      })
      .filter(Boolean) || [];

  // ✅ GET PRODUCTS
  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const resp = await getRequest("/products/");
      if (resp?.products) {
        dispatch(setProducts(resp.products));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCart = async (id) => {
    try {
      const response = await deleteRequest(`/cart/remove/${id}`)
      console.log(response);
      dispatch(removeItem(id));
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleIncreaseQty = async (item, productId) => {
    try {
      const newQty = item.quantity + 1;

      const response = await putRequest("/cart/update", {
        productId: productId,
        quantity: newQty,
      });

      if (response?.success || response?.data?.success) {
        dispatch(increaseQty(productId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDecreaseQty = async (item, productId) => {
    if (item.quantity <= 1) return;

    try {
      const newQty = item.quantity - 1;

      const response = await putRequest("/cart/update", {
        productId: productId,
        quantity: newQty,
      });

      if (response?.success || response?.data?.success) {
        dispatch(decreaseQty(productId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClearCart = async ()=>{
    try {
      const response = await deleteRequest("/cart/clear");
      dispatch(clearCart());
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  // ✅ TOTALS
  const subTotal = cartData.reduce((acc, item) => {
    return acc + (item?.discountedPrice || 0) * (item.quantity || 0);
  }, 0);

  const shipping = subTotal > 5000 ? 0 : 150;
  const tax = (subTotal * 15) / 100;
  const grandTotal = subTotal + shipping + tax;

  // ✅ LOADING
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500" />
      </div>
    );
  }

  // ✅ EMPTY CART
  if (!cartData.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <FaShoppingBag className="text-7xl text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <NavLink to="/products">
          <button className="px-6 py-3 bg-yellow-500 text-white rounded-lg">
            Start Shopping
          </button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <NavLink to="/" className="flex items-center gap-2 text-gray-600">
            <FaArrowLeft />
            Continue Shopping
          </NavLink>

          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FaShoppingBag className="text-yellow-500" />
            Shopping Cart ({cartData.length})
          </h1>

          <button
            onClick={handleClearCart}
            className="text-red-500 font-medium"
          >
            Clear Cart
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* LEFT */}
        <div className="w-full lg:w-[65%] bg-white rounded-2xl shadow-lg">
          {cartData.map((item) => (
            <div
              key={item.cartProductId}
              className="border-b border-gray-300 p-4 md:p-6 flex flex-col md:flex-row gap-4 items-center"
            >
              {/* IMAGE + NAME */}
              <div className="flex-1 flex items-center gap-4">
                <img
                  src={item?.images?.[0]?.url || "/placeholder-image.jpg"}
                  alt={item.name}
                  className="w-20 h-20 object-contain bg-gray-100 rounded-lg"
                />

                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>

              {/* PRICE */}
              <div className="w-24 text-center font-medium">
                {item.discountedPrice} Rs
              </div>

              {/* QUANTITY */}
              <div className="flex items-center border-2 overflow-hidden border-gray-300 rounded-lg">
                <button
                  onClick={() => handleDecreaseQty(item, item._id)}
                  className="px-3 py-1 hover:bg-gray-300 bg-gray-100"
                >
                  <FaMinus />
                </button>

                <span className="px-4 font-medium">
                  {item.quantity}
                </span>

                <button
                  onClick={() => handleIncreaseQty(item, item._id)}
                  className="px-3 py-1 hover:bg-gray-300 bg-gray-100"
                >
                  <FaPlus />
                </button>
              </div>

              {/* TOTAL */}
              <div className="w-24 text-center font-bold text-yellow-600">
                {(item.discountedPrice * item.quantity).toFixed(0)} Rs
              </div>

              {/* DELETE */}
              <button
                onClick={() => handleDeleteCart(item._id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT SUMMARY */}
        <div className="w-full lg:w-[30%] bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subTotal.toFixed(0)} Rs</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : shipping}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (15%)</span>
              <span>{tax.toFixed(0)}</span>
            </div>

            <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-yellow-600">
                {grandTotal.toFixed(0)} Rs
              </span>
            </div>
          </div>

          <button onClick={()=>navigate("/checkout")} className="w-full mt-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;