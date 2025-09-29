import React from "react";
import Navbar from "./Navbar";
import { categories } from "../../category";
import CategoryCard from "./CategoryCard";
import { CiCircleChevLeft } from "react-icons/ci";
import { CiCircleChevRight } from "react-icons/ci";

function UserDashboard() {
  return (
    <div className="w-screen min-h-screen flex flex-col gap-5 items-center bg-[#F1F8E9] overflow-y-auto">
      <Navbar />
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Inspiration for your first order
        </h1>
        <div className="w-full relative">
          <button className="absolute left-1 top-1/2 text-2xl -translate-y-1/2 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-800 z-10">
            <CiCircleChevLeft />
          </button>
          <div className="w-full relative flex overflow-x-auto gap-4 pb-2 scrollbar-thin scrollbar-thumb-[#ff4d2d] scrollbar-track-transparent scroll-smooth">
            {categories.map((category, index) => (
              <CategoryCard data={category} key={index} />
            ))}
          </div>
          <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 text-white text-2xl p-2 rounded-full shadow-lg hover:bg-green-800 z-10">
            <CiCircleChevRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
