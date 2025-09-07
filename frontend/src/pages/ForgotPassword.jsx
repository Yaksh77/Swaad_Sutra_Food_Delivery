import { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_API } from "../../api";
import { ClipLoader } from "react-spinners";

function ForgotPassword() {
  const borderColor = "#A5D6A7";
  const primaryColor = "#43A047";
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetOTP = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${SERVER_API}/auth/send-otp`,
        {
          email,
        },
        { withCredentials: true }
      );
      setStep(2);
      setError("");
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };
  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${SERVER_API}/auth/verify-otp`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      );
      setStep(3);
      setError("");
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };
  const handleResetPassword = async () => {
    setLoading(true);
    if (newPassword !== confirmPassword) {
      return null;
    }
    try {
      const result = await axios.post(
        `${SERVER_API}/auth/reset-password`,
        {
          email,
          newPassword,
        },
        { withCredentials: true }
      );
      setError("");
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#F1F8E9]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4">
          <FiArrowLeftCircle
            size={30}
            className="text-[#43A047] cursor-pointer"
            onClick={() => navigate("/signIn")}
          />
          <h1 className="text-2xl font-bold text-[#43A047] text-center">
            Forgot Password
          </h1>
        </div>
        {step == 1 && (
          <div>
            {/* email */}
            <div className="mb-4 mt-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-green-700"
                placeholder="Enter your email"
                style={{
                  border: `1px solid ${borderColor}`,
                  color: `${primaryColor}`,
                }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className={`w-full font-semibold mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200  bg-[#43A047] text-white hover:bg-[#2E7D32] cursor-pointer`}
              onClick={handleSetOTP}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
            </button>
            <p className="text-red-500 my-[10px] text-center">{`${error}`}</p>
          </div>
        )}
        {step == 2 && (
          <div>
            {/* OTP */}
            <div className="mb-6 mt-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="email"
                className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-green-700"
                placeholder="Enter OTP"
                style={{
                  border: `1px solid ${borderColor}`,
                  color: `${primaryColor}`,
                }}
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <button
              className={`w-full font-semibold mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200  bg-[#43A047] text-white hover:bg-[#2E7D32] cursor-pointer`}
              onClick={handleVerifyOTP}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Verify OTP"}
            </button>
            <p className="text-red-500 my-[10px] text-center">{`${error}`}</p>
          </div>
        )}
        {step == 3 && (
          <div>
            {/* New Password */}
            <div className="mb-6 mt-4">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="email"
                className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-green-700"
                placeholder="Enter New Password"
                style={{
                  border: `1px solid ${borderColor}`,
                  color: `${primaryColor}`,
                }}
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
            <div className="mb-6 mt-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="email"
                className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-green-700"
                placeholder="Enter Confirm Password"
                style={{
                  border: `1px solid ${borderColor}`,
                  color: `${primaryColor}`,
                }}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <button
              className={`w-full font-semibold mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200  bg-[#43A047] text-white hover:bg-[#2E7D32] cursor-pointer`}
              onClick={handleResetPassword}
            >
              {loading ? (
                <ClipLoader size={30} color="white" />
              ) : (
                "Reset Password"
              )}
            </button>
            {error && (
              <p className="text-red-500 my-[10px] text-center">{`*${error}`}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
