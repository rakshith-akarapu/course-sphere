import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import img from "../assets/login.png";

import API from "../api/api";
import { decodeTokenRole, formatDisplayName, setCurrentUser } from "../utils/auth";

function Login() {

  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    if (!identifier.trim() || !password.trim()) {
      alert("Please enter email and password");
      return;
    }

    try {

      // 🔥 LOGIN API
      const res = await API.post(
        "/auth/login",
        {
          email: identifier,
          password: password
        }
      );

      const token = res.data.token;

      // 🔥 SAVE TOKEN
      localStorage.setItem("token", token);

      // 🔥 DECODE ROLE (simple approach)
      const user = {
        email: identifier.trim().toLowerCase(),
        name: formatDisplayName(identifier),
        role: decodeTokenRole(token)
      };

      setCurrentUser(user);

      alert("Login successful ✅");

      if (user.role === "educator") {
        navigate("/educator/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error(err);
      alert("Invalid credentials ❌");
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
          placeholder="Enter your Email"
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
