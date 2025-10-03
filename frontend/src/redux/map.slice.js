import { createSlice } from "@reduxjs/toolkit";

const mapSlice = createSlice({
  name: "map",
  initialState: {
    deliveryLocation: {
      lat: null,
      lon: null,
    },
    deliveryAddress: "",
  },
  reducers: {
    setDeliveryLocation: (state, action) => {
      const { lat, lon } = action.payload;
      state.deliveryLocation.lat = lat;
      state.deliveryLocation.lon = lon;
    },
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
  },
});
export const { setDeliveryLocation, setDeliveryAddress } = mapSlice.actions;
export default mapSlice.reducer;
