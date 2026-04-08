import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import API from "../../api/api";
import { clearCurrentUser, setCurrentUser } from "../../utils/auth";
import "../../styles/educator-layout.css";

const EducatorSettings = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  // 🔥 CORE FIELDS
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // 🔥 EDUCATOR SPECIFIC FIELDS 
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  
  const [saved, setSaved] = useState(false);

  // 🔥 FETCH USER DATA
  useEffect(() => {
    API.get("/user/profile", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => {
      const user = res.data;
      const nameParts = (user.username || "").split(" ");

      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" ") || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      
      // Use the actual payload columns we established in the backend refactor!
      setQualification(user.qualification || "");
      setSpecialization(user.specialization || "");
    })
    .catch(err => console.error(err));
  }, []);

  const mergedName = `${firstName} ${lastName}`.trim();

  // 🔥 SAVE TO BACKEND
  const handleSave = () => {
    const updatedUser = {
      username: mergedName,
      email: email,
      phone: phone,
      qualification: qualification,
      specialization: specialization
    };

    API.put("/user/profile", updatedUser, {
      headers: { Authorization: "Bearer " + token }
    })
    .then(() => {
      setCurrentUser({
        name: mergedName,
        email: email,
        phone: phone,
        role: "educator"
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="dashboard">

      <div className="sidebar">
        <h2>CourseSphere</h2>
        <ul>
          <li onClick={()=>navigate("/educator/dashboard")}>Dashboard</li>
          <li onClick={()=>navigate("/educator/courses")}>My Courses</li>
          <li onClick={()=>navigate("/educator/create-course")}>Create Course</li>
          <li onClick={()=>navigate("/educator/students")}>Students</li>
          <li className="active">Settings</li>
        </ul>
      </div>

      <div className="main">

        <div className="topbar">
          <div className="search-container">
            <FaSearch />
            <input placeholder="Search settings..." />
          </div>

          <div className="nav-right">
            <FaUserCircle onClick={goToSettings}/>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="content">
          <div className="section-title">Account Settings</div>

          <div className="card">
            <div className="card-header">
              <h3>Educator Profile</h3>
            </div>

            <div className="grid">
              <div className="field">
                <label>First Name</label>
                <input placeholder="e.g. John" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
              </div>

              <div className="field">
                <label>Last Name</label>
                <input placeholder="e.g. Doe" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
              </div>

              <div className="field">
                <label>Email Address</label>
                <input disabled style={{background: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed'}} value={email} />
              </div>

              <div className="field">
                <label>Phone Number</label>
                <input placeholder="e.g. 9876543210" value={phone} onChange={(e)=>setPhone(e.target.value)} />
              </div>

              <div className="field">
                <label>Highest Qualification</label>
                <input placeholder="e.g. Ph.D. in Computer Science" value={qualification} onChange={(e)=>setQualification(e.target.value)} />
              </div>

              <div className="field">
                <label>Specialization Domain</label>
                <input placeholder="e.g. Artificial Intelligence" value={specialization} onChange={(e)=>setSpecialization(e.target.value)} />
              </div>
            </div>

            <div className="actions">
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
              {saved && <span className="saved">Profile updated successfully! ✅</span>}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default EducatorSettings;