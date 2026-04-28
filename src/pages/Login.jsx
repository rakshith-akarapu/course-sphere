import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
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
        <div className="login-form-container">
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

        <div className="divider">or continue with</div>
        <div className="google-wrapper">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const res = await API.post("/auth/google-login", {
                  credential: credentialResponse.credential
                });
                if (res.data.status === "SUCCESS") {
                  const token = res.data.token;
                  localStorage.setItem("token", token);
                  const role = decodeTokenRole(token);
                  setCurrentUser({ role: role });
                  alert("Login successful ✅");
                  if (role === "educator") navigate("/educator/dashboard");
                  else if (role === "superadmin") navigate("/superadmin/dashboard");
                  else navigate("/dashboard");
                } else if (res.data.status === "USER_NOT_FOUND") {
                  alert("Email not found. Redirecting to registration...");
                  navigate("/register", { state: { email: res.data.email, name: res.data.name } });
                }
              } catch (err) {
                console.error(err);
                if (err.response && err.response.data && typeof err.response.data === "string" && err.response.data.includes("pending approval")) {
                    alert("Your account is pending approval from the Super Admin.");
                } else {
                    alert("Google Login Failed ❌");
                }
              }
            }}
            onError={() => { console.log("Login Failed"); }}
          />
        </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
