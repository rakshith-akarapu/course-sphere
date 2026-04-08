import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { formatDisplayName, setCurrentUser } from "../utils/auth";
import "../styles/auth.css";

function JoinUs() {

  const { role } = useParams();
  const navigate = useNavigate();
  const normalizedRole = useMemo(() => String(role || "").trim().toLowerCase(), [role]);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [department, setDepartment] = useState("");
  const [yearSemester, setYearSemester] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isStudentRegistration = normalizedRole === "student";

  const handleSendOtp = async () => {
    if (!isStudentRegistration) {
      setErrorMessage("Public registration is only available for students.");
      return;
    }

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setErrorMessage("Please enter an email first.");
      return;
    }
    
    try {
      setErrorMessage("");
      await API.post("/auth/send-otp", { email: trimmedEmail });
      setOtpSent(true);
      alert("OTP sent to " + trimmedEmail);
    } catch (err) {
      console.error(err);
      const errorData = err.response?.data;
      setErrorMessage(typeof errorData === 'string' ? errorData : (errorData?.message || "Failed to send OTP."));
    }
  };

  const handleRegister = async () => {
    if (!isStudentRegistration) {
      setErrorMessage("Public registration is only available for students.");
      return;
    }

    const trimmedFullName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // ✅ VALIDATION
    if (!trimmedFullName || !trimmedEmail || !trimmedPassword) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    if (trimmedPassword !== confirmPassword.trim()) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!otp) {
      setErrorMessage("Please enter the OTP sent to your email.");
      return;
    }

    try {

      // 🔥 REGISTER API CALL
      const res = await API.post("/auth/register", {
        user: {
          username: trimmedFullName,
          email: trimmedEmail,
          password: trimmedPassword,
          role: "STUDENT",
          phone: phone.trim(),
          department: department.trim(),
          yearSemester: yearSemester.trim(),
          qualification: "",
          specialization: ""
        },
        otp: otp.trim()
      });

      // 🔥 SAVE USER LOCALLY
      setCurrentUser({
        name: formatDisplayName(res.data.username),
        email: res.data.email,
        role: res.data.role,
        phone: phone || "",
        designation: department || "Student",
        location: yearSemester || "Not set"
      });

      alert("Registration successful ✅");

      // 🔥 REDIRECT
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      const errorData = err.response?.data;
      setErrorMessage(typeof errorData === 'string' ? errorData : "Registration failed ❌");
    }
  };

  return (
    <div className="join-container">

      <button className="back-btn" onClick={() => navigate("/register")}>
        ←
      </button>

      <h2>
        Join as Student
      </h2>

      <div className="join-card">

        {!isStudentRegistration && (
          <p className="auth-error">
            Public registration is only available for students. Existing educator accounts can still log in.
          </p>
        )}

        <h4>Basic info</h4>

        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <input
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          placeholder="Year / Semester"
          value={yearSemester}
          onChange={(e) => setYearSemester(e.target.value)}
        />

        {errorMessage && (
          <p className="auth-error">{errorMessage}</p>
        )}

        {!otpSent ? (
          <button className="join-btn" onClick={handleSendOtp}>
            Send OTP
          </button>
        ) : (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="join-btn" onClick={handleRegister}>
              Verify & Register
            </button>
          </>
        )}

      </div>
    </div>
  );
}

export default JoinUs;
