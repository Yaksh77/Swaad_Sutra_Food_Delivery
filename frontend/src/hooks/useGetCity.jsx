import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setCity, setState } from "../redux/user.slice";
import { setDeliveryLocation, setDeliveryAddress } from "../redux/map.slice";

function useGetCity() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      dispatch(setDeliveryLocation({ latitude, longitude }));
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${
          import.meta.env.VITE_GEO_API_KEY
        }`
      );
      let city = response?.data?.results[0]?.city;
      let state = response?.data?.results[0]?.state;
      let address =
        response?.data?.results[0]?.address_line2 ||
        response?.data?.results[0]?.address_line1;
      dispatch(setCity(city));
      dispatch(setState(state));
      dispatch(setAddress(address));

      const finalAddress = response?.data?.results[0]?.address_line2;
      dispatch(setDeliveryAddress(finalAddress));
    });
  }, [userData]);
}

export default useGetCity;
