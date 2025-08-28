import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

const DoctorForm = () => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/doctors", { name, specialization, contact, email });
    navigate("/doctors");
  };

  return (
    <div className="col-md-6 offset-md-3 mt-3">
      <h3>Add Doctor</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3"><label>Name</label><input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)} required/></div>
        <div className="mb-3"><label>Specialization</label><input type="text" className="form-control" value={specialization} onChange={e=>setSpecialization(e.target.value)} required/></div>
        <div className="mb-3"><label>Contact</label><input type="text" className="form-control" value={contact} onChange={e=>setContact(e.target.value)} required/></div>
        <div className="mb-3"><label>Email</label><input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default DoctorForm;
