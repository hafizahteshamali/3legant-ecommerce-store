import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postRequest } from "../../apiRequest/axios";
import { FaLock, FaRedo, FaCheckCircle, FaEnvelope } from "react-icons/fa";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Determine purpose
  const purpose =
    location.pathname === "/verify-signup-otp"
      ? "signup"
      : location.pathname === "/verify-otp-forgot-password"
      ? "forgot_password"
      : "";

  const email = sessionStorage.getItem("email");

  // 🔹 Timer for resend OTP
  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setCanResend(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  // 🔹 OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  // 🔹 Backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // 🔹 Paste OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      while (newOtp.length < 6) newOtp.push('');
      setOtp(newOtp);
      newOtp.forEach((digit, index) => {
        if (inputsRef.current[index]) {
          inputsRef.current[index].value = digit;
          if (index === 5) inputsRef.current[index].focus();
        }
      });
    }
  };

  // 🔹 Submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6 || !email || !purpose) {
      // Shake animation for empty OTP
      inputsRef.current.forEach(input => {
        if (input && !input.value) {
          input.classList.add('animate-shake');
          setTimeout(() => input.classList.remove('animate-shake'), 500);
        }
      });
      return;
    }

    try {
      setLoading(true);

      const url =
        purpose === "signup"
          ? "/auth/verify-otp-signup"
          : "/auth/verify-otp-forgot-password";

      const response = await postRequest(url, {
        email,
        otp: enteredOtp,
        purpose,
      });

      if (response.success) {
        if (purpose === "signup") {
          // Success animation before navigation
          document.querySelector('.success-animation')?.classList.remove('hidden');
          setTimeout(() => navigate("/login"), 1500);
        } else {
          navigate("/reset-password");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Resend OTP
  const handleResend = async () => {
    if (resendLoading || !email || !purpose || !canResend) return;

    try {
      setResendLoading(true);
      await postRequest("/auth/resend-otp", { email, purpose });
      setCanResend(false);
      setTimer(30);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center px-3 py-6">
      <div className="w-full max-w-md">
        {/* Animated background elements */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/30">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full">
                <FaLock className="text-3xl text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {purpose === "signup" ? "Verify Your Account" : "Secure Verification"}
            </h1>
            <p className="text-blue-100">Enter the verification code sent to your email</p>
          </div>
          
          <div className="p-6 md:p-8">
            {/* Email Display */}
            <div className="flex items-center justify-center bg-blue-50 rounded-xl p-4 mb-6">
              <FaEnvelope className="text-blue-500 mr-3" />
              <div className="text-center">
                <p className="text-sm text-gray-600">Code sent to</p>
                <p className="font-medium text-gray-800">{email || "your email"}</p>
              </div>
            </div>

            {/* OTP Inputs */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="block text-center text-gray-600 mb-2">
                  Enter 6-digit verification code
                </label>
                
                <div className="flex justify-center gap-3" onPaste={handlePaste}>
                  {otp.map((num, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={num}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onFocus={(e) => e.target.select()}
                      ref={(el) => (inputsRef.current[index] = el)}
                      disabled={loading}
                      className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white/80 disabled:bg-gray-100"
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  ))}
                </div>

                {/* Success Animation (Hidden by default) */}
                <div className="success-animation hidden flex justify-center mt-4">
                  <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full">
                    <FaCheckCircle className="mr-2 animate-bounce" />
                    <span className="font-medium">Verification Successful!</span>
                  </div>
                </div>
              </div>

              {/* Timer & Resend */}
              <div className="text-center space-y-3">
                {!canResend ? (
                  <div className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-full">
                    <div className="flex items-center">
                      <div className="relative w-6 h-6 mr-2">
                        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24">
                          <circle
                            className="text-gray-200"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            cx="12"
                            cy="12"
                            r="10"
                          />
                          <circle
                            className="text-blue-600"
                            strokeWidth="2"
                            strokeDasharray={62.8}
                            strokeDashoffset={62.8 * (1 - timer / 30)}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            cx="12"
                            cy="12"
                            r="10"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        Resend code in <span className="text-blue-600">{timer}s</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={resendLoading}
                    className={`inline-flex items-center px-4 py-2 rounded-full font-medium transition-all ${
                      resendLoading
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700"
                    }`}
                  >
                    <FaRedo className={`mr-2 ${resendLoading ? "animate-spin" : ""}`} />
                    {resendLoading ? "Sending..." : "Resend Verification Code"}
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-4 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center ${
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
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Continue
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </>
                )}
              </button>

              {/* Help Text */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Having trouble receiving the code? Check your spam folder or{" "}
                  <button
                    type="button"
                    onClick={() => console.log("Contact support")}
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                  >
                    contact support
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
        
        {/* Footer note */}
        <p className="text-center text-gray-500 text-sm mt-6">
          For your security, this code expires in 10 minutes
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        /* OTP input focus effect */
        input:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        /* Circular progress bar */
        circle {
          transition: stroke-dashoffset 0.35s;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
      `}</style>
    </div>
  );
};

export default VerifyOtp;