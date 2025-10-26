import React, { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { GiChickenLeg } from "react-icons/gi";
import { TiStarFullOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/user.slice";

function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <TiStarFullOutline className="text-yellow-500 text-lg" />
        ) : (
          <TiStarOutline className="text-yellow-500 text-lg" />
        )
      );
    }
    return stars;
  };
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrease = () => {
    setQuantity((prevQuantity) =>
      prevQuantity > 0 ? prevQuantity - 1 : prevQuantity
    );
  };

  return (
    <div className="w-[250px] rounded-2xl border-2 border-green-600 bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative w-full h-[170px] flex justify-center items-center bg-white">
        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
          {data.foodType == "veg" ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <GiChickenLeg className="text-red-600 text-lg" />
          )}
        </div>
        <img
          src={data.image}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex-1 flex flex-col p-4">
        <h1 className="font-semibold text-gray-900 text-base truncate">
          {data.name}
        </h1>
        <div className="flex items-center gap-1 mt-1">
          {renderStars(data.rating?.average || 0)}
          <span className="text-xs text-gray-500">
            {data.rating?.count || 0}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto p-3">
        <span className="font-bold text-gray-900 text-lg">₹{data.price}</span>
        <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
          <button
            onClick={handleDecrease}
            className="px-2 py-1 hover:bg-gray-100 transition cursor-pointer"
          >
            <FaMinus size={12} />
          </button>
          <span>{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-2 py-1 hover:bg-gray-100 transition cursor-pointer"
          >
            <FaPlus size={12} />
          </button>
          <button
            onClick={() => {
              if (quantity > 0) {
                dispatch(
                  addToCart({
                    id: data._id,
                    name: data.name,
                    price: data.price,
                    image: data.image,
                    shop: data.shop,
                    quantity,
                    foodType: data.foodType,
                  })
                );
              }
            }}
            className={`${
              cartItems.some((i) => i.id == data._id)
                ? `bg-gray-700`
                : `bg-green-600`
            } text-white px-3 py-2 transition-colors cursor-pointer`}
          >
            <FaCartPlus size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
