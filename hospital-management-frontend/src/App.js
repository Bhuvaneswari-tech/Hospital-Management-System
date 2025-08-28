import React from "react";
import {  Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PatientList from "./components/patients/PatientList";
import PatientForm from "./components/patients/PatientForm";
import DoctorList from "./components/doctors/DoctorList";
import DoctorForm from "./components/doctors/DoctorForm";
import AppointmentList from "./components/appointments/AppointmentList";
import AppointmentForm from "./components/appointments/AppointmentForm";
import BillingList from "./components/billing/BillingList";
import BillingForm from "./components/billing/BillingForm";
import ProtectedRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <>
          <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/patients" element={<ProtectedRoute roles={["ADMIN"]}><PatientList /></ProtectedRoute>} />
          <Route path="/patients/new" element={<ProtectedRoute roles={["ADMIN"]}><PatientForm /></ProtectedRoute>} />

          <Route path="/doctors" element={<ProtectedRoute roles={["ADMIN","DOCTOR"]}><DoctorList /></ProtectedRoute>} />
          <Route path="/doctors/new" element={<ProtectedRoute roles={["ADMIN"]}><DoctorForm /></ProtectedRoute>} />

          <Route path="/appointments" element={<ProtectedRoute roles={["ADMIN","DOCTOR","PATIENT"]}><AppointmentList /></ProtectedRoute>} />
          <Route path="/appointments/new" element={<ProtectedRoute roles={["ADMIN","DOCTOR","PATIENT"]}><AppointmentForm /></ProtectedRoute>} />

          <Route path="/billing" element={<ProtectedRoute roles={["ADMIN"]}><BillingList /></ProtectedRoute>} />
          <Route path="/billing/new" element={<ProtectedRoute roles={["ADMIN"]}><BillingForm /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
