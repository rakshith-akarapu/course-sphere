import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import img from "../assets/login.png";
import google from "../assets/google.png";

function Login() {

    const navigate = useNavigate();

    return (
        <div className="login">

            <div className="left">
                <h1 className="logo">CourseSphere</h1>
                <img src={img} className="image" alt="login" />
            </div>

            <div className="right">

                <h2 className="title">
                    Welcome Back to CourseSphere
                </h2>

                <div className="tabs">
                    <button className="tab active">
                        Login
                    </button>

                    <button
                        className="tab"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </button>
                </div>

                <label>User name / Email</label>
                <input type="text" placeholder="Enter your User name / Email" />

                <label>Password</label>
                <input type="password" placeholder="Enter your Password" />

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

                {/* ✅ UPDATED */}
                <button
                    type="button"
                    className="loginBtn"
                    onClick={() => navigate("/educator/dashboard")}
                >
                    Login
                </button>

            </div>
        </div>
    );
}

export default Login;