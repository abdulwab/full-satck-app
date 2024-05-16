import axios from "axios";
import {
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
} from "./employeSlice";

export const fetchEmployees = () => async (dispatch) => {
  dispatch(fetchEmployeesStart());
  try {
    const response = await axios.get("/api/employees");
    dispatch(fetchEmployeesSuccess(response.data));
  } catch (error) {
    dispatch(fetchEmployeesFailure(error.message));
  }
};

export const addEmployee = (employeeData) => async (dispatch) => {
  dispatch(addEmployeeStart());
  try {
    const response = await axios.post("/api/employees", employeeData);
    dispatch(addEmployeeSuccess(response.data));
  } catch (error) {
    dispatch(addEmployeeFailure(error.message));
  }
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
  dispatch(deleteEmployeeStart());
  try {
    await axios.delete(`/api/employees/${employeeId}`);
    dispatch(deleteEmployeeSuccess(employeeId));
  } catch (error) {
    dispatch(deleteEmployeeFailure(error.message));
  }
};

export const updateEmployee = (employeeData) => async (dispatch) => {
  dispatch(updateEmployeeStart());
  try {
    const response = await axios.put(
      `/api/employees/${employeeData.id}`,
      employeeData
    );
    dispatch(updateEmployeeSuccess(response.data));
  } catch (error) {
    dispatch(updateEmployeeFailure(error.message));
  }
};
