import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { SERVER_API } from "../../api";
import { useEffect } from "react";
import { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import DeliveryBoyTracking from "../components/DeliveryBoyTracking";
import { useSelector } from "react-redux";

function TrackOrder() {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [liveLocations, setLiveLocations] = useState({});
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { socket } = useSelector((state) => state.user);

  const handleGetOrder = async () => {
    try {
      const response = await axios.get(
        `${SERVER_API}/order/get-order-by-id/${orderId}`,
        { withCredentials: true }
      );
      setCurrentOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.on(
      "updateDeliveryLocation",
      ({ deliveryBoyId, latitude, longitude }) => {
        setLiveLocations((prev) => ({
          ...prev,
          [deliveryBoyId]: { lat: latitude, lon: longitude },
        }));
      }
    );
  }, []);

  useEffect(() => {
    handleGetOrder();
  }, [orderId]);

  return (
    <div className="max-w-4xl mx-auto p-4 flex flex-col gap-6">
      <div className="relative flex items-center gap-4 top-[20px] left-[20px] z-[10] mb-[10px]">
        <FiArrowLeftCircle
          size={25}
          className="text-[#43A047]"
          onClick={() => navigate("/")}
        />
        <h1 className="text-2xl font-bold md:text-center">Track Order</h1>
      </div>
      {currentOrder?.shopOrders.map((shopOrder, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-xl shadow-md border border-green-300 space-y-4"
        >
          <div>
            <p className="text-lg font-bold mb-2 text-green-600">
              {shopOrder.shop.name}
            </p>
            <p className="font-semibold">
              <span>Items: </span>{" "}
              {shopOrder.shopOrderItems.map((item) => item.name).join(",")}
            </p>
            <p>
              <span className="font-semibold">Subtotal: </span>
              {shopOrder.subTotal}
            </p>
            <p className="mt-6">
              <span className="font-semibold">Delivery Address: </span>
              {currentOrder.deliveryAddress.text}
            </p>
          </div>
          {shopOrder.status != "delivered" ? (
            <>
              {shopOrder.assignedDeliveryBoy ? (
                <div className="text-sm text-gray-700">
                  <p className="font-semibold">
                    <span>Delivery Boy Name: </span>
                    {shopOrder.assignedDeliveryBoy.fullname}
                  </p>
                  <p className="font-semibold">
                    <span>Delivery Boy Contact: </span>
                    {shopOrder.assignedDeliveryBoy.mobile}
                  </p>
                </div>
              ) : (
                <p>Currently no delivery boy has accepted the order</p>
              )}
            </>
          ) : (
            <p className="text-green-600 font-semibold text-lg">Delivered</p>
          )}
          {shopOrder.assignedDeliveryBoy &&
            shopOrder.status !== "delivered" && (
              <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-md">
                {" "}
                <DeliveryBoyTracking
                  data={{
                    deliveryBoyLocation: liveLocations[
                      shopOrder.assignedDeliveryBoy._id
                    ] || {
                      lat: shopOrder.assignedDeliveryBoy.location
                        .coordinates[1],
                      lon: shopOrder.assignedDeliveryBoy.location
                        .coordinates[0],
                    },
                    customerLocation: {
                      lat: currentOrder.deliveryAddress.latitude,
                      lon: currentOrder.deliveryAddress.longitude,
                    },
                  }}
                />
              </div>
            )}
        </div>
      ))}
    </div>
  );
}

export default TrackOrder;
