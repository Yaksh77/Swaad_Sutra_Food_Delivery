import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "../src/pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
import useGetMyShop from "./hooks/useGetMyShop";
import CreateEditShop from "./pages/CreateEditShop";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import useGetShopsByCity from "./hooks/useGetShopsByCity";

function App() {
  useGetCurrentUser();
  useGetCity();
  useGetMyShop();
  useGetShopsByCity();
  const { userData } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/create-shop"
        element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/add-food-item"
        element={userData ? <AddItem /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/edit-food-item/:itemId"
        element={userData ? <EditItem /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
}

export default App;
