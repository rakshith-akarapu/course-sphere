import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Register.css";
import img from "../assets/register.png";

function Register() {

  const navigate = useNavigate();
  const location = useLocation();

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
          onClick={() => navigate("/join/student", { state: location.state })}
        >
          <span>I'm a learner</span>
          <span>→</span>
        </button>

        <button
          type="button"
          className="box"
          style={{marginTop: "16px"}}
          onClick={() => navigate("/join/educator", { state: location.state })}
        >
          <span>I'm an educator</span>
          <span>→</span>
        </button>

        <p>
          Educator accounts require approval from the Super Admin before they can be used.
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
