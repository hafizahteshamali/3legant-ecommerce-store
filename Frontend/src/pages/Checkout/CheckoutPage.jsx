import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaMapMarkerAlt, FaCreditCard, FaTruck, FaShieldAlt, FaCheckCircle, FaRegCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { clearCart } from "../../store/cartSlice";
import { postRequest } from "../../apiRequest/axios";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, product } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(1);

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      fullname: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "Pakistan",
      paymentMethod: "COD",
    },
    mode: "onChange", // Validate on change for real-time feedback
  });

  // Watch payment method for conditional rendering
  const paymentMethod = watch("paymentMethod");

  // Calculate totals from cart data
  const cartData = cart?.items?.map((cartItem) => {
    const productData = product?.products?.find((p) => p._id === cartItem.product);
    return { ...productData, quantity: cartItem.quantity, cartItemId: cartItem._id };
  }) || [];

  const subTotal = cartData.reduce((acc, result) => {
    return acc + (result?.discountedPrice * result?.quantity);
  }, 0);

  const shipping = subTotal > 5000 ? 0 : 150;
  const tax = (subTotal * 15) / 100;
  const grandTotal = subTotal + shipping + tax;

  // Validation functions
  const validatePhone = (value) => {
    const phoneRegex = /^[0-9+\-\s]{10,15}$/;
    return phoneRegex.test(value) || "Please enter a valid phone number";
  };

  const validatePostalCode = (value) => {
    const postalRegex = /^\d{4,6}$/;
    return postalRegex.test(value) || "Please enter a valid postal code";
  };

  const handleContinueToPayment = () => {
    // Trigger validation for shipping form
    const isValid = handleSubmit(
      () => {
        setActiveStep(2);
      },
      (errors) => {
        console.log("Validation errors:", errors);
        setError("Please fill in all required fields correctly");
      }
    )();
  };

  const handlePlaceOrder = async (data) => {
    try {
      setLoading(true);
      setError("");
  
      if (!cartData.length) {
        setError("Your cart is empty");
        return;
      }
  
      // ===============================
      // 💳 STRIPE FLOW
      // ===============================
      if (data.paymentMethod === "STRIPE") {
        const stripePayload = {
          cartItems: cartData.map((item) => ({
            name: item.name,
            price: item.discountedPrice,
            quantity: item.quantity,
            image: item?.images?.[0]?.url,
          })),
        };
  
        const stripeResponse = await postRequest(
          "/payment/create-checkout-session",
          stripePayload
        );
  
        // ✅ redirect to Stripe
        const stripeUrl = stripeResponse?.url || stripeResponse?.data?.url;
  
        if (stripeUrl) {
          window.location.href = stripeUrl;
          return;
        } else {
          setError("Stripe session creation failed");
          return;
        }
      }
  
      // ===============================
      // 💵 COD FLOW
      // ===============================
      const payload = {
        shippingAddress: {
          fullname: data.fullname,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postalCode: data.postalCode,
          country: data.country,
        },
        paymentMethod: data.paymentMethod,
      };
  
      const response = await postRequest("/order/create", payload);
  
      if (response.success || response.data?.success) {
        dispatch(clearCart());
        navigate(`/order-confirmation/${response?.order?._id}`);
      } else {
        setError(response.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order placement error:", error);
      setError(
        error.response?.data?.message ||
        error.message ||
        "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <NavLink to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 transition-colors">
            <FaArrowLeft className="text-lg" />
            <span className="font-medium">Back to Cart</span>
          </NavLink>
          <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>
          <div className="w-24"></div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      )}

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-center gap-2 md:gap-8 mb-8">
          <div className={`flex items-center gap-2 ${activeStep >= 1 ? 'text-yellow-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${activeStep >= 1 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {activeStep > 1 ? <FaCheckCircle /> : 1}
            </div>
            <span className="hidden md:block font-medium">Shipping</span>
          </div>
          <div className={`w-16 h-0.5 ${activeStep >= 2 ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center gap-2 ${activeStep >= 2 ? 'text-yellow-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${activeStep >= 2 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {activeStep > 2 ? <FaCheckCircle /> : 2}
            </div>
            <span className="hidden md:block font-medium">Payment</span>
          </div>
          <div className={`w-16 h-0.5 ${activeStep >= 3 ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center gap-2 ${activeStep >= 3 ? 'text-yellow-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${activeStep >= 3 ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              3
            </div>
            <span className="hidden md:block font-medium">Review</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Forms */}
          <div className="flex-1">
            {/* Shipping Address Form - Using React Hook Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-6">
                <FaMapMarkerAlt className="text-2xl text-yellow-500" />
                <h2 className="text-xl font-bold text-gray-800">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    {...register("fullname", { 
                      required: "Full name is required",
                      minLength: { value: 3, message: "Name must be at least 3 characters" }
                    })}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                      errors.fullname ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.fullname && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullname.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    {...register("phone", { 
                      required: "Phone number is required",
                      validate: validatePhone
                    })}
                    placeholder="+92 300 1234567"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    {...register("address", { 
                      required: "Address is required",
                      minLength: { value: 5, message: "Address must be at least 5 characters" }
                    })}
                    placeholder="Street address"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input
                    {...register("city", { 
                      required: "City is required",
                      minLength: { value: 2, message: "City must be at least 2 characters" }
                    })}
                    placeholder="Karachi"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                  <input
                    {...register("postalCode", { 
                      required: "Postal code is required",
                      validate: validatePostalCode
                    })}
                    placeholder="75000"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                      errors.postalCode ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                  <select
                    {...register("country", { required: "Country is required" })}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all ${
                      errors.country ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="UAE">UAE</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleContinueToPayment}
                disabled={loading}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>

            {/* Payment Method - Using React Hook Form */}
            {activeStep >= 2 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-6">
                  <FaCreditCard className="text-2xl text-yellow-500" />
                  <h2 className="text-xl font-bold text-gray-800">Payment Method</h2>
                </div>

                <div className="space-y-4">
                  <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-200'}`}>
                    <input
                      type="radio"
                      {...register("paymentMethod", { required: "Payment method is required" })}
                      value="COD"
                      className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
                    />
                    <FaMoneyBillWave className="text-2xl text-green-600" />
                    <div className="flex-1">
                      <span className="font-medium text-gray-800">Cash on Delivery</span>
                      <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'STRIPE' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-200'}`}>
                    <input
                      type="radio"
                      {...register("paymentMethod", { required: "Payment method is required" })}
                      value="STRIPE"
                      className="w-4 h-4 text-yellow-500 focus:ring-yellow-500"
                    />
                    <FaRegCreditCard className="text-2xl text-blue-600" />
                    <div className="flex-1">
                      <span className="font-medium text-gray-800">Credit / Debit Card</span>
                      <p className="text-sm text-gray-500">Pay online with Stripe</p>
                    </div>
                    <div className="flex gap-2">
                      <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-6" />
                      <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-6" />
                    </div>
                  </label>
                </div>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-1">{errors.paymentMethod.message}</p>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setActiveStep(1)}
                    disabled={loading}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all font-medium disabled:opacity-50"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Order Review - Using React Hook Form */}
            {activeStep >= 3 && (
              <form onSubmit={handleSubmit(handlePlaceOrder)}>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <FaCheckCircle className="text-2xl text-yellow-500" />
                    <h2 className="text-xl font-bold text-gray-800">Review Your Order</h2>
                  </div>

                  {/* Shipping Summary */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Shipping Address</h3>
                    <p className="text-gray-600">
                      {watch("fullname")}<br />
                      {watch("address")}<br />
                      {watch("city")}, {watch("postalCode")}<br />
                      {watch("country")}<br />
                      Phone: {watch("phone")}
                    </p>
                  </div>

                  {/* Payment Summary */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-gray-800 mb-2">Payment Method</h3>
                    <p className="text-gray-600">
                      {watch("paymentMethod") === 'COD' ? '💵 Cash on Delivery' : '💳 Credit/Debit Card (Stripe)'}
                    </p>
                  </div>

                  {/* Order Items Preview */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Order Items ({cartData.length})</h3>
                    <div className="space-y-3 max-h-40 overflow-y-auto">
                      {cartData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {item?.name || `Product`} x {item?.quantity}
                          </span>
                          <span className="font-medium">Rs {(item?.discountedPrice * item?.quantity).toFixed(0)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      disabled={loading}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium disabled:opacity-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        `Place Order • Rs ${grandTotal.toFixed(0)}`
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

              {/* Cart Items Preview */}
              <div className="max-h-60 overflow-y-auto mb-4">
                {cartData.map((item) => (
                  <div key={item?._id} className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex justify-center items-center">
                      <img 
                        src={item?.images?.[0]?.url || "/placeholder-image.jpg"} 
                        className="w-[80%] h-[80%] object-contain" 
                        alt={item?.name || "Product"} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm line-clamp-1">{item?.name || "Product"}</p>
                      <p className="text-xs text-gray-500">Qty: {item?.quantity}</p>
                    </div>
                    <p className="font-semibold">Rs {item?.discountedPrice}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">Rs {subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : `Rs ${shipping}`}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Tax (15%)</span>
                  <span className="font-medium">Rs {tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-800">Total</span>
                  <span className="text-2xl font-bold text-yellow-600">Rs {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaTruck className="text-yellow-500" />
                  <span>Free shipping on orders over 5000 Rs</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FaShieldAlt className="text-yellow-500" />
                  <span>Secure payment guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;