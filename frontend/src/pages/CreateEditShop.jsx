import React, { useState } from "react";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import axios from "axios";
import { SERVER_API } from "../../api";
import { setShopData } from "../redux/owner.slice";

function CreateEditShop() {
  const navigate = useNavigate();
  const { shopData } = useSelector((state) => state.owner);
  const { currentCity, currentState, currentAddress } = useSelector(
    (state) => state.user
  );
  const [name, setName] = useState(shopData?.name || "");
  const [address, setAddress] = useState(shopData?.address || currentAddress);
  const [state, setState] = useState(shopData?.state || currentState);
  const [city, setCity] = useState(shopData?.city || currentCity);
  const [frontendImage, setFrontendImage] = useState(shopData?.image || null);
  const [backendImage, setBackendImage] = useState(null);
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("address", address);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.post(
        `${SERVER_API}/shop/create-edit-shop`,
        formData,
        {
          withCredentials: true,
        }
      );
      dispatch(setShopData(result.data));
    } catch (error) {
      console.log("Error occurred while processing the form data");
    }
  };
  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-green-50 relative to-white min-h-screen">
      <div className="absolute top-[20px] left-[20px] z-[10] mb-[10px]">
        <FiArrowLeftCircle
          size={25}
          className="text-[#43A047]"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-green-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <FaUtensils className="text-[#43A047] w-16 h-16" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            {shopData ? "Edit Shop" : "Add Shop"}
          </div>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Shop Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Shop Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleImage}
            />
            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State
              </label>
              <input
                type="text"
                placeholder="Enter Shop State"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                placeholder="Enter Shop City"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              placeholder="Enter Shop Address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button className="w-full text-lg bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 hover-shadow-lg transition-all cursor-pointer">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEditShop;
