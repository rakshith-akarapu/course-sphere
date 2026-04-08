import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "../../styles/Educator/EducatorRegister.css";

function EducatorRegister() {

  const navigate = useNavigate();

  // 🔥 STATE
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 🔥 REGISTER FUNCTION
  const handleRegister = () => {

    if (!name || !email || !password) {
      alert("Please fill all required fields ❗");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    const newUser = {
      username: name,
      email: email,
      password: password,
      role: "EDUCATOR"
    };

    API.post("/auth/register", newUser)
      .then(() => {
        alert("Registered successfully 🎉");
        navigate("/login");
      })
      .catch(err => {
        console.error(err);
        alert("Registration failed ❌");
      });
  };

  const currentYear = new Date().getFullYear();
  const startYear = 1950;

  const years = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return (
    <div className="educatorRegister">

      <button 
        className="backBtn"
        onClick={() => navigate("/register")}
      >
        ←
      </button>

      <h1 className="joinTitle">Join us</h1>

      <div className="roleTabs">
        <button className="roleActive">Educator</button>
      </div>

      <div className="formCard">

        <h2>Basic info</h2>

        <label>Full Name</label>
        <input 
          type="text" 
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <label>Email</label>
        <input 
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <label>Password</label>
        <input 
          type="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <label>Confirm Password</label>
        <input 
          type="password"
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
        />

        {/* Optional fields (UI only for now) */}

        <label>Qualification</label>
        <input type="text" placeholder="e.g., M.Tech, PhD" />

        <label>Specialization</label>
        <input type="text" placeholder="e.g., AI, ML" />

        <label>Date of Birth</label>

        <div className="dobGroup">
          <select>
            <option value="">Month</option>
            {[
              "January","February","March","April","May","June",
              "July","August","September","October","November","December"
            ].map((month, index) => (
              <option key={index}>{month}</option>
            ))}
          </select>

          <select>
            <option value="">Date</option>
            {[...Array(31)].map((_, index) => (
              <option key={index + 1}>{index + 1}</option>
            ))}
          </select>

          <select>
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* 🔥 REGISTER BUTTON */}
        <button 
          className="registerBtn"
          onClick={handleRegister}
        >
          Register
        </button>

      </div>

    </div>
  );
}

export default EducatorRegister;