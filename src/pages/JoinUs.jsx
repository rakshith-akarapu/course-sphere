import { useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import API from "../api/api";
import { formatDisplayName, setCurrentUser } from "../utils/auth";
import "../styles/StudentRegister.css"; // Reuse the new premium styling
import img from "../assets/register.png";

function JoinUs() {

  const { role } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const normalizedRole = useMemo(() => String(role || "").trim().toLowerCase(), [role]);

  const [fullName, setFullName] = useState(location.state?.name || "");
  const [email, setEmail] = useState(location.state?.email || "");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [department, setDepartment] = useState("");
  const [yearSemester, setYearSemester] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      setSuccessMessage("OTP sent to " + trimmedEmail);
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

      setCurrentUser({
        name: formatDisplayName(res.data.username),
        email: res.data.email,
        role: res.data.role,
        phone: phone || "",
        designation: department || "Student",
        location: yearSemester || "Not set"
      });

      alert("Registration successful ✅");
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      const errorData = err.response?.data;
      setErrorMessage(typeof errorData === 'string' ? errorData : "Registration failed ❌");
    }
  };

  return (
    <div className="student-register">
      <div className="left">
        <img src={img} className="image" alt="register" />
      </div>

      <div className="right">
        <div className="student-register-container">
          <span className="back-link" onClick={() => navigate("/register")}>← Back to selection</span>
          <h2>Register as Student</h2>
          
          <label>Full Name</label>
          <input type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <label>Email</label>
          <input type="email" placeholder="johndoe@university.edu" value={email} onChange={(e) => setEmail(e.target.value)} disabled={otpSent} />

          <label>Password</label>
          <input type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label>Confirm Password</label>
          <input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label>Department</label>
              <input type="text" placeholder="Computer Science" value={department} onChange={(e) => setDepartment(e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Year / Sem</label>
              <input type="text" placeholder="2nd Yr / 4th Sem" value={yearSemester} onChange={(e) => setYearSemester(e.target.value)} />
            </div>
          </div>

          <label>Phone Number (Optional)</label>
          <input type="text" placeholder="9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} />

          {errorMessage && <p className="status-message error" style={{marginTop: "16px"}}>{errorMessage}</p>}
          {successMessage && <p className="status-message success" style={{marginTop: "16px"}}>{successMessage}</p>}

          {!otpSent ? (
            <button className="registerBtn" onClick={handleSendOtp}>
              Send OTP Verification
            </button>
          ) : (
            <div style={{ marginTop: "1.5rem" }}>
              <label>Enter OTP sent to {email}</label>
              <div className="otp-section">
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button className="sendOtpBtn" onClick={handleRegister}>
                  Verify & Create
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default JoinUs;
