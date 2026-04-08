import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { setCurrentUser } from "../utils/auth";
import "../styles/settings.css";

function Settings() {
  // Core fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  // Educator fields
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");

  // Student fields
  const [department, setDepartment] = useState("");
  const [yearSemester, setYearSemester] = useState("");

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 🔥 FETCH PROFILE
  useEffect(() => {
    API.get("/user/profile")
    .then(res => {
      const user = res.data;
      const nameParts = (user.username || "").split(" ");

      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" "));
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setRole((user.role || "").toUpperCase());

      // Distinct fields depending on role (returned cleanly by backend now)
      setQualification(user.qualification || "");
      setSpecialization(user.specialization || "");
      setDepartment(user.department || "");
      setYearSemester(user.yearSemester || "");
    })
    .catch(err => {
      console.error(err);
      setErrorMessage("We couldn't load your profile right now.");
    });
  }, []);

  const mergedName = `${firstName} ${lastName}`.trim();

  // 🔥 SAVE PROFILE
  const handleSave = () => {
    setLoading(true);
    setErrorMessage("");
    setSaved(false);

    const updatedUser = {
      username: mergedName,
      email: email,
      phone: phone,
      department: role === "STUDENT" ? department : null,
      yearSemester: role === "STUDENT" ? yearSemester : null,
      qualification: role === "EDUCATOR" ? qualification : null,
      specialization: role === "EDUCATOR" ? specialization : null
    };

    API.put("/user/profile", updatedUser)
    .then(() => {
      // Sync local context if needed
      setCurrentUser({
        name: mergedName,
        email,
        phone,
        role: role.toLowerCase()
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    })
    .catch(err => {
      console.error(err);
      setErrorMessage(err.response?.data || "Unable to save your profile right now.");
    })
    .finally(() => setLoading(false));
  };

  const isEducator = role === "EDUCATOR";

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <div className="settings-container">
          <div className="profile-card">
            <div className="profile-image-wrapper">
              <div className="profile-image-glow"></div>
              <img src="/profile.png" alt="Profile" className="profile-img" />
            </div>

            <h3 className="profile-name">{mergedName || "Loading..."}</h3>
            <p className="profile-role-badge">{role || "User"}</p>

            <div className="profile-divider"></div>

            <div className="profile-info-list">
              <div className="info-item">
                <span className="info-icon" aria-hidden="true">✉</span>
                <div className="info-text">
                  <small>Email</small>
                  <span>{email || "—"}</span>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon" aria-hidden="true">📞</span>
                <div className="info-text">
                  <small>Phone</small>
                  <span>{phone || "Not set"}</span>
                </div>
              </div>

              {/* Dynamic Info Based on Role */}
              {isEducator ? (
                <>
                  <div className="info-item">
                    <span className="info-icon" aria-hidden="true">🎓</span>
                    <div className="info-text">
                      <small>Specialization</small>
                      <span>{specialization || "Not set"}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="info-item">
                    <span className="info-icon" aria-hidden="true">🏛</span>
                    <div className="info-text">
                      <small>Department</small>
                      <span>{department || "Not set"}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="edit-profile-card">
            <div className="edit-header">
              <span className="settings-kicker">Profile</span>
              <h2>Account Settings</h2>
              <p>Manage your profile details and preferences</p>
            </div>

            <div className="settings-form">
              <h4 className="section-title">Personal Information</h4>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="Enter your first name" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Enter your last name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} disabled className="disabled-input" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="e.g. 9876543210" />
                </div>
              </div>

              {/* Dynamic Fields Section */}
              <h4 className="section-title dynamic-title">{isEducator ? "Professional Details" : "Academic Details"}</h4>
              <div className="form-grid">
                {isEducator ? (
                  <>
                    <div className="form-group">
                      <label>Highest Qualification</label>
                      <input type="text" value={qualification} onChange={(e)=>setQualification(e.target.value)} placeholder="e.g. M.Tech" />
                    </div>
                    <div className="form-group">
                      <label>Specialization</label>
                      <input type="text" value={specialization} onChange={(e)=>setSpecialization(e.target.value)} placeholder="e.g. Artificial Intelligence" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label>Department</label>
                      <input type="text" value={department} onChange={(e)=>setDepartment(e.target.value)} placeholder="e.g. Computer Science and Engineering" />
                    </div>
                    <div className="form-group">
                      <label>Year / Semester</label>
                      <input type="text" value={yearSemester} onChange={(e)=>setYearSemester(e.target.value)} placeholder="e.g. 2nd Year, 4th Sem" />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="save-btn-wrapper">
              {errorMessage && (
                <p className="status-message error settings-status">
                  {errorMessage}
                </p>
              )}

              {saved && (
                <p className="status-message success settings-status">
                  Profile updated successfully.
                </p>
              )}

              <button
                className={`btn btn-primary save-btn ${loading ? "loading" : ""}`}
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
