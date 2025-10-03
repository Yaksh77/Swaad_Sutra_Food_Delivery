import { useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setItemsInMyCity } from "../redux/user.slice";

function useGetItemsByCity() {
  const dispatch = useDispatch();
  const { currentCity } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await axios.get(
          `${SERVER_API}/item/get-item-by-city/${currentCity}`,
          {
            withCredentials: true,
          }
        );

        dispatch(setItemsInMyCity(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, [currentCity]);
}

export default useGetItemsByCity;
