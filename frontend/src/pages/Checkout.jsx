import { FiArrowLeftCircle } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BiCurrentLocation } from "react-icons/bi";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import { setDeliveryAddress, setDeliveryLocation } from "../redux/map.slice";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDeliveryDining } from "react-icons/md";
import { TbDeviceMobileCheck } from "react-icons/tb";
import { FaRegCreditCard } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { SERVER_API } from "../../api";
import { addMyOrder } from "../redux/user.slice";

function RecenterMap({ location }) {
  if (location.lat && location.lon) {
    let map = useMap();
    map.setView([location.lat, location.lon], 16, { animate: true });
  }
  return null;
}

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { deliveryLocation, deliveryAddress } = useSelector(
    (state) => state.map
  );
  const { cartItems, totalAmount } = useSelector((state) => state.user);
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const geoLocationApiKey = import.meta.env.VITE_GEO_API_KEY;

  const deliveryFee = totalAmount > 500 ? 0 : 40;
  const amountWithDeliveryFee = totalAmount + deliveryFee;

  const onDragEnd = (e) => {
    const lat = e.target._latlng.lat;
    const lon = e.target._latlng.lng;

    dispatch(setDeliveryLocation({ lat, lon }));
    getAddressByLatLon(lat, lon);
  };

  const getAddressByLatLon = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${geoLocationApiKey}`
      );

      dispatch(setDeliveryAddress(response?.data?.results[0]?.address_line2));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      dispatch(setDeliveryLocation({ lat, lon }));
      getAddressByLatLon(lat, lon);
    });
  };

  const getLatLonByAddress = async () => {
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&apiKey=${geoLocationApiKey}`
      );
      const lat = response.data.features[0].properties.lat;
      const lon = response.data.features[0].properties.lon;
      dispatch(setDeliveryLocation({ lat, lon }));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        `${SERVER_API}/order/place-order`,
        {
          cartItems,
          paymentMethod,
          deliveryAddress: {
            text: addressInput,
            latitude: deliveryLocation.lat,
            longitude: deliveryLocation.lon,
          },
          totalAmount,
        },
        { withCredentials: true }
      );
      dispatch(addMyOrder(response.data));
      navigate("/order-placed");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setAddressInput(deliveryAddress);
  }, [deliveryAddress]);

  return (
    <div className="min-h-screen bg-[#F1F8E9] flex items-center justify-center p-6">
      <div className="absolute top-[20px] left-[20px] z-[10]">
        <FiArrowLeftCircle
          size={25}
          className="text-[#43A047]"
          onClick={() => navigate("/cart")}
        />
      </div>
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

        <section>
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2 text-gray-800">
            <FaLocationDot className="text-green-600" /> Delivery Location
          </h2>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your delivery address..."
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            />
            <button
              onClick={getLatLonByAddress}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center justify-center"
            >
              <IoSearch />
            </button>
            <button
              onClick={getCurrentLocation}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center"
            >
              <BiCurrentLocation />
            </button>
          </div>
          <div className="rounded-xl border overflow-hidden">
            <div className="h-64 w-full flex items-center justify-center">
              <MapContainer
                className="w-full h-full"
                center={[
                  deliveryLocation?.lat ?? 0,
                  deliveryLocation?.lon ?? 0,
                ]}
                zoom={16}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={deliveryLocation} />
                <Marker
                  position={[
                    deliveryLocation?.lat ?? 0,
                    deliveryLocation?.lon ?? 0,
                  ]}
                  draggable
                  eventHandlers={{ dragend: onDragEnd }}
                />
              </MapContainer>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Payment Method
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition cursor-pointer ${
                paymentMethod == "cod"
                  ? `border-green-600 bg-green-50`
                  : `border-gray-200 hover:border-gray-300`
              }`}
              onClick={() => setPaymentMethod("cod")}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-200">
                <MdDeliveryDining className="text-green-800 text-xl" />
              </span>
              <div>
                <p className="font-medium text-gray-800">Cash On Delivery</p>
                <p className="text-xs text-gray-500">
                  Pay when your food arrives
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition cursor-pointer ${
                paymentMethod == "online"
                  ? `border-green-600 bg-green-50`
                  : `border-gray-200 hover:border-gray-300`
              }`}
              onClick={() => setPaymentMethod("online")}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <TbDeviceMobileCheck className="text-purple-700 text-lg" />
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <FaRegCreditCard className="text-blue-700 text-lg" />
              </span>
              <div>
                <p className="font-medium text-gray-800">
                  UPI / Credit / Debit Card
                </p>
                <p className="text-xs text-gray-500">Pay Securely Online</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Order Summary
          </h2>
          <div className="rounded-xl border bg-gray-50 p-4 space-y-2">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-sm text-gray-700"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <hr className="border-gray-400 my-2" />
            <div className="flex justify-between font-medium text-gray-800">
              <span>Subtotal</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between font-medium text-gray-700">
              <span>Delivery Fee</span>
              <span>{deliveryFee == 0 ? "Free" : deliveryFee}</span>
            </div>
            <div className="flex justify-between text-lg text-green-600 font-bold">
              <span>Total</span>
              <span>₹{amountWithDeliveryFee}</span>
            </div>
          </div>
        </section>

        <button
          onClick={handlePlaceOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
        >
          {paymentMethod == "cod" ? "Place Order" : "Pay & Place Order"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
