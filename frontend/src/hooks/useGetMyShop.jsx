import { useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setShopData } from "../redux/owner.slice";

function useGetMyShop() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${SERVER_API}/shop/get-shop`, {
          withCredentials: true,
        });

        dispatch(setShopData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchShop();
  }, [userData]);
}

export default useGetMyShop;
