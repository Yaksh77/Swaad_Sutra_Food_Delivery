import { useEffect } from "react";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_API } from "../../api.js";
import { useState } from "react";

function DeliveryboyDashboard() {
  const { userData } = useSelector((state) => state.user);
  const [availableAssignments, setAvailableAssignments] = useState([]);
  const getAssignment = async () => {
    try {
      const response = await axios.get(`${SERVER_API}/order/get-assignments`, {
        withCredentials: true,
      });
      // console.log(response.data);

      setAvailableAssignments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptOrder = async (assignmentId) => {
    try {
      const response = await axios.get(
        `${SERVER_API}/order/accept-order/${assignmentId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAssignment();
  }, [userData]);
  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#F1F8E9] overflow-y-auto">
      <Navbar />
      <div className="w-full max-w-[800px] flex flex-col gap-5 items-center">
        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start items-center w-[90%] border border-green-100 text-center gap-2">
          <h1 className="text-xl text-green-700">
            Welcome, {userData.fullname}
          </h1>
          <p className="text-green-700">
            <span className="font-semibold">Latitude:</span>
            {userData.location.coordinates[1].toFixed(7)},{" "}
            <span className="font-semibold">Longitude:</span>
            {userData.location.coordinates[0].toFixed(7)}
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-md w-[90%] border border-green-100">
          <h1 className="text-lg font-bold mb-4 flex items-center gap-2">
            Available Orders
          </h1>
          <div className="space-y-4">
            {availableAssignments.length > 0 ? (
              availableAssignments.map((a, index) => (
                <div
                  className="border rounded-lg p-4 flex justify-between items-center"
                  key={index}
                >
                  <div>
                    <p className="text-sm font-semibold">{a?.shopName}</p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Delivery Address: </span>
                      {a?.deliveryAddress.text}
                    </p>
                    <p className="text-sm text-gray-400">
                      {a?.items.length} items | {a?.subTotal}
                    </p>
                  </div>
                  <button
                    onClick={() => acceptOrder(a.assignmentId)}
                    className=" bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer font-semibold"
                  >
                    Accept
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No Available Orders</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryboyDashboard;
