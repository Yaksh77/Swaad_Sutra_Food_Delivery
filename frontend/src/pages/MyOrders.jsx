import React from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserOrderCard from "../components/UserOrderCard";
import OwnerOrderCard from "../components/OwnerOrderCard";

function MyOrders() {
  const { userData, myOrders } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-[#F1F8E9] flex justify-center px-4">
      <div className="w-full max-w-[800px] p-4">
        <div className="flex items-center gap-[20px] mb-6">
          <div className="z-[10]">
            <FiArrowLeftCircle
              size={25}
              className="text-[#43A047]"
              onClick={() => navigate("/")}
            />
          </div>
          <h1 className="text-2xl font-bold text-start">My Orders</h1>
        </div>
        <div className="space-y-6">
          {myOrders.map((order, index) =>
            userData.role == "user" ? (
              <UserOrderCard data={order} key={index} />
            ) : userData.role == "owner" ? (
              <OwnerOrderCard data={order} key={index} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
