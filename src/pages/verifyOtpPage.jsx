import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, ArrowLeft, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const VerifyOTPPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const { verifyOtp, resendOtp, loading } = useUserStore();

  // Handle OTP input
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedData)) return;

    const otpArray = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];
    
    otpArray.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus the last filled input or the next empty one
    const lastIndex = Math.min(otpArray.length, 5);
    const nextInput = document.getElementById(`otp-${lastIndex}`);
    if (nextInput) {
      nextInput.focus();
    }
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    verifyOtp(otpCode);
  };

  // Handle resend
  const handleResend = () => {
    if (!canResend) return;
    resendOtp();
    setTimeLeft(30);
    setCanResend(false);
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">
          Verify Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          We've sent a verification code to your email
        </p>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4 text-center">
                Enter verification code
              </label>
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-12 h-12 text-center text-xl bg-gray-700 border border-gray-600 
                      rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                      focus:ring-emerald-500 focus:border-emerald-500"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent 
                rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600
                hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading || otp.some(digit => !digit)}
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  Verify Code
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Didn't receive the code?{" "}
              <button
                onClick={handleResend}
                disabled={!canResend}
                className={`font-medium ${
                  canResend
                    ? "text-emerald-400 hover:text-emerald-300 cursor-pointer"
                    : "text-gray-500 cursor-not-allowed"
                }`}
              >
                Resend OTP
                {!canResend && ` (${timeLeft}s)`}
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/signup"
              className="font-medium text-emerald-400 hover:text-emerald-300 flex items-center justify-center"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOTPPage;