import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Hospital Management</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {token ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/patients">Patients</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/doctors">Doctors</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/appointments">Appointments</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/billing">Billing</Link></li>
                <li className="nav-item"><button className="btn btn-danger" onClick={logout}>Logout</button></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
