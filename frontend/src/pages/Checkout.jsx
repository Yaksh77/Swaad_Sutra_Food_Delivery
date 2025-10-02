import { FiArrowLeftCircle } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BiCurrentLocation } from "react-icons/bi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";

function Checkout() {
  const { deliveryLocation, deliveryAddress } = useSelector(
    (state) => state.map
  );
  return (
    <div className="min-h-screen bg-[#F1F8E9] flex items-center justify-center p-6">
      <div className="absolute top-[20px] left-[20px] z-[10]">
        <FiArrowLeftCircle
          size={25}
          className="text-[#43A047]"
          onClick={() => navigate("/")}
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
            />
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg flex items-center justify-center">
              <IoSearch />
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center justify-center">
              <BiCurrentLocation />
            </button>
          </div>
          <div className="rounded-xl border overflow-hidden">
            <div className="h-64 w-full flex items-center justify-center">
              {console.log(deliveryLocation)}
              <MapContainer
                className="w-full h-full"
                center={[
                  deliveryLocation?.lat ?? 0,
                  deliveryLocation?.lon ?? 0,
                ]}
                zoom={14}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    deliveryLocation?.lat ?? 0,
                    deliveryLocation?.lon ?? 0,
                  ]}
                />
              </MapContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Checkout;
