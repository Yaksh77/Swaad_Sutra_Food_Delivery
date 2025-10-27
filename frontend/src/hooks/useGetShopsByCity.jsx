import { useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setShopsInMyCity } from "../redux/user.slice";

function useGetShopsByCity() {
  const dispatch = useDispatch();
  const { currentCity, userData } = useSelector((state) => state.user);
  useEffect(() => {
    if (!currentCity || !userData) return;

    const fetchShop = async () => {
      try {
        const result = await axios.get(
          `${SERVER_API}/shop/get-shop-by-city/${currentCity}`,
          {
            withCredentials: true,
          }
        );

        dispatch(setShopsInMyCity(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchShop();
  }, [currentCity]);
}

export default useGetShopsByCity;
