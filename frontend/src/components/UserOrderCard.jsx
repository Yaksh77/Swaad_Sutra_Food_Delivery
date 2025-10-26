import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_API } from "../../api";
import { FaStar } from "react-icons/fa6";

function UserOrderCard({ data }) {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState({});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleRating = async (itemId, rating) => {
    try {
      const response = await axios.post(
        `${SERVER_API}/item/rating`,
        { itemId, rating },
        { withCredentials: true }
      );

      setSelectedRating((prev) => ({
        ...prev,
        [itemId]: rating,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between border-b pb-2">
        <div>
          <p className="font-semibold">Order: #{data._id.slice(-6)}</p>
          <p className="text-sm text-gray-500">
            Date: {formatDate(data.createdAt)}
          </p>
        </div>
        <div className="text-right">
          {data.paymentMethod == "cod" ? (
            <p className="text-sm text-gray-500">
              {data.paymentMethod?.toUpperCase()}
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Payment:
              {data.payment ? "True" : "False"}
            </p>
          )}

          <p className="font-medium text-blue-600">
            {data.shopOrders?.[0].status}
          </p>
        </div>
      </div>

      {data.shopOrders.map((shopOrder, index) => (
        <div className=" rounded-lg p-3 bg-green-50 space-y-3 mt-3" key={index}>
          <p>{shopOrder.shop.name}</p>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {shopOrder.shopOrderItems.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 border rounded-lg p-2 bg-white"
              >
                <img
                  src={item.item.image}
                  alt=""
                  className="w-full h-24 object-cover rounded"
                />
                <p className="text-sm font-semibold mt-1">{item.name}</p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity} x ₹{item.price}
                </p>

                {shopOrder.status == "delivered" && (
                  <div className="flex space-x-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        className={`text-lg ${
                          selectedRating[item.item._id] >= star
                            ? `text-yellow-400`
                            : `text-gray-400`
                        }`}
                        onClick={() => handleRating(item.item._id, star)}
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center border-t pt-2">
            <p className="font-semibold ">Subtotal: ₹{shopOrder.subTotal}</p>
            <span className="text-sm text-blue-600">{shopOrder.status}</span>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center border-t pt-2">
        <p className="font-semibold">Total: ₹{data.totalAmount}</p>
        <button
          onClick={() => navigate(`/track-order/${data._id}`)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition cursor-pointer"
        >
          Track Order
        </button>
      </div>
    </div>
  );
}

export default UserOrderCard;
