import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { categories } from "../../category";
import CategoryCard from "./CategoryCard";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";

function UserDashboard() {
  const cateScrollRef = useRef();
  const [showCateLeftButton, setShowCateLeftButton] = useState(false);
  const [showCateRightButton, setShowCateRightButton] = useState(false);

  const updatebutton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.clientWidth + element.scrollLeft < element.scrollWidth
      );
      // console.log("Client Width : ", element.clientWidth);
      // console.log("Scroll Left : ", Number.parseInt(element.scrollLeft));
      console.log("Scroll Width : ", element.scrollWidth);
      console.log(element.clientWidth + Number.parseInt(element.scrollLeft));
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

  useEffect(() => {
    if (cateScrollRef.current) {
      cateScrollRef.current.addEventListener("scroll", () => {
        updatebutton(
          cateScrollRef,
          setShowCateLeftButton,
          setShowCateRightButton
        );
      });
    }
  }, []);
  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#F1F8E9] overflow-y-auto">
      <Navbar />
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
              <CategoryCard data={category} key={index} />
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
    </div>
  );
}

export default UserDashboard;
