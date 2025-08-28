import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      alert("Error fetching doctors");
    }
  };

  const deleteDoctor = async (id) => {
    if(window.confirm("Are you sure?")){
      await API.delete(`/doctors/${id}`);
      fetchDoctors();
    }
  };

  useEffect(() => { fetchDoctors(); }, []);

  return (
    <div>
      <h3>Doctors</h3>
      <Link to="/doctors/new" className="btn btn-success mb-3">Add Doctor</Link>
      <table className="table table-bordered">
        <thead>
          <tr><th>Name</th><th>Specialization</th><th>Contact</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {doctors.map(d => (
            <tr key={d.id}>
              <td>{d.name}</td><td>{d.specialization}</td><td>{d.contact}</td>
              <td>
                <Link to={`/doctors/${d.id}`} className="btn btn-primary btn-sm me-2">View</Link>
                <button onClick={()=>deleteDoctor(d.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorList;
