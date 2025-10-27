import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentCity: "",
    currentState: "",
    currentAddress: "",
    shopsInMyCity: [],
    itemsInMyCity: [],
    cartItems: [],
    totalAmount: 0,
    myOrders: [],
    searchItems: [],
    socket: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setState: (state, action) => {
      state.currentState = action.payload;
    },
    setAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setShopsInMyCity: (state, action) => {
      state.shopsInMyCity = action.payload;
    },
    setItemsInMyCity: (state, action) => {
      state.itemsInMyCity = action.payload;
    },
    addToCart: (state, action) => {
      const cartItem = action.payload;

      const existingItem = state.cartItems?.find(
        (item) => item.id == cartItem.id
      );
      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        state.cartItems?.push(cartItem);
      }
      state.totalAmount = state.cartItems?.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id == id);
      if (item) {
        item.quantity = quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      state.totalAmount = state.cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
    setMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
    addMyOrder: (state, action) => {
      state.myOrders = [action.payload, ...state.myOrders];
    },
    updateOrderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;
      const order = state.myOrders.find((o) => o._id == orderId);
      if (order) {
        if (order.shopOrders && order.shopOrders.shop._id == shopId) {
          order.shopOrders.status = status;
        }
      }
    },
    updateRealtimeOrderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;
      const order = state.myOrders.find((o) => o._id == orderId);
      if (order) {
        const shopOrder = order.shopOrders.find((so) => so.shop._id == shopId);
        if (shopOrder) {
          shopOrder.status = status;
        }
      }
    },
    setSearchItems: (state, action) => {
      state.searchItems = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setCartItemsAfterCheckout: (state, action) => {
      state.cartItems = null;
    },
  },
});
export const {
  setUserData,
  setCity,
  setState,
  setAddress,
  setShopsInMyCity,
  setItemsInMyCity,
  addToCart,
  updateQuantity,
  removeCartItem,
  setMyOrders,
  addMyOrder,
  updateOrderStatus,
  setSearchItems,
  setSocket,
  updateRealtimeOrderStatus,
  setCartItemsAfterCheckout,
} = userSlice.actions;
export default userSlice.reducer;
