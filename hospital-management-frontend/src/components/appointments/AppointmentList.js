import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (err) {
      alert("Error fetching appointments");
    }
  };

  const cancelAppointment = async (id) => {
    if(window.confirm("Cancel this appointment?")){
      await API.delete(`/appointments/${id}`);
      fetchAppointments();
    }
  };

  useEffect(() => { fetchAppointments(); }, []);

  return (
    <div>
      <h3>Appointments</h3>
      <Link to="/appointments/new" className="btn btn-success mb-3">Book Appointment</Link>
      <table className="table table-bordered">
        <thead>
          <tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Reason</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{a.patientName}</td><td>{a.doctorName}</td><td>{new Date(a.appointmentDate).toLocaleString()}</td>
              <td>{a.reason}</td><td>{a.status}</td>
              <td>
                <Link to={`/appointments/${a.id}`} className="btn btn-primary btn-sm me-2">View</Link>
                <button onClick={()=>cancelAppointment(a.id)} className="btn btn-danger btn-sm">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
