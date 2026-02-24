import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import Card from "../../../components/Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getRequest } from "../../../apiRequest/axios";
import { useNavigate } from "react-router-dom";

const Arrival = () => {
  const sliderRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isFeaturedProduct, setIsFeaturedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const navigateToProductDetail = (id)=>{
    navigate(`/products/${id}`);
  }

  const getProductData = async () => {
    try {
      setIsLoading(true)
      const data = await getRequest("/products/filter-product?isFeatured=true")
      setIsFeaturedProduct(data?.products);
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  // Calculate slides based on screen width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setSlidesToShow(4); // xl screens
      } else if (width >= 1024) {
        setSlidesToShow(3); // lg screens
      } else if (width >= 768) {
        setSlidesToShow(2); // md screens
      } else if (width >= 640) {
        setSlidesToShow(1.5); // sm screens - partial visibility
      } else {
        setSlidesToShow(1); // xs screens
      }
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false, // We'll use custom arrows
    swipeToSlide: true,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: Math.min(4, slidesToShow),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(3, slidesToShow),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(2, slidesToShow),
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px',
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '30px',
        }
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '20px',
        }
      }
    ],
  };

  return (
    <section className="relative py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 gap-4 sm:gap-6">
          <div className="w-full sm:w-auto">
            <div className="flex items-center gap-2 mb-2">
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                New <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Arrivals</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 text-sm sm:text-base whitespace-nowrap flex-1 sm:flex-none text-center">
              View All
            </button>

            {/* Navigation Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:shadow-md hover:border-gray-300 hover:scale-105 transition-all"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="text-gray-700 text-sm sm:text-base" />
              </button>
              <button
                onClick={() => sliderRef.current?.slickNext()}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:shadow-md hover:border-gray-300 hover:scale-105 transition-all"
                aria-label="Next slide"
              >
                <FaChevronRight className="text-gray-700 text-sm sm:text-base" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative px-0 sm:px-2">
          {isLoading ? <div className="loader"></div> : null}
          <Slider ref={sliderRef} {...settings} className="mx-0 sm:-mx-2">
            {isFeaturedProduct.map((item, index) => (
              <div key={index} className="px-1 sm:px-2 md:px-3">
                <div className="h-full">
                  <Card navigateToProductDetail={navigateToProductDetail} data={item} slider />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Mobile Dots Indicator */}
        <div className="flex justify-center mt-6 sm:mt-8 md:hidden">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((dot) => (
              <button
                key={dot}
                className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"
                onClick={() => sliderRef.current?.slickGoTo(dot - 1)}
                aria-label={`Go to slide ${dot}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Arrival;