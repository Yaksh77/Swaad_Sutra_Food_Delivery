import { useEffect } from "react";
import Navbar from "./Navbar.jsx";
import { useSelector } from "react-redux";
import axios from "axios";
import { SERVER_API } from "../../api.js";
import { useState } from "react";
import DeliveryBoyTracking from "./DeliveryBoyTracking.jsx";

function DeliveryboyDashboard() {
  const { userData, socket } = useSelector((state) => state.user);
  const [availableAssignments, setAvailableAssignments] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState(null);

  useEffect(() => {
    if (!socket || userData.role !== "Delivery-Boy") {
      return;
    }
    let watchId;
    if (navigator.geolocation) {
      (watchId = navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setDeliveryBoyLocation({ lat: latitude, lon: longitude });

        socket.emit("updateLocation", {
          latitude,
          longitude,
          userId: userData._id,
        });
      })),
        (error) => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
        };
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [socket, userData]);

  const getAssignment = async () => {
    try {
      const response = await axios.get(`${SERVER_API}/order/get-assignments`, {
        withCredentials: true,
      });

      setAvailableAssignments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentOrder = async () => {
    try {
      const response = await axios.get(
        `${SERVER_API}/order/get-current-order`,
        {
          withCredentials: true,
        }
      );
      setCurrentOrder(response.data);
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
      await getCurrentOrder();
    } catch (error) {
      console.log(error);
    }
  };
  const sendOTP = async () => {
    try {
      const response = await axios.post(
        `${SERVER_API}/order/send-delivery-otp/`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
        },
        {
          withCredentials: true,
        }
      );
      setShowOtpBox(true);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        `${SERVER_API}/order/verify-delivery-otp/`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
          OTP: otp,
        },
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
    socket?.on("newAssignment", (data) => {
      if (data.sendTo == userData._id) {
        setAvailableAssignments((prev) => [...prev, data]);
      }
    });

    return () => {
      socket?.off("newAssignment");
    };
  }, [socket]);

  useEffect(() => {
    getAssignment();
    getCurrentOrder();
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
            {deliveryBoyLocation?.lat.toFixed(7) ||
              userData.location.coordinates[1].toFixed(7)}
            , <span className="font-semibold">Longitude:</span>
            {deliveryBoyLocation?.lon.toFixed(7) ||
              userData.location.coordinates[0].toFixed(7)}
          </p>
        </div>
        {!currentOrder && (
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
                        <span className="font-semibold">
                          Delivery Address:{" "}
                        </span>
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
        )}
        {currentOrder && (
          <div className="bg-white rounded-2xl p-5 shadow-md w-[90%] border border-green-100">
            <h2 className="text-lg font-bold mb-3">🛍️Current Order</h2>
            <div className="border rounded-lg p-4 mb-3">
              <p className="font-semibold text-sm">
                {currentOrder?.shopOrder?.shop?.name}
              </p>
              <p className="text-sm text-gray-500">
                {currentOrder?.deliveryAddress?.text}
              </p>
              <p className="text-xs text-gray-400">
                {currentOrder?.shopOrder?.shopOrderItems?.length} items |{" "}
                {currentOrder?.shopOrder?.subTotal}
              </p>
            </div>
            <DeliveryBoyTracking
              data={{
                deliveryBoyLocation: deliveryBoyLocation || {
                  lat: userData.location.coordinates[1],
                  lon: userData.location.coordinates[0],
                },
                customerLocation: {
                  lat: currentOrder.deliveryAddress.latitude,
                  lon: currentOrder.deliveryAddress.longitude,
                },
              }}
            />
            {!showOtpBox ? (
              <button
                onClick={sendOTP}
                className="mt-4 w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-green-700 active:scale-95 transition-all duration-200"
              >
                Mark As Delivered
              </button>
            ) : (
              <div className="mt-4 p-4 border rounded-xl bg-gray-50">
                <p className="text-sm font-semibold mb-2">
                  Enter OTP send To{" "}
                  <span className="text-green-600">
                    {currentOrder.user.fullname}
                  </span>
                </p>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter OTP"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                />
                <button
                  onClick={verifyOtp}
                  className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
                >
                  Submit OTP
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryboyDashboard;
