import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";
import "../styles/StudentRegister.css";
import img from "../assets/register.png";

function StudentRegister() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState(location.state?.name || "");
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [yearSemester, setYearSemester] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
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
            role: "STUDENT",
            department: department,
            yearSemester: yearSemester
        },
        otp: "123456" // Dummy OTP for now since we bypassed it or will handle it
      });

      alert("Registration successful ✅");
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
          <h2>Register as Student</h2>
          
          <label>Full Name</label>
          <input type="text" placeholder="John Doe" value={name} onChange={(e)=>setName(e.target.value)} />

          <label>Email</label>
          <input type="text" placeholder="johndoe@university.edu" value={email} onChange={(e)=>setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" placeholder="Create a password" value={password} onChange={(e)=>setPassword(e.target.value)} />

          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />

          <label>Department</label>
          <input type="text" placeholder="Computer Science" value={department} onChange={(e)=>setDepartment(e.target.value)} />

          <label>Year/Semester</label>
          <input type="text" placeholder="2nd Year / 4th Semester" value={yearSemester} onChange={(e)=>setYearSemester(e.target.value)} />

          {error && <p className="status-message error" style={{marginTop: "16px"}}>{error}</p>}

          <button className="registerBtn" onClick={handleRegister}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentRegister;