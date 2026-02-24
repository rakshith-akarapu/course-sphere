import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import img from "../assets/login.png";
import google from "../assets/google.png";

import { createUserFromLogin, setCurrentUser } from "../utils/auth";

function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!identifier.trim()) {
      alert("Please enter your email");
      return;
    }

    const user = createUserFromLogin(identifier);
    setCurrentUser(user);

    if (user.role === "educator") {
      navigate("/educator/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login">
      <div className="left">
        <h1 className="logo">CourseSphere</h1>
        <img src={img} className="image" alt="login" />
      </div>

      <div className="right">
        <h2 className="title">Welcome Back to CourseSphere</h2>

        <div className="tabs">
          <button className="tab active">Login</button>

          <button
            className="tab"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>

        <label>User name / Email</label>
        <input
          type="text"
          placeholder="Enter your User name / Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="google">
          <img src={google} className="googleIcon" alt="google" />
          Continue with Google
        </button>

        <div className="options">
          <div>
            <input type="checkbox" /> Remember me
          </div>
          <p>Forgot Password ?</p>
        </div>

        <button
          type="button"
          className="loginBtn"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;