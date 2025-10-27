import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function OrderDelivered() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#F1F8E9] flex flex-col justify-center items-center px-4 text-center relative overflow-hidden]">
      <FaCircleCheck className="text-green-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        You successfully delivered the order!
      </h1>
      <p className="text-gray-600 max-w-md mb-6">
        “Your effort brings smiles and satisfaction to our customers. Keep it
        up!”
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition cursor-pointer"
      >
        Return to Dashboard
      </button>
    </div>
  );
}

export default OrderDelivered;
