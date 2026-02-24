import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Educator/EducatorRegister.css";

function EducatorRegister() {

  const navigate = useNavigate();

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

        <p className="desc">
          Create your educator account to start teaching on CourseSphere.
          Share your expertise, manage courses, and guide students through
          interactive learning experiences.
          Your profile helps learners discover your skills and qualifications.
        </p>

        <p className="note">
          {/* *All fields required unless noted. */}
        </p>

        <label>Full Name</label>
        <input type="text" />

        <label>Password</label>
        <input type="password" />

        <label>Confirm Password</label>
        <input type="password" />

        <label>Qualification</label>
        <input type="text" placeholder="e.g., M.Tech, PhD, MBA" />

        <label>Specialization</label>
        <input type="text" placeholder="e.g., Data Science, Marketing" />

        <label>What's your gender? (optional)</label>
        <div className="radioGroup">
          <label><input type="radio" name="gender" /> Female</label>
          <label><input type="radio" name="gender" /> Male</label>
          <label><input type="radio" name="gender" /> Non-binary</label>
        </div>

        <label>What's your date of birth?</label>

        <div className="dobGroup">

          {/* Month */}
          <select>
            <option value="">Month</option>
            {[
              "January","February","March","April","May","June",
              "July","August","September","October","November","December"
            ].map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </select>

          {/* Date */}
          <select>
            <option value="">Date</option>
            {[...Array(31)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>

          {/* Year */}
          <select>
            <option value="">Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

        </div>

        <button className="registerBtn">
          Register
        </button>

      </div>

    </div>
  );
}

export default EducatorRegister;