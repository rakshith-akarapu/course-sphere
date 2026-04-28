import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import { clearCurrentUser } from "../../utils/auth";
import "../../styles/educator-layout.css";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("pending");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const fetchData = async (tab) => {
    setLoading(true);
    setError("");
    try {
      let endpoint = "";
      if (tab === "pending") endpoint = "/superadmin/educators/pending";
      else if (tab === "educators") endpoint = "/superadmin/educators/approved";
      else if (tab === "students") endpoint = "/superadmin/students";
      else if (tab === "courses") endpoint = "/superadmin/courses";

      const res = await API.get(endpoint);
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, token]);

  const approveEducator = async (id) => {
    try {
      await API.put(`/superadmin/educators/approve/${id}`);
      alert("Educator approved successfully! An email has been sent to them.");
      fetchData("pending");
    } catch (err) {
      console.error(err);
      alert("Failed to approve educator");
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Course Sphere</h2>
        <ul>
          <li className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>Pending Approvals</li>
          <li className={activeTab === "educators" ? "active" : ""} onClick={() => setActiveTab("educators")}>Educators</li>
          <li className={activeTab === "students" ? "active" : ""} onClick={() => setActiveTab("students")}>Students</li>
        </ul>
      </div>

      <div className="main">
        <div className="topbar">
          <div className="search-container">
          </div>
          <div className="nav-right">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="content">
          <div className="section-title">
            {activeTab === "pending" && "Pending Educator Approvals"}
            {activeTab === "educators" && "Approved Educators"}
            {activeTab === "students" && "All Students"}
          </div>

          <div className="card">
            {error && <p className="auth-error">{error}</p>}
            {loading ? <p>Loading data...</p> : (
              <table>
                <thead>
                  <tr>
                    {activeTab === "pending" && (
                      <><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></>
                    )}
                    {(activeTab === "educators" || activeTab === "students") && (
                      <><th>Name</th><th>Email</th><th>Role</th></>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>No records found</td>
                    </tr>
                  )}
                  {data.map((item, index) => (
                    <tr key={index}>
                      {activeTab === "pending" && (
                        <>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.role}</td>
                          <td>Pending</td>
                          <td>
                            <button className="btn btn-primary btn-sm" onClick={() => approveEducator(item.id)}>Approve</button>
                          </td>
                        </>
                      )}
                      {(activeTab === "educators" || activeTab === "students") && (
                        <>
                          <td>{item.username}</td>
                          <td>{item.email}</td>
                          <td>{item.role}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
