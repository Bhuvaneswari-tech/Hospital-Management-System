import React, { useState, useEffect } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

const AppointmentForm = () => {
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reason, setReason] = useState("");
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const pRes = await API.get("/patients");
      setPatients(pRes.data);
      const dRes = await API.get("/doctors");
      setDoctors(dRes.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/appointments", { patientId, doctorId, appointmentDate, reason });
    navigate("/appointments");
  };

  return (
    <div className="col-md-6 offset-md-3 mt-3">
      <h3>Book Appointment</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Patient</label>
          <select className="form-control" value={patientId} onChange={e=>setPatientId(e.target.value)} required>
            <option value="">Select Patient</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="mb-3">
          <label>Doctor</label>
          <select className="form-control" value={doctorId} onChange={e=>setDoctorId(e.target.value)} required>
            <option value="">Select Doctor</option>
            {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div className="mb-3"><label>Date & Time</label><input type="datetime-local" className="form-control" value={appointmentDate} onChange={e=>setAppointmentDate(e.target.value)} required/></div>
        <div className="mb-3"><label>Reason</label><input type="text" className="form-control" value={reason} onChange={e=>setReason(e.target.value)} required/></div>
        <button className="btn btn-primary">Book</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
