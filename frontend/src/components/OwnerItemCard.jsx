import React from "react";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { SERVER_API } from "../../api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setShopData } from "../redux/owner.slice";

function OwnerItemCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const result = await axios.get(
        `${SERVER_API}/item/delete-item/${data._id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(setShopData(result.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden border border-[#43A047] w-full max-w-2xl">
      <div className="w-36  flex-shrink-0 bg-gray-50">
        <img src={data.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col justify-between p-3 flex-1">
        <div className="">
          <h2 className="text-base font-semibold text-[#43A047]">
            {data.name}
          </h2>
          <p>
            <span className="font-medium text-gray-70">Category: </span>
            {data.category}
          </p>
          <p>
            <span className="font-medium text-gray-70">Food Type: </span>
            {data.foodType}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-[#43A047] font-bold">
            <MdOutlineCurrencyRupee size={17} />
            {data.price}
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full cursor-pointer hover:bg-[#ff4d2d]/10 text-[#43A047]">
              <MdModeEditOutline
                size={16}
                onClick={() => navigate(`/edit-food-item/${data._id}`)}
              />
            </div>
            <div
              className="p-2 rounded-full cursor-pointer hover:bg-[#ff4d2d]/10 text-[#43A047]"
              onClick={handleDelete}
            >
              <FaTrashAlt size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerItemCard;
