import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { clearCurrentUser, getCurrentUser, setCurrentUser } from "../../utils/auth";

const EducatorSettings = () => {

  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  const [fullName, setFullName] = useState(user?.name || "Educator");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [specialization, setSpecialization] = useState(user?.designation || "Educator");
  const [location, setLocation] = useState(user?.location || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setCurrentUser({
      ...(user || {}),
      name: fullName.trim() || "Educator",
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      designation: specialization.trim() || "Educator",
      location: location.trim(),
      role: "educator",
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <>
      <style>{`

        * { 
          margin: 0; 
          padding: 0; 
          box-sizing: border-box; 
          font-family: "Poppins", sans-serif; 
        }

        .dashboard { 
          display: flex; 
          background: #f4f6fb; 
          min-height: 100vh; 
        }

        .sidebar { 
          width: 230px; 
          background: white; 
          padding: 30px 20px; 
          border-right: 1px solid #eee; 
        }

        .sidebar h2 { 
          color: #6c63ff; 
          margin-bottom: 35px; 
        }

        .sidebar li { 
          list-style: none; 
          padding: 12px; 
          margin-bottom: 12px; 
          border-radius: 8px; 
          cursor: pointer; 
          font-size: 14px; 
          transition: 0.25s ease; 
        }

        .sidebar li:hover { 
          background: #f1f1ff; 
          transform: translateX(4px); 
        }

        .sidebar li.active { 
          background: #6c63ff; 
          color: white; 
          box-shadow: 0 10px 20px rgba(108, 99, 255, 0.28); 
        }

        .main { 
          flex: 1; 
          display: flex; 
          flex-direction: column; 
        }

        /* UPDATED NAVBAR */

        .topbar {
          background: white;
          padding: 10px 30px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          border-bottom: 1px solid #eee;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .profile-icon {
          color: #555;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .profile-icon:hover {
          color: #6c63ff;
          transform: scale(1.1);
        }

        .logout-btn {
          border: none;
          padding: 6px 16px;
          border-radius: 999px;
          background: linear-gradient(90deg,#6c63ff,#8b7cff);
          color: #fff;
          cursor: pointer;
          font-weight: 600;
          transition: 0.2s ease;
        }

        .logout-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 18px rgba(108,99,255,0.25);
        }

        .content { 
          padding: 32px 40px; 
        }

        .card { 
          background: white; 
          border-radius: 14px; 
          padding: 26px; 
          box-shadow: 0 8px 25px rgba(0,0,0,0.06); 
          max-width: 760px; 
          transition: transform 0.25s ease, box-shadow 0.25s ease; 
        }

        .card:hover { 
          transform: translateY(-3px); 
          box-shadow: 0 14px 30px rgba(0,0,0,0.08); 
        }

        .card h3 { 
          margin-bottom: 18px; 
        }

        .grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 16px; 
        }

        .field { 
          display: flex; 
          flex-direction: column; 
        }

        .field label { 
          margin-bottom: 6px; 
          color: #555; 
          font-size: 14px; 
        }

        .field input { 
          padding: 11px 12px; 
          border: 1px solid #ddd; 
          border-radius: 8px; 
          outline: none; 
        }

        .field input:focus { 
          border-color: #6c63ff; 
          box-shadow: 0 0 0 3px rgba(108,99,255,0.12); 
        }

        .actions { 
          margin-top: 18px; 
          display: flex; 
          align-items: center; 
          gap: 12px; 
        }

        .save-btn { 
          border: none; 
          padding: 11px 18px; 
          border-radius: 8px; 
          background: #6c63ff; 
          color: #fff; 
          cursor: pointer; 
          transition: 0.2s ease; 
        }

        .save-btn:hover { 
          background: #574fd6; 
          transform: translateY(-1px); 
          box-shadow: 0 10px 22px rgba(87, 79, 214, 0.32); 
        }

        .saved { 
          color: #16a34a; 
          font-size: 13px; 
          font-weight: 600; 
        }

      `}</style>

      <div className="dashboard">

        <div className="sidebar">
          <h2>CourseSphere</h2>
          <ul>
            <li onClick={() => navigate("/educator/dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/educator/courses")}>My Courses</li>
            <li onClick={() => navigate("/educator/create-course")}>Create Course</li>
            <li onClick={() => navigate("/educator/students")}>Students</li>
            <li className="active" onClick={() => navigate("/educator/settings")}>Settings</li>
          </ul>
        </div>

        <div className="main">

          <div className="topbar">
            <div className="nav-right">
              <FaUserCircle
                size={24}
                className="profile-icon"
                onClick={goToSettings}
              />
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="content">
            <div className="card">
              <h3>Educator Settings</h3>

              <div className="grid">
                <div className="field">
                  <label>Full Name</label>
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>

                <div className="field">
                  <label>Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="field">
                  <label>Phone</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="field">
                  <label>Specialization</label>
                  <input
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Location</label>
                  <input value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
              </div>

              <div className="actions">
                <button className="save-btn" onClick={handleSave}>
                  Save Changes
                </button>
                {saved && <span className="saved">Saved</span>}
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default EducatorSettings;