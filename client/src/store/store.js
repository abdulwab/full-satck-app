import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employeSlice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export default store;
