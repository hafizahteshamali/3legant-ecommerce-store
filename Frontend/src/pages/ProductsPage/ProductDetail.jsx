import React, { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../apiRequest/axios";
import { useParams } from "react-router-dom";
import {
  FaShoppingCart,
  FaStar,
  FaStarHalfAlt,
  FaCheckCircle,
  FaMinus,
  FaPlus
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setCart } from "../../store/cartSlice";

const ProductDetail = () => {
  const { id } = useParams();
  
  const [singleProduct, setSingleProduct] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();

  const rating = 4.5; // This would come from your API

  const handleChange = (index) => {
    setImgIndex(index);
  }

  const getSingleProduct = async () => {
    try {
      setLoading(true);
      const res = await getRequest(`/products/${id}`);
      setSingleProduct(res?.data?.product || res?.product);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (id) {
      getSingleProduct();
    }
  }, [id]);

  const handleCart = async (productId) => {
    try {
      const token = sessionStorage.getItem("token");

      if (!token) {
        toast.error("Login required for shopping");
        return;
      }
      
      const res = await postRequest("/cart/add", {
        productId: productId,
        quantity: quantity,
      });
      dispatch(setCart(res?.cart));
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const decreaseQuantity = ()=>{
    if(quantity <= 1){
      setQuantity(1)
    }else{
      setQuantity(quantity - 1);
    }
  }

  if (!singleProduct) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="bg-white rounded-lg shadow-xl p-12 max-w-md mx-auto">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">

        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="/" className="text-gray-600 hover:text-black">Home</a>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <a href="/products" className="text-gray-600 hover:text-black">Products</a>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-black font-medium">{singleProduct?.name}</li>
          </ol>
        </nav>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-center items-center">

            {/* Left Side - Images */}
            <div className="lg:w-[55%] p-6 bg-gray-50">

              {/* Main Image - No slider, just static display */}
              <div className="relative">
                <div className="h-[500px] w-full rounded-xl overflow-hidden bg-white shadow-lg flex justify-center items-center">
                  <img
                    src={singleProduct?.images?.[imgIndex]?.url || "/placeholder-image.jpg"}
                    alt={singleProduct?.name}
                    className="w-[400px] h-[400px] object-contain"
                  />
                </div>
              </div>

              {/* Thumbnail Strip - Using flex */}
              {singleProduct?.images?.length > 1 && (
                <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
                  {singleProduct?.images?.map((image, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 relative flex justify-center items-center p-2 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer
                        ${imgIndex === index
                          ? "border-black shadow-lg scale-105"
                          : "border-transparent hover:border-gray-300"
                        }
                      `}
                    >
                      <img
                        onClick={() => handleChange(index)}
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-24 w-24 object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Side - Product Info */}
            <div className="lg:w-[45%] p-8 flex flex-col gap-6">

              {/* Badges - Using flex */}
              <div className="flex gap-3">
                {singleProduct?.stock > 0 ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <FaCheckCircle className="text-sm" /> In Stock
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                    Out of Stock
                  </span>
                )}
                {singleProduct?.discount && (
                  <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <MdLocalOffer /> {singleProduct.discount}% OFF
                  </span>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-5xl font-bold text-gray-800 leading-snug">
                {singleProduct?.name}
              </h1>

              {/* Price - Using flex */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-800">
                    Rs. {singleProduct?.price}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    Rs. {singleProduct?.discountedPrice}
                  </span>
                </div>

              </div>

              {/* Description */}
              <div>
                <p className={`text-gray-600 ${!showFullDescription && 'line-clamp-3'}`}>
                  {singleProduct?.description}
                </p>
                {singleProduct?.description?.length > 150 && (
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-black font-medium mt-2 hover:underline"
                  >
                    {showFullDescription ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>

              {/* Quantity and Add to Cart - Using flex */}
              <div className="flex items-center gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button onClick={decreaseQuantity} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition">
                  <FaMinus />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button onClick={()=>setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition">
                  <FaPlus />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <div className="flex w-full justify-between items-center">
                <button
                onClick={()=>handleCart(singleProduct._id)}
                  className={`flex-1 bg-black text-white px-6 py-3 rounded-lg font-semibold 
                    flex items-center justify-center gap-2 transition-all duration-300
                    ${addedToCart ? 'bg-green-600' : 'hover:bg-gray-800'}
                  `}
                >
                  {addedToCart ? (
                    <>
                      <FaCheckCircle /> Added
                    </>
                  ) : (
                    <>
                      <FaShoppingCart /> Add to Cart
                    </>
                  )}
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;