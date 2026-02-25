import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserCircle
} from "react-icons/fa";
import { clearCurrentUser } from "../../utils/auth";

const Assignments = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  const [grades, setGrades] = useState({});

  const assignments = [
    {
      id: 1,
      title: "Build Responsive Landing Page",
      submissions: [
        { student: "Rahul Sharma" },
        { student: "Sneha Iyer" }
      ]
    },
    {
      id: 2,
      title: "Create Portfolio Website",
      submissions: [
        { student: "Arjun Rao" },
        { student: "Meera Kapoor" }
      ]
    }
  ];

  const handleGrade = (student, value) => {
    setGrades({
      ...grades,
      [student]: value
    });
  };

  return (
    <>
      <style>{`

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:"Poppins",sans-serif;
      }

      body{
        background:#f4f6fb;
      }

      /* UPDATED NAVBAR */

      .topbar{
        background:white;
        padding:10px 30px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        border-bottom:1px solid #eee;
      }

      .course-title{
        font-size:16px;
        font-weight:600;
      }

      .nav-right{
        display:flex;
        align-items:center;
        gap:20px;
      }

      .profile-icon{
        color:#555;
        cursor:pointer;
        transition:0.25s ease;
      }

      .profile-icon:hover{
        color:#6c63ff;
        transform:scale(1.1);
      }

      .logout-btn{
        border:none;
        padding:6px 16px;
        border-radius:999px;
        background:linear-gradient(90deg,#6c63ff,#8b7cff);
        color:#fff;
        cursor:pointer;
        font-weight:600;
        transition:0.2s ease;
      }

      .logout-btn:hover{
        transform:translateY(-1px);
        box-shadow:0 8px 18px rgba(108,99,255,0.25);
      }

      /* CONTENT */

      .container{
        padding:40px;
      }

      .back-button{
        display:inline-flex;
        align-items:center;
        gap:8px;
        padding:10px 18px;
        border-radius:8px;
        border:1px solid #6c63ff;
        background:white;
        color:#6c63ff;
        font-weight:600;
        cursor:pointer;
        transition:0.25s ease;
        margin-bottom:25px;
      }

      .back-button:hover{
        background:#6c63ff;
        color:white;
        transform:translateY(-1px);
        box-shadow:0 8px 18px rgba(108,99,255,0.25);
      }

      .assignment-card{
        background:white;
        padding:25px;
        border-radius:12px;
        margin-bottom:25px;
        box-shadow:0 5px 15px rgba(0,0,0,0.05);
        transition:0.25s ease;
      }

      .assignment-card:hover{
        transform:translateY(-3px);
        box-shadow:0 12px 28px rgba(0,0,0,0.08);
      }

      .assignment-title{
        font-size:18px;
        font-weight:600;
        margin-bottom:15px;
      }

      .submission{
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:12px;
        border-radius:8px;
        background:#f9f9ff;
        margin-bottom:10px;
      }

      .student-name{
        font-weight:500;
      }

      .grade-box{
        display:flex;
        align-items:center;
        gap:10px;
      }

      .grade-input{
        width:70px;
        padding:6px;
        border-radius:6px;
        border:1px solid #ddd;
      }

      .grade-input:focus{
        outline:none;
        border-color:#6c63ff;
        box-shadow:0 0 0 3px rgba(108, 99, 255, 0.15);
      }

      .graded{
        color:green;
        font-size:13px;
        font-weight:500;
      }

      `}</style>

      {/* UPDATED NAVBAR */}

      <div className="topbar">

        <div className="course-title">
          Full Stack Web Development
        </div>

        <div className="nav-right">
          <FaUserCircle
            size={24}
            className="profile-icon"
            onClick={goToSettings}
          />
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="container">

        <button
          className="back-button"
          onClick={() => navigate("/educator/courses")}
        >
          <FaArrowLeft /> Back to Courses
        </button>

        {assignments.map((assignment) => (

          <div key={assignment.id} className="assignment-card">

            <div className="assignment-title">
              {assignment.title}
            </div>

            {assignment.submissions.map((submission, index) => (

              <div key={index} className="submission">

                <div className="student-name">
                  {submission.student}
                </div>

                <div className="grade-box">

                  <input
                    className="grade-input"
                    type="number"
                    placeholder="Grade"
                    value={grades[submission.student] || ""}
                    onChange={(e) =>
                      handleGrade(
                        submission.student,
                        e.target.value
                      )
                    }
                  />

                  {grades[submission.student] && (
                    <span className="graded">
                      ✔ Graded
                    </span>
                  )}

                </div>

              </div>

            ))}

          </div>

        ))}

      </div>

    </>
  );
};

export default Assignments;