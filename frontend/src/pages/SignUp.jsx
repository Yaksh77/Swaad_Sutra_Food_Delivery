import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const primaryColor = "#43A047";
  const hoverColor = "#2E7D32";
  const bgColor = "#F1F8E9";
  const borderColor = "#A5D6A7";
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center w-full justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2 `}
          style={{ color: primaryColor, textAlign: "center" }}
        >
          Swaad Sutra
        </h1>
        <p className="text-gray-700 mb-2">
          Create your account to get started eith delicious food deliveries
        </p>
        {/* fullname */}
        <div className="mb-4">
          <label
            htmlFor="fullname"
            className="block text-gray-700 font-medium mb-1"
          >
            Fullname
          </label>
          <input
            type="text"
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-green-700"
            placeholder="Enter your full name"
            style={{
              border: `1px solid ${borderColor}`,
              color: `${primaryColor}`,
            }}
          />
        </div>
        {/* email */}
        <div className="mb-4">
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
          />
        </div>

        {/* mobile */}
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile No.
          </label>
          <input
            type="text"
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-green-700"
            placeholder="Enter your Mobile No."
            style={{
              border: `1px solid ${borderColor}`,
              color: `${primaryColor}`,
            }}
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:border-green-700"
              placeholder="Enter your password"
              style={{
                border: `1px solid ${borderColor}`,
                color: `${primaryColor}`,
              }}
            />
            <button
              className="absolute right-3 cursor-pointer top-1.5 text-green-500"
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
            >
              {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
        </div>

        {/* roles */}
        <div className="mb-4">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Roles
          </label>
          <div className="flex gap-2">
            {["User", "Owner", "Deliveryboy"].map((r) => (
              <button
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                onClick={() => setRole(r)}
                style={
                  role == r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : {
                        border: `1px solid ${borderColor}`,
                        color: primaryColor,
                      }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`w-full font-semibold mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200  bg-[#43A047] text-white hover:bg-[#2E7D32] cursor-pointer`}
        >
          SignUp
        </button>
        <button
          className={`w-full font-semibold mt-4 flex items-center justify-center gap-2  rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200 cursor-pointer bg-gray-100`}
        >
          <GoogleIcon style={{ color: primaryColor }} />
          {"  "}
          <span>Signup with Google</span>
        </button>
        <p className="text-center mt-2">
          Already have an Account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-[#43A047] cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
