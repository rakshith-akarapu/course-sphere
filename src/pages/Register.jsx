import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();   // ✅ important

  return (
    <div className="register-container">

      {/* LEFT SIDE */}
      <div className="register-left">

        <h2 className="logo">
          <span className="diamond"></span>
          CourseSphere
        </h2>

        <h1 className="register-heading">
          Welcome to CourseSphere
        </h1>

        {/* TOGGLE */}
        <div className="register-toggle">
          <button
            onClick={() => navigate("/")}   // ✅ go to login
          >
            Login
          </button>

          <button
            className="active"
            onClick={() => navigate("/register")} // stay here
          >
            Register
          </button>
        </div>

        <p className="register-subtext">
          Learn smarter. Manage courses effortlessly.
        </p>

        {/* Teacher */}
        <div
          className="register-card"
          onClick={() => navigate("/join/educator")}
        >
          <span>I'm a teacher</span>
          <span>›</span>
        </div>

        {/* Student */}
        <div
          className="register-card"
          onClick={() => navigate("/join/student")}
        >
          <span>I'm a learner</span>
          <span>›</span>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="register-right">
        <div className="register-illustration-box">
          <img src="/register-illustration.png" alt="register visual" />
        </div>
      </div>

    </div>
  );
}

export default Register;
