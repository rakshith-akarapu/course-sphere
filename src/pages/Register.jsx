import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import img from "../assets/register.png";

function Register() {

  const navigate = useNavigate();

  return (
    <div className="register">

      {/* LEFT */}
      <div className="left">

        <h1 className="logo">CourseSphere</h1>

        <h2>Welcome to CourseSphere</h2>

        <div className="tabs">
          <button
            type="button"
            className="tab"
            onClick={() => navigate("/")}
          >
            Login
          </button>

          <button
            type="button"
            className="tab active"
          >
            Register
          </button>
        </div>

        <p>
          Learn smarter. Manage courses effortlessly.
        </p>

        <button
          type="button"
          className="box"
          onClick={() => navigate("/join/student")}
        >
          <span>I'm a learner</span>
          <span>→</span>
        </button>

        <p>
          Educator accounts are managed privately. Public registration is available only for students.
        </p>

      </div>

      {/* RIGHT */}
      <div className="right">
        <img src={img} alt="Register" className="image" />
      </div>

    </div>
  );
}

export default Register;
