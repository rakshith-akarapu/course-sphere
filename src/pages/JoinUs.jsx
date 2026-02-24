import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createUserFromLogin, formatDisplayName, setCurrentUser } from "../utils/auth";
import "../styles/auth.css";

function JoinUs() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState("");
  const [yearSemester, setYearSemester] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isEducator = role === "educator";

  const handleRegister = () => {
    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedFullName || !trimmedEmail || !trimmedPassword) {
      setErrorMessage("Please fill full name, email, and password.");
      return;
    }

    if (trimmedPassword !== confirmPassword.trim()) {
      setErrorMessage("Password and confirm password must match.");
      return;
    }

    const fallbackUser = createUserFromLogin(trimmedEmail);
    const profileDesignation = isEducator
      ? (specialization.trim() || qualification.trim() || "Educator")
      : (department.trim() || "Student");

    setCurrentUser({
      ...fallbackUser,
      name: formatDisplayName(trimmedFullName),
      email: trimmedEmail,
      phone: phone.trim() || "",
      role: isEducator ? "Educator" : "Student",
      designation: profileDesignation,
      location: yearSemester.trim() || "Not set",
      country: "India",
    });

    navigate("/dashboard");
  };

  return (
    <div className="join-container">

      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/register")}
      >
        ←
      </button>

      <h2>
        Join as {isEducator ? "Educator" : "Student"}
      </h2>

      <div className="join-card">

        <h4>Basic info</h4>

        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value);
            if (errorMessage) {
              setErrorMessage("");
            }
          }}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (errorMessage) {
              setErrorMessage("");
            }
          }}
        />
        <input
          placeholder="Phone Number"
          type="text"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            if (errorMessage) {
              setErrorMessage("");
            }
          }}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
            if (errorMessage) {
              setErrorMessage("");
            }
          }}
        />

        {isEducator ? (
          <>
            <input
              placeholder="Qualification"
              value={qualification}
              onChange={(event) => setQualification(event.target.value)}
            />
            <input
              placeholder="Specialization"
              value={specialization}
              onChange={(event) => setSpecialization(event.target.value)}
            />
          </>
        ) : (
          <>
            <input
              placeholder="Department"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            />
            <input
              placeholder="Year / Semester"
              value={yearSemester}
              onChange={(event) => setYearSemester(event.target.value)}
            />
          </>
        )}

        {errorMessage && <p className="auth-error">{errorMessage}</p>}

        <button
          className="join-btn"
          onClick={handleRegister}
        >
          Register
        </button>

      </div>
    </div>
  );
}

export default JoinUs;
