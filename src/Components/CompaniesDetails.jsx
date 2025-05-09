import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CompanyDetails() {
  const { companyName } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    experience: "",
  });

  const [selectedRole, setSelectedRole] = useState(null); // Track clicked role

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(`https://localhost:7125/api/Company/${companyName}`);
        if (!response.ok) throw new Error("Company not found");

        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error("Error fetching company:", error);
        setCompany(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [companyName]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingApplications = JSON.parse(localStorage.getItem("applications")) || [];

    const newApplication = {
      ...formData,
      companyName,
      appliedAt: new Date().toISOString(),
    };

    localStorage.setItem("applications", JSON.stringify([...existingApplications, newApplication]));
    console.log("Application submitted:", newApplication);

    setSubmitted(true);

    setTimeout(() => {
      navigate("/companies");
    }, 2000);
  };

  if (loading) return <div className="container mt-5 text-center">Loading company details...</div>;

  if (!company) {
    return (
      <div className="container mt-5 text-center">
        <h2>Company Not Found</h2>
        <p>We couldn't find details for {companyName}.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Column */}
        <div className="col-md-4">
          <div className="card p-4 mb-4">
            <h3>{company.name}</h3>
            <p className="text-muted">{company.location}</p>
            <p>{company.description}</p>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-info mt-3"
            >
              Visit Website
            </a>
          </div>

          <div className="card p-4">
            <h5>Open Roles at {company.name}</h5>
            <ul className="list-group">
              {company.roles.map((role, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => setSelectedRole(role)}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{role}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-8">
          <div className="card p-4">
            <h5>Apply for a Role</h5>
            {submitted ? (
              <div className="alert alert-success mt-3">
                Thank you for applying! We’ll get back to you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Role</option>
                    {company.roles.map((role, index) => (
                      <option key={index} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <select
                    name="experience"
                    className="form-select"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Experience</option>
                    {company.experience.map((exp, i) => (
                      <option key={i} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-success">
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Role Details */}
      {selectedRole && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedRole(null)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedRole}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedRole(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Description:</strong> This is a placeholder description for the{" "}
                  <strong>{selectedRole}</strong> role. You can update this with real data from your
                  backend if needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyDetails;
