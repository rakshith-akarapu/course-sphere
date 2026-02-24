import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getCurrentUser, setCurrentUser } from "../utils/auth";
import "../styles/settings.css";

function Settings() {
  const currentUser = getCurrentUser();
  const fullName = currentUser?.name || "Learner";
  const nameParts = fullName.split(" ");
  const initialFirstName = nameParts[0] || "Learner";
  const initialLastName = nameParts.slice(1).join(" ");
  const initialEmail = currentUser?.email || "learner@coursesphere.com";
  const initialPhone = currentUser?.phone || "";
  const initialCountry = currentUser?.country || "India";
  const initialLocation = currentUser?.location || "Not set";
  const initialDesignation = currentUser?.designation || "Learner";
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone.replace("+91", "").trim());
  const [country, setCountry] = useState(initialCountry);
  const [location, setLocation] = useState(initialLocation);
  const [designation, setDesignation] = useState(initialDesignation);
  const [saved, setSaved] = useState(false);
  const mergedName = `${firstName.trim() || "Learner"} ${lastName.trim()}`.trim();
  const mergedPhone = phone.trim() ? `+91 ${phone.trim()}` : "";
  const role = currentUser?.role
    ? `${currentUser.role.charAt(0).toUpperCase()}${currentUser.role.slice(1)}`
    : "Student";

  const handleSave = () => {
    setCurrentUser({
      ...(currentUser || {}),
      name: mergedName,
      email: email.trim().toLowerCase() || "learner@coursesphere.com",
      phone: mergedPhone,
      country: country.trim() || "India",
      location: location.trim() || "Not set",
      designation: designation.trim() || "Learner",
      role: currentUser?.role || "student",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <div className="settings-container">

          {/* LEFT PROFILE CARD */}
          <div className="profile-card">
            <div className="profile-image">
              <img
                src="/profile.png"
                alt="Profile"
                onError={(event) => {
                  event.currentTarget.src = "/login-image.png";
                }}
              />
            </div>

            <h3>{mergedName}</h3>
            <p>{location}</p>
            <p>{country}</p>

            <hr />

            <div className="profile-info">
              <p>👤 {designation}</p>
              <p>🎓 {role}</p>
            </div>

            <hr />

            <div className="profile-contact">
              <p>📞 {mergedPhone || "Not set"}</p>
              <p>✉ {email}</p>
              <p>📄 PDT - I</p>
            </div>
          </div>

          {/* RIGHT EDIT FORM */}
          <div className="edit-profile">

            <h2>Edit Profile</h2>

            <div className="form-grid">

              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group phone-group">
                <label>Phone Number</label>
                <div className="phone-input">
                  <span className="country-code">🇮🇳 +91</span>
                  <input
                    type="text"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Change Password" />
              </div>

              <div className="form-group">
                <label>Nationality</label>
                <select value={country} onChange={(event) => setCountry(event.target.value)}>
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>

              <div className="form-group">
                <label>Designation</label>
                <select
                  value={designation}
                  onChange={(event) => setDesignation(event.target.value)}
                >
                  <option>Developer</option>
                  <option>Designer</option>
                  <option>Student</option>
                  <option>Educator</option>
                </select>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </div>

            </div>

            <div className="save-btn-wrapper">
              <button className="save-btn" onClick={handleSave}>Save</button>
              {saved && <p className="save-status">Profile updated</p>}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;
