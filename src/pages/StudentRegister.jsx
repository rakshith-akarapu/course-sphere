import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Student/StudentRegister.css";

function StudentRegister() {

  const navigate = useNavigate();

  // Generate years dynamically
  const currentYear = new Date().getFullYear();
  const startYear = 1950;

  const years = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return (
    <div className="studentRegister">

      <button 
        className="backBtn"
        onClick={() => navigate("/register")}
      >
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
          Provide accurate academic details to access your courses, track
          progress, and collaborate with educators.
          Your information helps us personalize your learning experience.
        </p>

        <label>Full Name</label>
        <input type="text" />

        <label>Password</label>
        <input type="password" />

        <label>Confirm Password</label>
        <input type="password" />

        <label>Department</label>
        <input type="text" />

        <label>Year/Semester</label>
        <input type="text" />

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

export default StudentRegister;