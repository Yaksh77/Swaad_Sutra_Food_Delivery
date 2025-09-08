import React, { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { SERVER_API } from "../../api";
import axios from "axios";
import { setUserData } from "../redux/user.slice";
import { CiCirclePlus } from "react-icons/ci";
import { IoReceiptOutline } from "react-icons/io5";

function Navbar() {
  const { userData, city } = useSelector((state) => state.user);
  const { shopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${SERVER_API}/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full h-[80px] flex items-center justify-center md:justify-center gap-[30px] px-[20px] fixed top-0 left-0 z-[9999] bg-[#F1F8E9]">
      {showSearch && userData.role == "user" && (
        <div className="w-[90%] h-[70px] fixed bg-white shadow-xl rounded-lg items-center gap-[20px] flex top-[80px] left-[5%] md:hidden">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <IoLocationOutline size={30} color="#43A047" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>
          <div className="w-[80%] flex items-center gap-[10px]">
            <IoSearch size={25} className="text-[#43A047] cursor-pointer" />
            <input
              type="text"
              placeholder="Search Delicious Food"
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-[#43A047]">Swaad Sutra</h1>
      {userData.role == "user" && (
        <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-xl rounded-lg items-center gap-[20px] hidden md:flex">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-gray-400">
            <IoLocationOutline size={30} color="#43A047" />
            <div className="w-[80%] truncate text-gray-600">{city}</div>
          </div>
          <div className="w-[80%] flex items-center gap-[10px]">
            <IoSearch size={25} className="text-[#43A047]" />
            <input
              type="text"
              placeholder="Search Delicious Food"
              className="px-[10px] text-gray-700 outline-0 w-full"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {userData.role == "user" &&
          (showSearch ? (
            <RxCross2
              size={25}
              className="text-[#43A047] md:hidden"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <IoSearch
              size={25}
              className="text-[#43A047] md:hidden"
              onClick={() => setShowSearch(true)}
            />
          ))}

        {userData.role == "owner" ? (
          <>
            {shopData && (
              <>
                <button className="hidden md:flex  items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#43A047]">
                  <CiCirclePlus size={20} />
                  <span>Add Food Item</span>
                </button>
                <button className="md:hidden flex  items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#43A047]">
                  <CiCirclePlus size={20} />
                </button>
              </>
            )}

            <div className="hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#43A047] font-medium">
              <IoReceiptOutline size={20} />
              <span>My Orders</span>
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#43A047]/70 rounded-full px-[6px] py-[1px]">
                0
              </span>
            </div>
            <div className="md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#43A047] font-medium">
              <IoReceiptOutline size={20} />
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#43A047]/70 rounded-full px-[6px] py-[1px]">
                0
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="relative cursor-pointer">
              <FaShoppingCart size={25} className="text-[#43A047]" />
              <span className="absolute right-[-9px] top-[-12px] text-[#43A047]">
                0
              </span>
            </div>

            <button className="hidden md:block px-3 py-1 rounded-lg  bg-[#ff4d2d]/10 text-[#43A047] text-sm font-medium">
              My Orders
            </button>
          </>
        )}

        <div
          onClick={() => setShowInfo((prevState) => !prevState)}
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#43A047] text-white text-[18px] shadow-xl font-semibold cursor-pointer"
        >
          {userData?.fullname.slice(0, 1)}
        </div>
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[9999]">
            <div className="text-[17px] font-semibold">
              {userData?.fullname}
            </div>
            <div className="md:hidden text-[#43A047] font-semibold cursor-pointer">
              My Orders
            </div>
            <div
              className="text-[#43A047] font-semibold cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
