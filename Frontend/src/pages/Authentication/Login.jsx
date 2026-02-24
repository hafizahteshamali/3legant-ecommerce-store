import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash, FaEnvelope, FaLock, FaArrowRight, FaSignInAlt } from "react-icons/fa";
import { postRequest } from "../../apiRequest/axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (loading) return;

    try {
      setLoading(true);

      const response = await postRequest("/auth/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);
      if (response.success) {
        sessionStorage.removeItem("email");
        sessionStorage.setItem("token", response.user.token);
        sessionStorage.setItem("user_name", response.user.userName);
        sessionStorage.setItem("user_image", response.user.profile)
        navigate("/");
      }
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center px-3 py-6">
      <div className="w-full max-w-md">
        {/* Animated background elements */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <FaSignInAlt className="text-3xl text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-blue-100">Sign in to your account</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="space-y-5">
              {/* Email Field */}
              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-3 text-gray-400">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { 
                        value: /^\S+@\S+$/i, 
                        message: "Please enter a valid email address" 
                      },
                    })}
                    disabled={loading}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/70 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
                {errors.email && (
                  <div className="mt-2 ml-1">
                    <span className="text-red-500 text-sm flex items-center bg-red-50 px-3 py-1.5 rounded-lg">
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-3 text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { 
                        value: 6, 
                        message: "Password must be at least 6 characters" 
                      },
                    })}
                    disabled={loading}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/70 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => !loading && setIsPasswordVisible(!isPasswordVisible)}
                    className={`absolute right-3 text-gray-500 transition-colors ${loading ? "cursor-not-allowed opacity-50" : "hover:text-blue-600"}`}
                    disabled={loading}
                  >
                    {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors.password && (
                  <div className="mt-2 ml-1">
                    <span className="text-red-500 text-sm flex items-center bg-red-50 px-3 py-1.5 rounded-lg">
                      <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.password.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex justify-end items-center">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`mt-2 w-full py-3.5 px-4 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center ${
                  loading 
                    ? "bg-blue-400 cursor-not-allowed" 
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight className="ml-2" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-500">Don't have an account?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <Link 
                  to="/signup" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
                >
                  Create a new account
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </form>
        </div>
        
        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Secure login with end-to-end encryption
        </p>
      </div>

      {/* Add custom animation keyframes */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 8s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        /* Custom checkbox styling */
        input[type="checkbox"]:checked + div {
          background-color: #2563eb;
        }
        input[type="checkbox"]:checked + div svg {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Login;