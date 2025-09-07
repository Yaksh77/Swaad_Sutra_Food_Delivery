import { useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../redux/user.slice";

function useGetCity() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      //   console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${
          import.meta.env.VITE_GEO_API_KEY
        }`
      );
      //   console.log(response.data.results[0].city);
      let city = response?.data?.results[0]?.city;
      dispatch(setCity(city));
    });
  }, [userData]);
}

export default useGetCity;
