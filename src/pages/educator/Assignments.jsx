import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBell,
  FaUserCircle,
  FaSearch
} from "react-icons/fa";

const Assignments = () => {

  const navigate = useNavigate();

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

      /* TOP NAVBAR */

      .topbar{
        background:white;
        padding:15px 35px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        border-bottom:1px solid #eee;
      }

      .nav-left{
        display:flex;
        align-items:center;
        gap:20px;
      }

      .back-btn{
        cursor:pointer;
        color:#6c63ff;
        font-weight:500;
        display:flex;
        align-items:center;
        gap:6px;
      }

      .course-title{
        font-size:18px;
        font-weight:600;
      }

      .search-container{
        display:flex;
        align-items:center;
        background:#f4f6fb;
        padding:8px 15px;
        border-radius:8px;
        width:250px;
        gap:10px;
      }

      .search-container input{
        border:none;
        outline:none;
        background:transparent;
        width:100%;
      }

      .nav-right{
        display:flex;
        align-items:center;
        gap:25px;
      }

      /* PAGE CONTENT */

      .container{
        padding:40px;
      }

      .assignment-card{
        background:white;
        padding:25px;
        border-radius:12px;
        margin-bottom:25px;
        box-shadow:0 5px 15px rgba(0,0,0,0.05);
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

      .graded{
        color:green;
        font-size:13px;
        font-weight:500;
      }

      `}</style>

      {/* TOP NAVBAR */}

      <div className="topbar">

        <div className="nav-left">

          <div
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft /> Back
          </div>

          <div className="course-title">
            Full Stack Web Development
          </div>

        </div>

        <div className="search-container">
          <FaSearch />
          <input placeholder="Search student..." />
        </div>

        <div className="nav-right">
          <FaBell />
          <FaUserCircle size={26} />
        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="container">

        {assignments.map((assignment) => (

          <div
            key={assignment.id}
            className="assignment-card"
          >

            <div className="assignment-title">
              {assignment.title}
            </div>

            {assignment.submissions.map((submission, index) => (

              <div
                key={index}
                className="submission"
              >

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