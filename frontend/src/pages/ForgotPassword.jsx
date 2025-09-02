import { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const borderColor = "#A5D6A7";
  const primaryColor = "#43A047";
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
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
              //   onClick={}
            >
              Send OTP
            </button>
          </div>
        )}
        {step == 2 && (
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
              //   onClick={}
            >
              Send OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
