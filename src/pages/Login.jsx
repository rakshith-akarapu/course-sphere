import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserFromLogin, setCurrentUser } from "../utils/auth";
import "../styles/auth.css";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const trimmedIdentifier = identifier.trim();
    const trimmedPassword = password.trim();

    if (!trimmedIdentifier || !trimmedPassword) {
      setErrorMessage("Please enter username/email and password.");
      return;
    }

    setCurrentUser(createUserFromLogin(trimmedIdentifier));
    navigate("/dashboard");
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="login-left">
        <h2 className="logo">
          <span className="diamond"></span>
          CourseSphere
        </h2>

        <div className="illustration-box">
          <img src="/login-image.png" alt="illustration" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">

        <p className="welcome-text">
          Welcome Back to CourseSphere .
        </p>

        {/* TOGGLE BUTTONS */}
        <div className="toggle-buttons">
          <button
            className="active"
            onClick={() => navigate("/")}
          >
            Login
          </button>

          <button
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
          onChange={(event) => {
            setIdentifier(event.target.value);
            if (errorMessage) {
              setErrorMessage("");
            }
          }}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (errorMessage) {
              setErrorMessage("");
            }
          }}
        />

        {errorMessage && <p className="auth-error">{errorMessage}</p>}

        <button className="google-btn">
          Continue with Google
        </button>

        <div className="remember-row">
          <span>
            <input type="checkbox" /> Remember me
          </span>
          <span>Forgot Password ?</span>
        </div>

        <button
          className="main-btn"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;
