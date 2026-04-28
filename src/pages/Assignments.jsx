import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import "../styles/assignments.css";

function Assignments() {

  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = Number(id);
  const token = localStorage.getItem("token");

  const [assignments, setAssignments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  // 🔥 FETCH ASSIGNMENTS FROM BACKEND
  useEffect(() => {
    API.get(`/student/assignments/${courseId}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(res => {
      setAssignments(res.data);
      setErrorMessage("");
    })
    .catch(err => {
      console.error(err);
      setAssignments([]);
      setErrorMessage(err.response?.data || "Unable to load assignments.");
    });
  }, [courseId, token]);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main assignments-page-main">

        <header className="assignments-page-topbar">
          <button
            className="assignments-back-btn"
            onClick={() => navigate(`/video/${id}`)}
          >
            <FiArrowLeft />
          </button>

          <h2>Assignments</h2>
        </header>

        <section className="assignments-section">
          <h1>Assignments</h1>
          <p>View and manage your course assignments</p>

          {errorMessage && (
            <p className="empty-state">{errorMessage}</p>
          )}

          <div className="assignments-table">

            <div className="assignments-row assignments-row-head">
              <span>Assignment Title</span>
              <span>Question</span>
              <span>Course</span>
              <span>Due Date</span>
              <span>Status</span>
              <span>Submit</span>
            </div>

            {assignments.map((assignment) => {

              const isSubmitted = assignment.submitted || false;

              return (
                <div key={assignment.id} className="assignments-row">

                  <span>{assignment.title}</span>

                  <span className="truncate" title={assignment.question}>{assignment.question}</span>

                  <span>{assignment.courseId}</span>

                  <span>{assignment.dueDate || "N/A"}</span>

                  <span>
                    <span className={isSubmitted ? "status-pill done" : "status-pill pending"}>
                      {isSubmitted ? "Done" : "Pending"}
                    </span>
                  </span>

                  <span>
                    {isSubmitted ? (
                      <span className="submitted-text">Submitted</span>
                    ) : (
                      <button
                        className="upload-link-btn"
                        onClick={() =>
                          navigate(`/video/${id}/assignments/${assignment.id}/upload`)
                        }
                      >
                        Upload
                      </button>
                    )}
                  </span>

                </div>
              );
            })}

            {!errorMessage && assignments.length === 0 && (
              <div className="assignments-row">
                <span>No assignments yet</span>
                <span>-</span>
                <span>-</span>
                <span>-</span>
                <span>-</span>
                <span>-</span>
              </div>
            )}

          </div>
        </section>

      </div>
    </div>
  );
}

export default Assignments;
