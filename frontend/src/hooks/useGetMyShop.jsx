import { useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../api";
import { useDispatch } from "react-redux";
import { setShopData } from "../redux/owner.slice";

function useGetMyShop() {
  const dispatch = useDispatch();
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
  }, []);
}

export default useGetMyShop;
