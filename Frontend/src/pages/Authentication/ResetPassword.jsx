import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash, FaKey, FaCheck, FaLock, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import { postRequest } from "../../apiRequest/axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const email = sessionStorage.getItem("email");

    if (!email) {
      setServerError("Email not found. Please start the password reset process again.");
      return;
    }

    try {
      setLoading(true);
      setServerError("");

      const payload = {
        email,
        newPassword: data.password,
      };

      const response = await postRequest(
        "/auth/reset-password",
        payload,
        { "Content-Type": "application/json" }
      );

      if (response.success) {
        setSuccess(true);
        sessionStorage.removeItem("email");
        
        // Navigate after showing success message
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Password strength checker
  const checkPasswordStrength = (pass) => {
    if (!pass) return { strength: 0, label: "", color: "gray" };
    
    let strength = 0;
    if (pass.length >= 6) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    
    if (strength <= 25) return { strength, label: "Weak", color: "red" };
    if (strength <= 50) return { strength, label: "Fair", color: "yellow" };
    if (strength <= 75) return { strength, label: "Good", color: "blue" };
    return { strength, label: "Strong", color: "green" };
  };

  const passwordStrength = checkPasswordStrength(password);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center px-3 py-6">
      <div className="w-full max-w-md">
        {/* Animated background elements */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <FaKey className="text-3xl text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">New Password</h1>
            <p className="text-blue-100">Create a strong new password for your account</p>
          </div>
          
          <div className="p-6 md:p-8">
            {/* Security Info */}
            <div className="flex items-start bg-blue-50 rounded-xl p-4 mb-6">
              <FaShieldAlt className="text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800 mb-1">Password Requirements</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${password?.length >= 6 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    Minimum 6 characters
                  </li>
                  <li className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    At least one uppercase letter
                  </li>
                  <li className="flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    At least one number
                  </li>
                </ul>
              </div>
            </div>

            {success ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FaCheck className="text-3xl text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Password Reset Successful!</h3>
                <p className="text-gray-600 mb-6">Your password has been updated successfully.</p>
                <div className="w-full bg-green-200 rounded-full h-2 mb-6">
                  <div className="bg-green-500 h-2 rounded-full animate-progress"></div>
                </div>
                <p className="text-sm text-gray-500">Redirecting to login page...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* New Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "New password is required",
                        minLength: { 
                          value: 6, 
                          message: "Password must be at least 6 characters" 
                        },
                      })}
                      placeholder="Enter your new password"
                      className="w-full pl-10 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/70"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Password strength</span>
                        <span className={`font-medium text-${passwordStrength.color}-600`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 bg-${passwordStrength.color}-500`}
                          style={{ width: `${passwordStrength.strength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {errors.password && (
                    <div className="mt-1 ml-1">
                      <span className="text-red-500 text-sm flex items-center bg-red-50 px-3 py-1.5 rounded-lg">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.password.message}
                      </span>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) => value === password || "Passwords do not match",
                      })}
                      placeholder="Re-enter your new password"
                      className="w-full pl-10 pr-12 py-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/70"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </button>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {watch("confirmPassword") && (
                    <div className={`flex items-center text-sm ${watch("confirmPassword") === password ? 'text-green-600' : 'text-red-600'}`}>
                      {watch("confirmPassword") === password ? (
                        <>
                          <FaCheck className="mr-1.5" />
                          Passwords match
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          Passwords do not match
                        </>
                      )}
                    </div>
                  )}
                  
                  {errors.confirmPassword && (
                    <div className="mt-1 ml-1">
                      <span className="text-red-500 text-sm flex items-center bg-red-50 px-3 py-1.5 rounded-lg">
                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.confirmPassword.message}
                      </span>
                    </div>
                  )}
                </div>

                {/* Server Error */}
                {serverError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-red-700 font-medium">{serverError}</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 px-4 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center ${
                    loading 
                      ? "bg-blue-400 cursor-not-allowed" 
                      : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating Password...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <FaArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Back to Login Link */}
            {!success && (
              <div className="text-center pt-6">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors group"
                >
                  <svg className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to Login
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Your password is securely encrypted and never stored in plain text
        </p>
      </div>

      {/* Add custom animation keyframes */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(15px, -20px) scale(1.05); }
          66% { transform: translate(-10px, 10px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-progress {
          animation: progress 2s ease-out forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        /* Password strength colors */
        .text-red-600 { color: #dc2626; }
        .bg-red-500 { background-color: #dc2626; }
        .text-yellow-600 { color: #d97706; }
        .bg-yellow-500 { background-color: #d97706; }
        .text-blue-600 { color: #2563eb; }
        .bg-blue-500 { background-color: #2563eb; }
        .text-green-600 { color: #059669; }
        .bg-green-500 { background-color: #059669; }
      `}</style>
    </div>
  );
};

export default ResetPassword;