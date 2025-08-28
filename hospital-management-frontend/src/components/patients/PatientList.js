import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    try {
      const res = await API.get("/patients");
      setPatients(res.data);
    } catch (err) {
      alert("Error fetching patients");
    }
  };

  const deletePatient = async (id) => {
    if (window.confirm("Are you sure?")) {
      await API.delete(`/patients/${id}`);
      fetchPatients();
    }
  };

  useEffect(() => { fetchPatients(); }, []);

  return (
    <div>
      <h3>Patients</h3>
      <Link to="/patients/new" className="btn btn-success mb-3">Add Patient</Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th><th>Age</th><th>Gender</th><th>Contact</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No data found</td>
            </tr>
          ) : (
            patients.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td><td>{p.age}</td><td>{p.gender}</td><td>{p.contact}</td>
                <td>
                  <Link to={`/patients/${p.id}`} className="btn btn-primary btn-sm me-2">View</Link>
                  <button onClick={() => deletePatient(p.id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
