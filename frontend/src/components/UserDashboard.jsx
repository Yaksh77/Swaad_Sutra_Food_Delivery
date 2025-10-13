import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { categories } from "../../category";
import CategoryCard from "./CategoryCard";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import { setItemsInMyCity } from "../redux/user.slice";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();
  const navigate = useNavigate();
  const { currentCity, shopsInMyCity, itemsInMyCity, searchItems } =
    useSelector((state) => state.user);
  const [showCateLeftButton, setShowCateLeftButton] = useState(false);
  const [showCateRightButton, setShowCateRightButton] = useState(false);
  const [showShopLeftButton, setShowShopLeftButton] = useState(false);
  const [showShopRightButton, setShowShopRightButton] = useState(false);
  const [updatedItemsList, setUpdatedItemsList] = useState([]);

  const updatebutton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.clientWidth + element.scrollLeft < element.scrollWidth
      );
    }
  };
  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const handleFilterByCategory = async (category) => {
    if (category == "All") {
      setUpdatedItemsList(itemsInMyCity);
    } else {
      const filteredList = itemsInMyCity.filter(
        (item) => item.category === category
      );
      setUpdatedItemsList(filteredList);
    }
  };

  useEffect(() => {
    setUpdatedItemsList(itemsInMyCity);
  }, [itemsInMyCity]);

  useEffect(() => {
    if (cateScrollRef.current) {
      updatebutton(
        cateScrollRef,
        setShowCateLeftButton,
        setShowCateRightButton
      );
      cateScrollRef.current.addEventListener("scroll", () => {
        updatebutton(
          cateScrollRef,
          setShowCateLeftButton,
          setShowCateRightButton
        );
      });
    }

    if (shopScrollRef.current) {
      updatebutton(
        shopScrollRef,
        setShowShopLeftButton,
        setShowShopRightButton
      );
      shopScrollRef.current.addEventListener("scroll", () => {
        updatebutton(
          shopScrollRef,
          setShowShopLeftButton,
          setShowShopRightButton
        );
      });
    }

    return () => {
      cateScrollRef.current?.removeEventListener("scroll", () => {
        updatebutton(
          cateScrollRef,
          setShowCateLeftButton,
          setShowCateRightButton
        );
      });
      shopScrollRef.current?.removeEventListener("scroll", () => {
        updatebutton(
          shopScrollRef,
          setShowShopLeftButton,
          setShowShopRightButton
        );
      });
    };
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#F1F8E9] overflow-y-auto">
      <Navbar />
      {searchItems && searchItems.length > 0 && (
        <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-5 bg-white shadow-md rounded-2xl mt-4">
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-semibold border-b border-gray-200 pb-2">
            Search Results
          </h1>
          <div className="w-full h-auto flex flex-wrap gap-6 justify-center">
            {searchItems.map((item, index) => (
              <FoodCard data={item} key={index} />
            ))}
          </div>
        </div>
      )}
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Inspiration for your first order
        </h1>
        <div className="w-full relative">
          {showCateLeftButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "left")}
              className="absolute left-1 top-1/2 text-2xl -translate-y-1/2 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-800 z-10"
            >
              <CiCircleChevLeft />
            </button>
          )}
          <div
            className="w-full relative flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d] scrollbar-track-transparent scroll-smooth"
            ref={cateScrollRef}
          >
            {categories.map((category, index) => (
              <CategoryCard
                name={category.category}
                image={category.image}
                key={index}
                onClick={() => handleFilterByCategory(category.category)}
              />
            ))}
          </div>
          {showCateRightButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "right")}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 text-white text-2xl p-2 rounded-full shadow-lg hover:bg-green-800 z-10"
            >
              <CiCircleChevRight />
            </button>
          )}
        </div>
      </div>
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Best shop in {currentCity}
        </h1>
        <div className="w-full relative">
          {showShopLeftButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "left")}
              className="absolute left-1 top-1/2 text-2xl -translate-y-1/2 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-800 z-10"
            >
              <CiCircleChevLeft />
            </button>
          )}
          <div
            className="w-full relative flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d] scrollbar-track-transparent scroll-smooth"
            ref={shopScrollRef}
          >
            {shopsInMyCity.map((shop, index) => (
              <CategoryCard
                name={shop.name}
                image={shop.image}
                key={index}
                onClick={() => navigate(`/shop/${shop._id}`)}
              />
            ))}
          </div>
          {showShopRightButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "right")}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 text-white text-2xl p-2 rounded-full shadow-lg hover:bg-green-800 z-10"
            >
              <CiCircleChevRight />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Suggested Food Items
        </h1>
        <div className="w-full h-auto flex flex-wrap gap-[20px] justify-center">
          {updatedItemsList.map((item, index) => (
            <FoodCard key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
