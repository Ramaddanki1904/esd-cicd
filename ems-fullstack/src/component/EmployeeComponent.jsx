import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

function EmployeeComponent() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ FETCH FOR UPDATE
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8081/api/emp/${id}`)
        .then(response => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  // ✅ SAVE / UPDATE
  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    const employee = {
      firstName: firstName,
      lastName: lastName,
      email: email
    };

    console.log("SENDING:", employee);

    if (id) {
      axios.put(`http://localhost:8081/api/emp/${id}`, employee)
        .then(() => navigate("/emplist"))
        .catch(err => console.error("UPDATE ERROR:", err));
    } else {
      axios.post("http://localhost:8081/api/emp", employee)
        .then(() => navigate("/emplist"))
        .catch(err => console.error("SAVE ERROR:", err));
    }
  };

  return (
    <div className="container st-ba">
      <div className="row justify-content-center">
        <div className="card card-top">

          <h3 className="text-center title">
            {id ? "Update Employee" : "Add Employee"}
          </h3>

          <div className="card-body">

            <form onSubmit={saveOrUpdateEmployee}>

              <div className="form-group mb-2">
                <label>First Name :</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label>Last Name :</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label>Email :</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button className="btn btn-success mt-3">
                {id ? "Update" : "Save"}
              </button>

              <button
                type="button"
                className="btn btn-danger mt-3 ms-2"
                onClick={() => navigate("/emplist")}
              >
                Cancel
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeComponent;
