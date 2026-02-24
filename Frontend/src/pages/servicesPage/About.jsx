import React from 'react';
import { 
  FaHeadphones,
  FaMusic,
  FaShoppingBag,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaCheckCircle,
  FaMicrophone,
  FaGamepad,
  FaHeart,
  FaWifi,
  FaBolt,
  FaClock,
  FaGem,
  FaStar,
  FaBoxOpen,
  FaGift,
  FaPercent,
  FaBluetoothB,
  FaBatteryFull,
  FaRedoAlt,
  FaShippingFast,
  FaLock,
  FaHeadphonesAlt,
  FaUserTie,
  FaUserCircle,
  FaUser
} from 'react-icons/fa';
import { HiOutlineLightningBolt } from 'react-icons/hi';
import { HiOutlineDevicePhoneMobile, HiOutlineSpeakerWave } from "react-icons/hi2";
import { MdSupportAgent, MdSecurity, MdMusicNote, MdDiscount, MdHeadset, MdOutlineEarbuds, MdHeadphones, MdEarbuds } from 'react-icons/md';
import { GiSoundWaves, GiEarrings, GiHeadphones, GiMusicalNotes, GiSpeaker } from 'react-icons/gi';

const About = () => {
  // Products matching your home page with valid icons
  const products = [
    { name: "Headband", icon: <FaHeadphones className="text-2xl" />, price: "$24.99", color: "bg-purple-100 text-purple-600" },
    { name: "Earbuds", icon: <MdOutlineEarbuds className="text-2xl" />, price: "$34.99", color: "bg-blue-100 text-blue-600" },
    { name: "Headband Collection", icon: <GiHeadphones className="text-2xl" />, price: "$49.99", color: "bg-green-100 text-green-600" },
    { name: "Accessories", icon: <FaMicrophone className="text-2xl" />, price: "$19.99", color: "bg-yellow-100 text-yellow-600" },
    { name: "Best Seller", icon: <FaStar className="text-2xl" />, price: "$39.99", color: "bg-pink-100 text-pink-600" },
    { name: "Accessories", icon: <FaBoxOpen className="text-2xl" />, price: "$19.99", color: "bg-indigo-100 text-indigo-600" },
    { name: "Headband Collection", icon: <MdHeadset className="text-2xl" />, price: "$49.99", color: "bg-orange-100 text-orange-600" },
    { name: "Best Seller", icon: <FaGem className="text-2xl" />, price: "$39.99", color: "bg-red-100 text-red-600" }
  ];

  const features = [
    {
      icon: <FaHeadphonesAlt className="text-3xl text-purple-600" />,
      title: "Premium Sound Quality",
      description: "High-fidelity audio with deep bass and crystal clear treble"
    },
    {
      icon: <FaBluetoothB className="text-3xl text-blue-500" />,
      title: "Wireless Technology",
      description: "Latest Bluetooth 5.3 for seamless connectivity"
    },
    {
      icon: <FaBatteryFull className="text-3xl text-green-500" />,
      title: "Long Battery Life",
      description: "Up to 40 hours playtime with fast charging"
    },
    {
      icon: <GiSoundWaves className="text-3xl text-pink-500" />,
      title: "Noise Cancellation",
      description: "Active noise cancellation for immersive experience"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: <FaHeart className="text-red-500" /> },
    { number: "100+", label: "Products", icon: <FaShoppingBag className="text-purple-500" /> },
    { number: "24/7", label: "Support", icon: <MdSupportAgent className="text-blue-500" /> },
    { number: "30-Day", label: "Returns", icon: <FaRedoAlt className="text-green-500" /> }
  ];

  const promotions = [
    { title: "Hurry up! 40% OFF", description: "Thousands of high tech earware for you", icon: <FaPercent className="text-4xl text-red-500" /> },
    { title: "Free Shipping", description: "Order above $200", icon: <FaShippingFast className="text-4xl text-blue-500" /> },
    { title: "Money-back", description: "30 days guarantee", icon: <FaUndo className="text-4xl text-green-500" /> },
    { title: "Secure Payments", description: "Secured by Stripe", icon: <FaLock className="text-4xl text-purple-500" /> }
  ];

  const teamMembers = [
    {
      name: "Alex Thompson",
      role: "Founder & Audio Engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
      bio: "Creating premium audio experiences since 2015"
    },
    {
      name: "Sarah Chen",
      role: "Product Designer",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyhMkZuu1yoXYXv6J2KpS6-_gZacFnzy2fBg&s",
      bio: "Designing ergonomic and stylish audio products"
    },
    {
      name: "Mike Roberts",
      role: "Technical Specialist",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80",
      bio: "Expert in wireless audio technology"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-[#fec856] text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              About 
              <span className=""> AudioHub</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6 max-w-3xl">
              Listen to the amazing music sound
            </p>
            <p className="text-lg max-w-2xl opacity-90 mb-8">
              Experience music like never before with our premium collection
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Shopping Now
            </button>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our <span className="text-purple-600">Story</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2020, we started with a simple mission: to provide high-quality audio products 
              at affordable prices. What began as a small passion project has grown into a trusted 
              destination for music lovers.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We carefully curate our collection of headphones, earbuds, and accessories to ensure 
              every product meets our standards for quality and performance.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 border-2 border-white"></div>
                ))}
              </div>
              <div className="text-gray-600">
                <span className="font-bold text-gray-800">10,000+</span> Trusted Customers
              </div>
            </div>
          </div>
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Audio Products" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            New <span className="text-purple-600">Arrivals</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">Check out our latest products</p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {products.slice(0, 6).map((product, index) => (
              <div key={index} className="w-[280px] bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
                <div className={`${product.color} p-6 flex justify-center`}>
                  {product.icon}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <p className="text-xl font-bold text-purple-600 mb-3">{product.price}</p>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Promotion Banner */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <FaPercent className="text-5xl text-yellow-300" />
                <div>
                  <h3 className="text-2xl font-bold">Hurry up! 40% OFF</h3>
                  <p className="text-purple-100">Thousands of high tech earware for you</p>
                </div>
              </div>
              <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Collection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Shop <span className="text-purple-600">Collection</span>
        </h2>
        <p className="text-center text-gray-600 mb-12">Explore our wide range of products</p>
        
        <div className="flex flex-wrap justify-center gap-6">
          {products.slice(2, 8).map((product, index) => (
            <div key={index} className="w-[250px] bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className={`${product.color} p-4 flex justify-center`}>
                {product.icon}
              </div>
              <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-lg font-bold text-purple-600 mb-2">{product.price}</p>
                <button className="w-full bg-purple-600 text-white py-1.5 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose <span className="text-purple-600">Us</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {features.map((feature, index) => (
              <div key={index} className="w-[250px] bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
                <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 text-center text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Meet Our <span className="text-purple-600">Team</span>
        </h2>
        <p className="text-center text-gray-600 mb-12">Passionate experts behind your favorite products</p>
        
        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-[300px] bg-white rounded-xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-purple-600 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  <FaFacebook className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors text-xl" />
                  <FaTwitter className="text-gray-400 hover:text-blue-400 cursor-pointer transition-colors text-xl" />
                  <FaInstagram className="text-gray-400 hover:text-pink-600 cursor-pointer transition-colors text-xl" />
                  <FaLinkedin className="text-gray-400 hover:text-blue-700 cursor-pointer transition-colors text-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotions Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8">
            {promotions.map((promo, index) => (
              <div key={index} className="flex-1 min-w-[200px] text-center">
                <div className="flex justify-center mb-3">
                  {promo.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{promo.title}</h3>
                <p className="text-sm text-gray-600">{promo.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience music like never before
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of satisfied customers
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;