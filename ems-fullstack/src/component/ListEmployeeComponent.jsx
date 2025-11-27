import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {

  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, []);

  const getAllEmployees = () => {
    axios.get("http://localhost:8081/api/emp")
      .then(res => setEmployees(res.data));
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:8081/api/emp/${id}`)
      .then(() => getAllEmployees());
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Employee List</h2>

      <button className="btn btn-primary mb-3"
        onClick={() => navigate("/add-employee")}>
        Add Employee
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th><th>First</th><th>Last</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            employees.map(emp =>
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>
                  <button className="btn btn-info mx-2"
                    onClick={() => navigate(`/update-employee/${emp.id}`)}>
                    Update
                  </button>

                  <button className="btn btn-danger"
                    onClick={() => deleteEmployee(emp.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
