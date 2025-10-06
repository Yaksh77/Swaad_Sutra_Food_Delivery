import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_API } from "../../api";

function useUpdateLocation() {
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const updateLocation = async (lat, lon) => {
      const result = await axios.post(
        `${SERVER_API}/user/update-user-location`,
        {
          lat,
          lon,
        },
        { withCredentials: true }
      );
    };
    navigator.geolocation.watchPosition((position) => {
      updateLocation(position.coords.latitude, position.coords.longitude);
    });
  }, [userData]);
}

export default useUpdateLocation;
