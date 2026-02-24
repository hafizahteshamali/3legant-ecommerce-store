import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getRequest } from "../../apiRequest/axios";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTruck, FaClock, FaMapMarkerAlt, FaCreditCard, FaDownload, FaPrint, FaHome, FaShoppingBag } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { IoMdCash } from "react-icons/io";
import { RiSecurePaymentFill } from "react-icons/ri";

const OrderConfirmation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getSingleOrder = async () => {
        try {
            setLoading(true);
            const response = await getRequest(`/order/confirmation/${id}`);
            console.log("Order response:", response);
            setOrder(response.order || response);
            setError("");
        } catch (error) {
            console.log(error.message);
            setError("Failed to load order details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            getSingleOrder();
        }
    }, [id]);

    // Format date
    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Get status color
    const getStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Get payment status color
    const getPaymentStatusColor = (status) => {
        switch(status?.toLowerCase()) {
            case 'paid':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'unpaid':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading your order details...</p>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="text-red-500 text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
                    <p className="text-gray-600 mb-6">{error || "Order not found"}</p>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => navigate("/")}
                            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all"
                        >
                            Go to Home
                        </button>
                        <button
                            onClick={getSingleOrder}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <FaCheckCircle className="text-4xl text-green-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Order Confirmed! 🎉</h1>
                    <p className="text-gray-600 text-lg">Thank you for your purchase. Your order has been received.</p>
                </div>

                {/* Order Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <FaShoppingBag className="text-xl text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Order Number</p>
                            <p className="font-bold text-gray-800">#{order._id?.slice(-8)}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <FaClock className="text-xl text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Order Date</p>
                            <p className="font-bold text-gray-800">{formatDate(order.createdAt)}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <FaTruck className="text-xl text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Order Status</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                                {order.orderStatus}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <MdPayment className="text-xl text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Payment Status</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                                {order.paymentStatus}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Order Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FaShoppingBag className="text-yellow-500" />
                                Order Items ({order.items?.length || 0})
                            </h2>

                            <div className="space-y-4">
                                {order.items?.map((item, index) => (
                                    <div key={item._id || index} className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-xl">
                                        {/* Product Image Placeholder */}
                                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl font-bold text-yellow-600">
                                                {item.products?.name?.charAt(0) || 'P'}
                                            </span>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800 text-lg">
                                                {item.products?.name || 'Product'}
                                            </h3>
                                            {item.products?.brand && (
                                                <p className="text-sm text-gray-500">{item.products.brand}</p>
                                            )}
                                            <div className="flex flex-wrap items-center gap-4 mt-2">
                                                <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
                                                    Qty: {item.quantity}
                                                </span>
                                                <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
                                                    Price: Rs {item.price}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Total */}
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Total</p>
                                            <p className="font-bold text-yellow-600 text-lg">
                                                Rs {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Address Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-yellow-500" />
                                Shipping Address
                            </h2>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="font-semibold text-gray-800">{order.shippingAddress?.fullname}</p>
                                <p className="text-gray-600 mt-1">{order.shippingAddress?.address}</p>
                                <p className="text-gray-600">
                                    {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
                                </p>
                                <p className="text-gray-600">{order.shippingAddress?.country}</p>
                                <p className="text-gray-600 mt-2">
                                    <span className="font-medium">Phone:</span> {order.shippingAddress?.phone}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            {/* Payment Method */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-3 mb-2">
                                    {order.paymentMethod === 'COD' ? (
                                        <IoMdCash className="text-2xl text-green-600" />
                                    ) : (
                                        <RiSecurePaymentFill className="text-2xl text-blue-600" />
                                    )}
                                    <div>
                                        <p className="text-sm text-gray-500">Payment Method</p>
                                        <p className="font-semibold text-gray-800">
                                            {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Stripe'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium text-gray-800">Rs {order.totalAmount?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium text-gray-800">Rs 150</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600">Tax (15%)</span>
                                    <span className="font-medium text-gray-800">Rs {(order.totalAmount * 0.15).toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-800">Total</span>
                                        <span className="text-2xl font-bold text-yellow-600">
                                            Rs {(order.totalAmount + 150 + (order.totalAmount * 0.15)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 space-y-3">
                                <button className="w-full px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all font-semibold flex items-center justify-center gap-2">
                                    <FaDownload />
                                    Download Invoice
                                </button>
                                <button className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-semibold flex items-center justify-center gap-2">
                                    <FaPrint />
                                    Print Receipt
                                </button>
                                <NavLink to="/shop">
                                    <button className="w-full px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all font-semibold flex items-center justify-center gap-2">
                                        <FaHome />
                                        Continue Shopping
                                    </button>
                                </NavLink>
                            </div>

                            {/* Estimated Delivery */}
                            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <FaTruck className="text-2xl text-blue-600" />
                                    <div>
                                        <p className="font-semibold text-gray-800">Estimated Delivery</p>
                                        <p className="text-sm text-gray-600">
                                            {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Timeline */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Order Timeline</h2>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex-1 flex items-start gap-3">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaCheckCircle className="text-green-600 text-sm" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Order Placed</p>
                                <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>
                        <div className="flex-1 flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                order.orderStatus !== 'processing' ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                                <FaTruck className={`text-sm ${
                                    order.orderStatus !== 'processing' ? 'text-green-600' : 'text-gray-400'
                                }`} />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Order Shipped</p>
                                <p className="text-sm text-gray-500">
                                    {order.orderStatus !== 'processing' ? 'Shipped' : 'Pending'}
                                </p>
                            </div>
                        </div>
                        <div className="hidden md:block w-16 h-0.5 bg-gray-300"></div>
                        <div className="flex-1 flex items-start gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <FaCheckCircle className="text-gray-400 text-sm" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800">Delivered</p>
                                <p className="text-sm text-gray-500">Expected soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;