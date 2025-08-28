import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

const PatientForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/patients", {
      name, age, gender, contact, address,
      medicalHistory: medicalHistory.split(",").map(x => x.trim())
    });
    navigate("/patients");
  };

  return (
    <div className="col-md-6 offset-md-3 mt-3">
      <h3>Add Patient</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3"><label>Name</label><input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} required/></div>
        <div className="mb-3"><label>Age</label><input type="number" className="form-control" value={age} onChange={e=>setAge(e.target.value)} required/></div>
        <div className="mb-3">
          <label>Gender</label>
          <select className="form-control" value={gender} onChange={e=>setGender(e.target.value)}>
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
        <div className="mb-3"><label>Contact</label><input type="text" className="form-control" value={contact} onChange={e=>setContact(e.target.value)} required/></div>
        <div className="mb-3"><label>Address</label><input type="text" className="form-control" value={address} onChange={e=>setAddress(e.target.value)} required/></div>
        <div className="mb-3"><label>Medical History (comma separated)</label><input type="text" className="form-control" value={medicalHistory} onChange={e=>setMedicalHistory(e.target.value)} /></div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PatientForm;
