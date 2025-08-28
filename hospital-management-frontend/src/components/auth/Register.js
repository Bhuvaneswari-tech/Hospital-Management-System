import React, { useState } from "react";
import API from "../../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT"); // default role
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { username, email, password, role });
      alert(res.data.message || "Registered successfully!");
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="col-md-4 offset-md-4 mt-5">
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Role</label>
          <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="PATIENT">Patient</option>
            <option value="DOCTOR">Doctor</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;
