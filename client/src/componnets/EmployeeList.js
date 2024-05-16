import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../features/employeeActions";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const loading = useSelector((state) => state.employees.loading);
  const error = useSelector((state) => state.employees.error);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleEdit = (employeeId) => {
    // Implement edit functionality here
    console.log("Edit employee with ID:", employeeId);
  };

  const handleDelete = (employeeId) => {
    // Implement delete functionality here
    console.log("Delete employee with ID:", employeeId);
  };

  const handleAddNewEmployee = () => {
    // Implement logic to navigate to the add new employee page or show a modal
    console.log("Adding a new employee...");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black p-4">
      <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right mb-4"
        onClick={handleAddNewEmployee}
      >
        Add New Employee
      </button>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Position</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-t">
              <td className="py-2 px-4">{employee.name}</td>
              <td className="py-2 px-4">{employee.position}</td>
              <td className="py-2 px-4">
                <button
                  className="text-blue-500 hover:underline mr-2"
                  onClick={() => handleEdit(employee.id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
