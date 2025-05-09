import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobileNo: "",
    dateOfBirth: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Employer", // Default to Employer
  });

  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { confirmPassword, ...submitData } = formData;

    try {
      const registerRes = await fetch("https://localhost:7125/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!registerRes.ok) {
        const text = await registerRes.text();
        setError(text || "Registration failed");
        return;
      }

      // Auto-login after registration
      const loginRes = await fetch("https://localhost:7125/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: submitData.email, password: submitData.password }),
      });

      if (loginRes.ok) {
        const loginData = await loginRes.json();
        login({ email: loginData.user.email, role: loginData.user.role });
        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          navigate("/home");
        }, 1500);
      } else {
        setError("Registered, but login failed.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      {showPopup && <div className="alert alert-success">Registration & Login Successful!</div>}
      <div className="card mx-auto col-md-6 p-4">
        <h3 className="text-center mb-4">Employer Register</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input type="text" className="form-control mb-2" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" className="form-control mb-2" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <input type="text" className="form-control mb-2" name="mobileNo" placeholder="Mobile No" value={formData.mobileNo} onChange={handleChange} required />
          <input type="date" className="form-control mb-2" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          <textarea className="form-control mb-2" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
          
          <div className="mb-2">
            <label>Gender:</label><br />
            {["Male", "Female", "Others"].map((g) => (
              <label key={g} className="me-2">
                <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleChange} required /> {g}
              </label>
            ))}
          </div>

          <input type="email" className="form-control mb-2" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" className="form-control mb-2" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="password" className="form-control mb-2" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
          <div className="d-flex justify-content-center"><button type="submit" className="btn btn-primary">Register</button></div>
          <p className="mt-2 text-center">Already have an account? <a href="/login">Login</a></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
