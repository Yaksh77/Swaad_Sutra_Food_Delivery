import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_API } from "../../api";

function useUpdateLocation() {
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData) return; // wait until logged in

    const updateLocation = async (lat, lon) => {
      try {
        await axios.post(
          `${SERVER_API}/user/update-user-location`,
          { lat, lon },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Failed to update user location:", error.response?.data);
      }
    };

    // Ask permission explicitly
    const watcher = navigator.geolocation.watchPosition(
      (position) => {
        updateLocation(position.coords.latitude, position.coords.longitude);
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, [userData]);
}

export default useUpdateLocation;
