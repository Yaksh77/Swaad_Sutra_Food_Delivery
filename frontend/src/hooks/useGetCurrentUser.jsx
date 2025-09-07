import { useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../api";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/user.slice";

function useGetCurrentUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${SERVER_API}/user/current-user`, {
          withCredentials: true,
        });

        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);
}

export default useGetCurrentUser;
