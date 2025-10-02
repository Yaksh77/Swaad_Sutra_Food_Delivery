import { FiArrowLeftCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import CartItemCard from "../components/CartItemCard";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.user);
  return (
    <div className="min-h-screen bg-[#F1F8E9] flex justify-center p-6">
      <div className="w-full max-w-[800px]">
        <div className="flex items-center gap-[20px] mb-6">
          <div className="z-[10]">
            <FiArrowLeftCircle
              size={25}
              className="text-[#43A047]"
              onClick={() => navigate("/")}
            />
          </div>
          <h1 className="text-2xl font-bold text-start">Your Cart</h1>
        </div>
        {cartItems.length == 0 ? (
          <p className="text-lg text-gray-600 text-center">
            Your cart is empty
          </p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <CartItemCard data={item} key={index} />
              ))}
            </div>
            <div className="mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center border">
              <h1 className="text-lg font-semibold">Total Amount</h1>
              <span className="text-xl font-bold text-green-600">
                ₹{totalAmount}
              </span>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-green-700 transition cursor-pointer"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
