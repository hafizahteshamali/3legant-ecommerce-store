import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash, FaUser, FaEnvelope, FaLock, FaCamera, FaArrowRight } from "react-icons/fa";
import { postRequest } from "../../apiRequest/axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePreview, setProfilePreview] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("profile", data.profileImage[0]);

      const response = await postRequest("/auth/signup", formData);
      console.log("Signup response:", response);

      if (response.success) {
        sessionStorage.setItem("email", response.newUser.email);
        navigate("/verify-signup-otp");
      }
    } catch (error) {
      console.log("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center px-3 py-6">
      <div className="w-full max-w-md">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-blue-100">Join our community today</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            {/* Profile Image Upload with Preview */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                  {profilePreview ? (
                    <img src={profilePreview} alt="Profile preview" className="w-full h-full object-cover" />
                  ) : (
                    <FaUser className="text-4xl text-gray-400" />
                  )}
                </div>
                <label htmlFor="profileUpload" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-all shadow-md hover:shadow-lg">
                  <FaCamera />
                  <input
                    id="profileUpload"
                    type="file"
                    {...register("profileImage", { 
                      required: "Profile image required",
                      onChange: (e) => handleImageChange(e)
                    })}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
            {errors.profileImage && (
              <div className="text-center mb-4">
                <span className="text-red-500 text-sm bg-red-50 px-3 py-1 rounded-full">{errors.profileImage.message}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Username Field */}
              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-3 text-gray-400">
                    <FaUser />
                  </div>
                  <input
                    {...register("username", { required: "Username required" })}
                    placeholder="Enter your username"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/70"
                  />
                </div>
                {errors.username && (
                  <div className="mt-1 ml-1">
                    <span className="text-red-500 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.username.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-3 text-gray-400">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/70"
                  />
                </div>
                {errors.email && (
                  <div className="mt-1 ml-1">
                    <span className="text-red-500 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
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
                    type={isPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password required",
                      minLength: { value: 6, message: "Minimum 6 characters required" },
                    })}
                    placeholder="Create a password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/70"
                  />
                  <button
                    type="button"
                    onClick={() => setIsPassword(!isPassword)}
                    className="absolute right-3 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {isPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors.password && (
                  <div className="mt-1 ml-1">
                    <span className="text-red-500 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.password.message}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-3 text-gray-400">
                    <FaLock />
                  </div>
                  <input
                    type={isConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) => value === password || "Passwords do not match",
                    })}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/70"
                  />
                  <button
                    type="button"
                    onClick={() => setIsConfirmPassword(!isConfirmPassword)}
                    className="absolute right-3 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {isConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="mt-1 ml-1">
                    <span className="text-red-500 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.confirmPassword.message}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Password Strength Indicator */}
            <div className="mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Password strength</span>
                <span className="text-sm font-medium">
                  {password?.length >= 6 ? "Strong" : password?.length >= 3 ? "Medium" : "Weak"}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    password?.length >= 6 ? "bg-green-500 w-full" : 
                    password?.length >= 3 ? "bg-yellow-500 w-2/3" : 
                    "bg-red-500 w-1/3"
                  }`}
                ></div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mt-6 flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`mt-8 w-full py-3.5 px-4 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center ${
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <FaArrowRight className="ml-2" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <Link 
                to="/login" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
              >
                Sign in to your account
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </form>
        </div>
        
        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Secure signup with end-to-end encryption
        </p>
      </div>

      {/* Add custom animation keyframes */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default Signup;