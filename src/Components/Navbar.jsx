import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from "./../assets/Images/joblogo.jpg";
import profileLogo from "./../assets/Images/Profilelogo.avif";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const isAdmin = currentUser?.role === "admin";

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img
            src={logo}
            alt="logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          Job Portal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {/* Show public links only if not admin */}
            {!isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/jobs">Jobs</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/companies">Companies</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/services">Services</Link>
                </li>
              </>
            )}

            {/* Show admin-only links */}
            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-danger" to="/admin">Admin Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-danger" to="/admin/applications">Job Applications</Link>
                </li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <li className="nav-item d-flex align-items-center">
                <img
                  src={profileLogo}
                  alt="Profile"
                  width="30"
                  height="30"
                  className="rounded-circle me-2"
                />
                <span className="nav-link">{currentUser.userName}</span>
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item btn btn-primary d-flex justify-content-center align-items-center" style={{width:"100px", height:"40px", border:"2px solid #000", borderRadius:"20px"}}>
                  <Link className="nav-link text-white" to="/login">Login</Link>
                </li>
                <li className="nav-item btn btn-warning d-flex justify-content-center align-items-center" style={{width:"100px", height:"40px", border:"2px solid #000", borderRadius:"20px"}}>
                  <Link className="nav-link text-dark" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
