import React, { useState, useEffect } from "react";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [updatedRole, setUpdatedRole] = useState("");
  const [updatedCompany, setUpdatedCompany] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("https://localhost:7125/api/Application");
        if (!response.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error(error);
        setError("Error fetching job applications");
      }
    };
    fetchApplications();
  }, []);

  const handleEdit = (app) => {
    setSelectedApp(app);
    setUpdatedRole(app.role);
    setUpdatedCompany(app.companyName);
  };

  const handleUpdate = async () => {
    if (!updatedRole || !updatedCompany) {
      alert("Please provide the updated role and company name.");
      return;
    }

    const updatedApplication = {
      ...selectedApp,
      role: updatedRole,
      companyName: updatedCompany,
    };

    try {
      const response = await fetch(`https://localhost:7125/api/Application/${selectedApp.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedApplication),
      });

      if (!response.ok) {
        throw new Error("Failed to update application");
      }

      const updatedApps = applications.map((app) =>
        app.id === selectedApp.id ? updatedApplication : app
      );
      setApplications(updatedApps);
      setSelectedApp(null);
      setUpdatedRole("");
      setUpdatedCompany("");
    } catch (error) {
      console.error(error);
      setError("Error updating job application");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Job Applications Received</h2>
      {error && <p className="text-danger">{error}</p>}
      {applications.length === 0 ? (
        <p>No job applications found.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Candidate Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Company</th>
              <th>Applied At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.role}</td>
                <td>{app.companyName}</td>
                <td>{new Date(app.appliedAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(app)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedApp && (
        <div className="mt-4">
          <h4>Edit Application</h4>
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              className="form-control"
              value={updatedRole}
              onChange={(e) => setUpdatedRole(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Company</label>
            <input
              type="text"
              className="form-control"
              value={updatedCompany}
              onChange={(e) => setUpdatedCompany(e.target.value)}
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={handleUpdate}>
            Update Application
          </button>
        </div>
      )}
    </div>
  );
}

export default Applications;
