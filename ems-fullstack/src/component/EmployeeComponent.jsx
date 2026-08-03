import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {

  const navigate = useNavigate();
  const { id } = useParams();  // ✅ will be undefined for Add, defined for Update

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // ✅ If ID exists → load employee for UPDATE
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8081/api/emp/${id}`)
        .then(res => {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
        })
        .catch(err => {
          console.error("❌ Fetch error:", err);
        });
    }
  }, [id]);

  // ✅ Handles BOTH Add & Update
  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    const employee = { firstName, lastName, email };

    // ✅ UPDATE
    if (id) {
      axios.put(`http://localhost:8081/api/emp/${id}`, employee)
        .then(() => {
          alert("✅ Employee Updated Successfully");
          navigate("/employees");
        })
        .catch(err => {
          console.error("❌ Update error:", err);
          alert("Update failed");
        });

    
    } else {
      axios.post("http://localhost:8081/api/emp", employee)
        .then(() => {
          alert("✅ Employee Added Successfully");
          navigate("/employees");
        })
        .catch(err => {
          console.error("❌ Add error:", err);
          alert("Add failed");
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">
        {id ? "Update Employee" : "Add Employee"}
      </h2>

      <div className="card col-md-6 offset-md-3 p-4">
        <form>

          <div className="form-group mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-success"
            onClick={saveOrUpdateEmployee}
          >
            {id ? "Update" : "Save"}
          </button>

          <button
            type="button"
            className="btn btn-secondary mx-2"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
};

export default EmployeeComponent;
