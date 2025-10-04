import { useEffect } from "react";
import axios from "axios";
import { SERVER_API } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../redux/user.slice";

function useGetMyOrders() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const result = await axios.get(`${SERVER_API}/order/my-orders`, {
          withCredentials: true,
        });

        console.log(result.data);
        dispatch(setMyOrders(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, [userData]);
}

export default useGetMyOrders;
