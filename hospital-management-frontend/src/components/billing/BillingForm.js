import React, { useState, useEffect } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

const BillingForm = () => {
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [treatments, setTreatments] = useState([{ treatment: "", cost: 0 }]);
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

  const handleChangeTreatment = (index, field, value) => {
    const newTreatments = [...treatments];
    newTreatments[index][field] = field === "cost" ? Number(value) : value;
    setTreatments(newTreatments);
  };

  const addTreatment = () => setTreatments([...treatments, { treatment: "", cost: 0 }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/billing", { patientId, doctorId, treatments });
    navigate("/billing");
  };

  return (
    <div className="col-md-8 offset-md-2 mt-3">
      <h3>Generate Bill</h3>
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
        {treatments.map((t, index) => (
          <div className="row mb-2" key={index}>
            <div className="col">
              <input type="text" className="form-control" placeholder="Treatment" value={t.treatment} onChange={e=>handleChangeTreatment(index,"treatment",e.target.value)} required/>
            </div>
            <div className="col">
              <input type="number" className="form-control" placeholder="Cost" value={t.cost} onChange={e=>handleChangeTreatment(index,"cost",e.target.value)} required/>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addTreatment}>Add Treatment</button>
        <br/>
        <button className="btn btn-primary">Generate</button>
      </form>
    </div>
  );
};

export default BillingForm;
