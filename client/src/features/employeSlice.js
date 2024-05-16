import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchEmployeesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchEmployeesSuccess(state, action) {
      state.loading = false;
      state.list = action.payload;
    },
    fetchEmployeesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addEmployeeStart(state) {
      state.loading = true;
      state.error = null;
    },
    addEmployeeSuccess(state, action) {
      state.loading = false;
      state.list.push(action.payload);
    },
    addEmployeeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteEmployeeStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteEmployeeSuccess(state, action) {
      state.loading = false;
      state.list = state.list.filter(
        (employee) => employee.id !== action.payload
      );
    },
    deleteEmployeeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateEmployeeStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateEmployeeSuccess(state, action) {
      state.loading = false;
      state.list = state.list.map((employee) =>
        employee.id === action.payload.id ? action.payload : employee
      );
    },
    updateEmployeeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  addEmployeeStart,
  addEmployeeSuccess,
  addEmployeeFailure,
  deleteEmployeeStart,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  updateEmployeeStart,
  updateEmployeeSuccess,
  updateEmployeeFailure,
} = employeeSlice.actions;

export default employeeSlice.reducer;
