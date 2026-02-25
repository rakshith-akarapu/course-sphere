import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import img from "../assets/register.png";

function Register() {

  const navigate = useNavigate();

  return (
    <div className="register">

      {/* LEFT SIDE */}
      <div className="left">

        {/* Logo */}
        <h1 className="logo">CourseSphere</h1>

        {/* Heading */}
        <h2>Welcome to CourseSphere</h2>

        {/* Login / Register Tabs */}
        <div className="tabs">
          <button 
            type="button"
            className="tab"
            onClick={() => navigate("/")}   // ✅ updated
          >
            Login
          </button>

          <button 
            type="button"
            className="tab active"
            onClick={() => navigate("/register")}  // ✅ updated
          >
            Register
          </button>
        </div>

        {/* Description */}
        <p>
          Learn smarter. Manage courses effortlessly.
        </p>

        {/* STUDENT BUTTON */}
        <button 
          type="button"
          className="box"
          onClick={() => navigate("/join/student")}   // ✅ updated
        >
          <span>I'm a learner</span>
          <span>→</span>
        </button>

        {/* EDUCATOR BUTTON */}
        <button 
          type="button"
          className="box"
          onClick={() => navigate("/join/educator")}  // ✅ updated
        >
          <span>I'm an educator</span>
          <span>→</span>
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div className="right">
        <img 
          src={img} 
          alt="Register Illustration" 
          className="image"
        />
      </div>

    </div>
  );
}

export default Register;