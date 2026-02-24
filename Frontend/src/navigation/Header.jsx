import { FaRegWindowClose, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { NavigationData } from "../assets/ConstantData";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const data = useSelector((state) => state?.cart?.items);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const storedUserName = sessionStorage.getItem("user_name");
      const storedProfile = sessionStorage.getItem("user_image");
      setUserName(storedUserName);
      setProfile(storedProfile);
    }
  }, []);

  
  // Simple function to toggle logout dropdown
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = ()=>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user_name");
    sessionStorage.removeItem("user_image");
    window.location.href = "/"
  }
  
  return (
    <div className="relative">
      {/* Top Banner */}
      <div className="p-3 bg-gradient-to-r from-[var(--black-color)] to-gray-800 flex lg:justify-center justify-between items-center gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-transparent"></div>
        <div className="flex justify-around items-center gap-3 relative z-10">
          <div className="flex justify-center items-center gap-3">
            <img src="/assets/images/ticket.svg" className="h-6 w-6 animate-bounce" alt="" />
            <p className="text-[var(--white-color)] text-[14px] lg:text-[16px] font-medium">🎉 30% off storewide — Limited time! </p>
          </div>
        </div>
        <IoMenu onClick={() => setIsMenu(true)} className="text-4xl text-white lg:hidden block cursor-pointer hover:scale-110 transition-transform relative z-10" />
      </div>

      {/* Main Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-40 flex justify-between lg:justify-around items-center py-4 px-3 md:px-6">
        <NavLink to="/" className="hover:scale-105 transition-transform">
          <img src="/assets/images/Logo.svg" className="h-12 w-40 md:h-15 md:w-40" alt="" />
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="lg:flex lg:justify-center items-center gap-8 xl:gap-10 hidden">
          {NavigationData.map((item, index) => {
            return (
              <li key={index}>
                <NavLink
                  className={({ isActive }) =>
                    `text-[16px] xl:text-[18px] font-[500] relative group ${
                      isActive ? "text-yellow-600" : "text-gray-700 hover:text-yellow-600"
                    }`
                  }
                  to={item.url}
                >
                  {item.text}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Desktop Right Icons */}
        <div className="flex justify-center items-center gap-3 md:gap-4">
          <div className="relative">
            <FaShoppingCart onClick={()=>navigate("/cart")} className="text-2xl cursor-pointer hover:text-yellow-600 transition-colors" />
              {isLoggedIn && (
            <span className="h-[20px] w-[20px] rounded-full bg-red-500 block text-white flex justify-center items-center text-[12px] absolute -top-[10px] -right-[10px]">
              {data?.length || 0}
            </span>
              )}
          </div>

          {isLoggedIn ? (
            <div className="flex justify-center items-center gap-2 relative">
              {/* Profile Image/Icon - Click to toggle logout */}
              {profile ? (
                <img
                  onClick={toggleLogout}
                  src={profile}
                  className="h-8 w-8 md:h-[35px] md:w-[35px] rounded-full object-cover cursor-pointer border-2 border-yellow-500 hover:scale-110 transition-transform"
                  alt="Profile"
                />
              ) : (
                <div
                  onClick={toggleLogout}
                  className="h-8 w-8 md:h-[35px] md:w-[35px] rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                >
                  <span className="text-white font-bold text-sm md:text-base">
                    {userName?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              {/* Logout Dropdown - Shows when showLogout is true */}
              {showLogout && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fadeIn">
                  <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    <p className="font-semibold">{userName}</p>
                    <p className="text-xs opacity-90">View Profile</p>
                  </div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2">
                    <FaSignOutAlt className="text-red-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login">
              <button className="px-4 py-2 bg-gradient-to-r from-[var(--black-color)] to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-[var(--black-color)] transition-all transform hover:scale-105 shadow-md">
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <div
        className={`${
          isMenu ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-full md:w-[400px] bg-gradient-to-b from-gray-900 to-black text-white transition-all duration-500 z-50 shadow-2xl overflow-y-auto`}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <img src="/assets/images/Logo-white.svg" className="h-10 w-32" alt="" />
            <FaRegWindowClose
              onClick={() => setIsMenu(false)}
              className="text-3xl text-white cursor-pointer hover:text-yellow-500 transition-colors"
            />
          </div>

          {/* User Profile Section - Only show when logged in */}
          {isLoggedIn && (
            <div className="mt-6 flex items-center gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              {profile ? (
                <img
                  src={profile}
                  className="h-16 w-16 rounded-full object-cover border-3 border-yellow-500"
                  alt="Profile"
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-2xl font-bold border-3 border-yellow-500">
                  <span className="text-white">
                    {userName?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="text-lg font-semibold">{userName}</p>
                <p className="text-sm text-gray-400">Welcome back! 👋</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div className="p-6">
          <ul className="flex flex-col gap-2">
            {NavigationData.map((item, index) => {
              return (
                <li key={index}>
                  <NavLink
                    to={item.url}
                    onClick={() => setIsMenu(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-[18px] transition-all ${
                        isActive
                          ? "bg-yellow-500 text-black font-semibold"
                          : "text-gray-300 hover:bg-white/10 hover:pl-6"
                      }`
                    }
                  >
                    {item.text}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Cart in Mobile Menu */}
        <div className="px-6 py-2">
          <div className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-300">
            <span className="text-[18px]">Cart</span>
            <span className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {data?.length || 0}
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="w-full px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-lg font-medium">
              <FaSignOutAlt />
              Logout
            </button>
          ) : (
            <div className="flex gap-3">
              <NavLink to="/login" onClick={() => setIsMenu(false)} className="flex-1">
                <button className="w-full px-4 py-3 bg-yellow-500 text-black rounded-xl hover:bg-yellow-400 transition-colors font-semibold">
                  Login
                </button>
              </NavLink>
              <NavLink to="/signup" onClick={() => setIsMenu(false)} className="flex-1">
                <button className="w-full px-4 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors font-semibold">
                  Sign Up
                </button>
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenu && (
        <div
          className="fixed inset-0 bg-[#00000025] backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMenu(false)}
        ></div>
      )}

      {/* Add custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Header;