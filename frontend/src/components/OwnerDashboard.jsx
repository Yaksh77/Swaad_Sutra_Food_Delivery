import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiShop } from "react-icons/ci";
import { MdOutlineEditNote } from "react-icons/md";

function OwnerDashboard() {
  const { shopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-[#F1F8E9] flex flex-col items-center">
      <Navbar />
      {!shopData && (
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#43A047] w-16 h-16 sm:w-20 sm:h-20 mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Add Your Restaurant
              </h2>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                join our food delivery platform for delicious range of food.
              </p>
              <button
                onClick={() => navigate("/create-shop")}
                className="bg-gray-500 text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-green-600 transition-colors duration-200 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col items-center gap-6 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl text-gray-900 flex items-center gap-1 mt-4 text-center">
          <CiShop className="text-[#43A047] w-14 h-14 " />
          Welcome to {shopData?.name}
        </h1>
        <div className="bg-white  shadow-lg rounded-xl overflow-hidden border border-green-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative">
          <div
            className="absolute top-4 right-4 bg-white text-black p-2 rounded-full shadow-md hover:bg-green-600 transition-colors cursor-pointer"
            onClick={() => navigate("/create-shop")}
          >
            <MdOutlineEditNote size={23} />
          </div>
          <img
            src={shopData?.image}
            alt={shopData?.name}
            className="w-full h-48 sm:h-64 object-cover"
          />
          <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {shopData?.name}
            </h1>
            <p className="text-gray-500 font-semibold">
              {shopData?.city},{shopData.state}
            </p>
            <p className="text-gray-500 mb-2 font-semibold">
              {shopData?.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
