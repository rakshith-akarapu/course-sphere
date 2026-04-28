import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";
import "../styles/StudentRegister.css"; // Reuse styling for now
import img from "../assets/register.png";

function EducatorRegister() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState(location.state?.name || "");
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !phone || !qualification || !specialization) {
      setError("Fill all required fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/register", {
        user: {
          username: name,
          email: email,
          password: password,
          role: "EDUCATOR",
          phone: phone,
          qualification: qualification,
          specialization: specialization
        },
        otp: ""
      });

      alert("Registration successful! Your account is pending Super Admin approval. You will receive an email once approved.");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Registration failed ❌");
    }
  };

  return (
    <div className="student-register">
      <div className="left">
        <img src={img} className="image" alt="register" />
      </div>

      <div className="right">
        <div className="student-register-container">
          <span className="back-link" onClick={() => navigate("/register")}>← Back to selection</span>
          <h2>Register as Educator</h2>

          <label>Full Name</label>
          <input type="text" placeholder="Dr. Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Email</label>
          <input type="text" placeholder="janedoe@university.edu" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <label>Phone Number</label>
          <input type="text" placeholder="e.g. 9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} />

          <label>Highest Qualification</label>
          <input type="text" placeholder="e.g. PhD, M.Tech" value={qualification} onChange={(e) => setQualification(e.target.value)} />

          <label>Specialization</label>
          <input type="text" placeholder="e.g. Data Structures, Machine Learning" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />

          {error && <p className="status-message error" style={{marginTop: "16px"}}>{error}</p>}

          <button className="registerBtn" onClick={handleRegister}>
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}

export default EducatorRegister;
