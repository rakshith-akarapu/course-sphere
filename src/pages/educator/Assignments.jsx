import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserCircle
} from "react-icons/fa";
import API from "../../api/api";
import { clearCurrentUser } from "../../utils/auth";

const Assignments = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const courseId = Number(id);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  const [course, setCourse] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [grades, setGrades] = useState({});
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    question: ""
  });

  const authHeaders = {
    headers: {
      Authorization: "Bearer " + token
    }
  };

  const loadAssignments = async () => {
    if (!courseId) return;

    try {
      const [courseRes, assignmentsRes] = await Promise.all([
        API.get(`/educator/courses/${courseId}`, authHeaders),
        API.get(`/educator/courses/${courseId}/assignments`, authHeaders)
      ]);

      const studentsRes = await API.get("/educator/students", authHeaders);

      const submissionGroups = await Promise.all(
        assignmentsRes.data.map(async (assignment) => {
          const submissionsRes = await API.get(
            `/educator/submissions/${assignment.id}`,
            authHeaders
          );

          return {
            ...assignment,
            submissions: submissionsRes.data
          };
        })
      );

      setCourse(courseRes.data);
      setAssignments(submissionGroups);
      setEnrolledStudents(
        studentsRes.data.filter((student) => String(student.code) === String(courseId))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, [courseId, token]);

  const handleGrade = (submissionId, value) => {
    setGrades({
      ...grades,
      [submissionId]: value
    });
  };

  const handleCreateAssignment = async () => {
    if (!newAssignment.title.trim() || !newAssignment.question.trim()) {
      alert("Assignment title and question are required.");
      return;
    }

    try {
      await API.post(
        "/educator/assignment",
        {
          courseId,
          title: newAssignment.title.trim(),
          question: newAssignment.question.trim()
        },
        authHeaders
      );

      setNewAssignment({
        title: "",
        question: ""
      });
      await loadAssignments();
      alert("Assignment created ✅");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Unable to create assignment");
    }
  };

  // 🔥 SEND GRADE
  const submitGrade = (submissionId) => {

    const grade = grades[submissionId];
    if (!grade) return;

    API.put(
      `/educator/submission/${submissionId}/grade?grade=${grade}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
    .then(() => {
      alert("Grade submitted ✅");
      loadAssignments();
    })
    .catch(err => console.error(err));
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
      }

      .logout-btn{
        border:none;
        padding:6px 16px;
        border-radius:999px;
        background:#6c63ff;
        color:#fff;
      }

      .container{
        padding:40px;
      }

      .back-button{
        padding:10px 18px;
        border-radius:8px;
        border:1px solid #6c63ff;
        background:white;
        color:#6c63ff;
        margin-bottom:25px;
      }

      .assignment-card{
        background:white;
        padding:25px;
        border-radius:12px;
        margin-bottom:25px;
      }

      .assignment-form{
        display:grid;
        gap:12px;
      }

      .assignment-form input,
      .assignment-form textarea{
        width:100%;
        padding:10px;
        border-radius:8px;
        border:1px solid #ddd;
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

      .grade-box{
        display:flex;
        gap:10px;
      }

      .grade-input{
        width:70px;
        padding:6px;
      }

      .grade-btn{
        padding:6px 10px;
        background:#6c63ff;
        color:white;
        border:none;
        border-radius:5px;
        cursor:pointer;
      }

      .file-link{
        color:#6c63ff;
        text-decoration:none;
      }

      .student-chip-list{
        display:flex;
        flex-wrap:wrap;
        gap:8px;
        margin-top:12px;
      }

      .student-chip{
        background:#f1f2ff;
        color:#4338ca;
        padding:8px 12px;
        border-radius:999px;
        font-size:14px;
      }

      `}</style>

      {/* NAVBAR */}
      <div className="topbar">
        <div className="course-title">Assignments</div>
        <div className="nav-right">
          <FaUserCircle onClick={goToSettings}/>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container">

        <button
          className="back-button"
          onClick={() => navigate(id ? `/educator/course-editor/${id}` : "/educator/courses")}
        >
          <FaArrowLeft /> Back
        </button>

        <div className="assignment-card">
          <div className="assignment-title">
            {course ? `Assignments for ${course.title}` : "Assignments"}
          </div>

          <p style={{ color: "#666", marginBottom: "12px" }}>
            Any assignment created here is available to students enrolled in this course.
          </p>

          {enrolledStudents.length > 0 ? (
            <div className="student-chip-list">
              {enrolledStudents.map((student) => (
                <span key={`${student.email}-${student.code}`} className="student-chip">
                  {student.name}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: "#666", marginTop: "12px" }}>
              No students are enrolled yet. Students must enroll before they can receive and submit assignments.
            </p>
          )}

          <div className="assignment-form">
            <input
              type="text"
              placeholder="Assignment title"
              value={newAssignment.title}
              onChange={(e) => setNewAssignment({
                ...newAssignment,
                title: e.target.value
              })}
            />

            <textarea
              rows="4"
              placeholder="Assignment question or instructions"
              value={newAssignment.question}
              onChange={(e) => setNewAssignment({
                ...newAssignment,
                question: e.target.value
              })}
            />

            <button className="grade-btn" onClick={handleCreateAssignment}>
              Create Assignment
            </button>
          </div>
        </div>

        {assignments.map((assignment) => (

          <div key={assignment.id} className="assignment-card">

            <div className="assignment-title">
              {assignment.title}
            </div>

            <p style={{ marginBottom: "16px", color: "#666" }}>
              {assignment.question}
            </p>

            {assignment.submissions.length === 0 && (
              <p>No submissions yet.</p>
            )}

            {assignment.submissions.map((submission) => (

              <div key={submission.id} className="submission">

                <div>
                  <div>{submission.studentEmail}</div>
                  {submission.fileUrl && (
                    <a
                      className="file-link"
                      href={`https://backend-repo-production-f790.up.railway.app${submission.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View submission
                    </a>
                  )}
                </div>

                <div className="grade-box">

                  <input
                    className="grade-input"
                    type="number"
                    placeholder="Grade"
                    value={grades[submission.id] || ""}
                    onChange={(e) =>
                      handleGrade(submission.id, e.target.value)
                    }
                  />

                  <button
                    className="grade-btn"
                    onClick={() => submitGrade(submission.id)}
                  >
                    Submit
                  </button>

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
