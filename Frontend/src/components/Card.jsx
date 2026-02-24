import React, { useState } from "react";
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { postRequest } from "../apiRequest/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "../store/cartSlice";

const Card = ({ data, slider, navigateToProductDetail }) => {
  const {
    _id,
    name = "Product Name",
    price = 0,
    discountedPrice,
    images = [],
    category,
    isFeatured = false,
    ratings = { average: 5, count: 0 },
  } = data;

  const [isLiked, setIsLiked] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Display rating as integer for stars
  const displayRating = ratings?.average ? Math.round(ratings.average) : 5;

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

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col ${
        slider ? "" : "w-full"
      }`}
    >
      {/* Image Section */}
      <div 
        className="relative bg-gray-50 overflow-hidden"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* Featured Badge */}
        {isFeatured && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
            Featured
          </span>
        )}

        {/* Category Badge */}
        {category && (
          <span className="absolute bottom-3 left-3 bg-gray-800 text-white text-[10px] uppercase px-2 py-1 rounded z-10">
            {category}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:shadow transition-all z-10"
        >
          {isLiked ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-400 hover:text-red-400" />
          )}
        </button>

        {/* Product Image Container with Smooth Transition */}
        <div className="aspect-square flex items-center justify-center p-4 relative">
          {/* Default Image */}
          <img
            src={images?.[0]?.url}
            alt={name}
            className={`absolute inset-0 w-full h-full object-contain p-4 transition-all duration-500 ease-in-out ${
              isHover ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
            }`}
            loading="lazy"
          />
          
          {/* Hover Image */}
          {images?.[1] && (
            <img
              src={images?.[1]?.url}
              alt={`${name} - alternate view`}
              className={`absolute inset-0 w-full h-full object-contain p-4 transition-all duration-500 ease-in-out ${
                isHover ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              loading="lazy"
            />
          )}
        </div>

        {/* Optional: Overlay with smooth fade */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/5 to-transparent transition-opacity duration-500 ${
            isHover ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name */}
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
          {name.length > 20 ? name.slice(0, 20) + "..." : name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm transition-colors duration-300 ${
                  i < displayRating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-400 text-xs ml-1">
            ({ratings?.average?.toFixed(1) || "5.0"})
          </span>
        </div>

        {/* Price + Add to Cart Button */}
        <div className="mt-auto">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${discountedPrice?.toFixed(2) || price.toFixed(2)}
            </span>
            {discountedPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="w-full flex justify-between items-center">
          <button onClick={()=>handleCart(_id)} className="w-[60%] py-2.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group">
            <FaShoppingCart className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="transition-all duration-300">Add to Cart</span>
          </button>
          <button onClick={()=>navigate(`/products/${_id}`)} className="w-[35%] py-2.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group">
          <span className="transition-all duration-300">details</span>
          </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Card;