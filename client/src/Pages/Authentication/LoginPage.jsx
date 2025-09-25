import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [phoneError, setPhoneError] = useState("");
  const [otpError, setOtpError] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      setPhoneError("Enter a valid 10-digit phone number");
      return;
    }
    setPhoneError("");
    // TODO: call backend to send OTP
    console.log("OTP sent to:", phone);
  };

  const handleOtpChange = (e, index) => {
    const val = e.target.value;
    setOtpError("");

    if (/^\d*$/.test(val)) {
      const newOtp = [...otp];
      if (val.length > 1) {
        // handle paste
        const chars = val.split("").slice(0, 4 - index);
        for (let i = 0; i < chars.length; i++) {
          newOtp[index + i] = chars[i];
        }
        setOtp(newOtp);
        const nextIndex = index + chars.length;
        if (nextIndex < 4) inputRefs.current[nextIndex].focus();
      } else {
        newOtp[index] = val;
        setOtp(newOtp);
        if (val && index < 3) inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join("");
    if (otpValue.length < 4) {
      setOtpError("Enter complete 4-digit OTP");
      return;
    }
    setOtpError("");
    setLoading(true);
    // TODO: call backend to verify OTP
    setTimeout(() => {
      navigate("/");
    }, [2000]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-green-700">Login</h2>

        {/* Phone input */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500 ${
              phoneError ? "border-red-500" : ""
            }`}
          />
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>

        {/* Send OTP button */}
        <button
          onClick={handleSendOtp}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition font-semibold"
        >
          Send OTP
        </button>

        {/* OTP input row */}
        <div>
          <label className="block text-gray-700 mb-2 mt-4 font-medium">
            Enter OTP
          </label>
          <div className="flex space-x-3 justify-center">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[i] = el)}
                onChange={(e) => handleOtpChange(e, i)}
                className={`w-14 h-14 text-center border rounded-lg text-xl font-bold focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  otpError ? "border-red-500" : ""
                }`}
              />
            ))}
          </div>
          {otpError && (
            <p className="text-red-500 text-sm mt-1 text-center">{otpError}</p>
          )}
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className={`w-full mt-4 flex justify-center items-center gap-2 py-2 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading && <Loader2 className="animate-spin w-5 h-5" />}
            <span>{loading ? "Verifying..." : "Verify OTP"}</span>
          </button>
        </div>

        {/* Register link */}
        <div className="text-center mt-2">
          <span className="text-gray-600">Don't have an account? </span>
          <a
            href="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
