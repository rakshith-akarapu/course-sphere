import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "../../styles/Student/StudentRegister.css";

function StudentRegister() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [yearSemester, setYearSemester] = useState("");
  const [error, setError] = useState("");

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = currentYear; y >= 1950; y--) years.push(y);

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
        username: name,
        email: email,
        password: password,
        role: "student"
      });

      alert("Registration successful ✅");
      navigate("/");

    } catch (err) {
      console.error(err);
      setError("Registration failed ❌");
    }
  };

  return (
    <div className="studentRegister">

      <button className="backBtn" onClick={() => navigate("/register")}>
        ←
      </button>

      <h1 className="joinTitle">Join us</h1>

      <div className="roleTabs">
        <button className="roleActive">Student</button>
      </div>

      <div className="formCard">

        <h2>Basic info</h2>

        <p className="desc">
          Create your student account to start learning on CourseSphere.
        </p>

        <label>Full Name</label>
        <input value={name} onChange={(e)=>setName(e.target.value)} />

        <label>Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />

        <label>Confirm Password</label>
        <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />

        <label>Department</label>
        <input value={department} onChange={(e)=>setDepartment(e.target.value)} />

        <label>Year/Semester</label>
        <input value={yearSemester} onChange={(e)=>setYearSemester(e.target.value)} />

        {error && <p className="auth-error">{error}</p>}

        <button className="registerBtn" onClick={handleRegister}>
          Register
        </button>

      </div>

    </div>
  );
}

export default StudentRegister;