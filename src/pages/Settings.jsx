import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../utils/auth";
import "../styles/settings.css";

function Settings() {
  const currentUser = getCurrentUser();
  const fullName = currentUser?.name || "Learner";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "Learner";
  const lastName = nameParts.slice(1).join(" ");
  const email = currentUser?.email || "learner@coursesphere.com";
  const phone = currentUser?.phone || "+91 0000000000";
  const country = currentUser?.country || "India";
  const location = currentUser?.location || "Not set";
  const designation = currentUser?.designation || "Learner";
  const role = currentUser?.role || "Student";

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

            <h3>{fullName}</h3>
            <p>{location}</p>
            <p>{country}</p>

            <hr />

            <div className="profile-info">
              <p>👤 {designation}</p>
              <p>🎓 {role}</p>
            </div>

            <hr />

            <div className="profile-contact">
              <p>📞 {phone}</p>
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
                <input type="text" defaultValue={firstName} />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input type="text" defaultValue={lastName} />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue={email} />
              </div>

              <div className="form-group phone-group">
                <label>Phone Number</label>
                <div className="phone-input">
                  <span className="country-code">🇮🇳 +91</span>
                  <input type="text" defaultValue={phone.replace("+91", "").trim()} />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="Change Password" />
              </div>

              <div className="form-group">
                <label>Nationality</label>
                <select defaultValue={country}>
                  <option>{country}</option>
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>

              <div className="form-group">
                <label>Designation</label>
                <select defaultValue={designation}>
                  <option>{designation}</option>
                  <option>Developer</option>
                  <option>Designer</option>
                  <option>Student</option>
                  <option>Educator</option>
                </select>
              </div>

            </div>

            <div className="save-btn-wrapper">
              <button className="save-btn">Save</button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Settings;
