import { useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setCity, setState } from "../redux/user.slice";

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
      // console.log(response.data);
      let city = response?.data?.results[0]?.city;
      let state = response?.data?.results[0]?.state;
      let address =
        response?.data?.results[0]?.address_line2 ||
        response?.data?.results[0]?.address_line1;
      dispatch(setCity(city));
      dispatch(setState(state));
      dispatch(setAddress(address));
    });
  }, [userData]);
}

export default useGetCity;
