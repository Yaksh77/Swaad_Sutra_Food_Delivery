import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_API } from "../../api";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";

function SignIn() {
  const primaryColor = "#43A047";
  const hoverColor = "#2E7D32";
  const bgColor = "#F1F8E9";
  const borderColor = "#A5D6A7";
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${SERVER_API}/auth/signIn`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setEmail("");
      setPassword("");
      setError("");
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };
  const handleGoogleAuth = async () => {
    try {
      const proivder = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, proivder);

      const response = await axios.post(`${SERVER_API}/auth/google-auth`, {
        email: result.user.email,
      });
      setError("");
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
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
          Sign in with your account to get started with delicious food
          deliveries
        </p>

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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
        <div
          className="text-right mb-4 text-[#43A047] cursor-pointer"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </div>

        <button
          className={`w-full font-semibold mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200  bg-[#43A047] text-white hover:bg-[#2E7D32] cursor-pointer`}
          onClick={handleSignIn}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} /> : "Sign In"}
        </button>
        {error && (
          <p className="text-red-500 my-[10px] text-center">{`*${error}`}</p>
        )}
        <button
          className={`w-full font-semibold mt-4 flex items-center justify-center gap-2  rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-200 cursor-pointer bg-gray-100`}
          onClick={handleGoogleAuth}
        >
          <GoogleIcon style={{ color: primaryColor }} />
          {"  "}
          <span>Signin with Google</span>
        </button>
        <p className="text-center mt-2">
          Want to create new Account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#43A047] cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
