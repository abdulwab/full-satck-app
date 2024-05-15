import { configureStore } from "@reduxjs/toolkit";
import Reducer from "../features/createSlice"; // Import your slice

const store = configureStore({
  reducer: {
    counter: Reducer,
  },
});

export default store;
