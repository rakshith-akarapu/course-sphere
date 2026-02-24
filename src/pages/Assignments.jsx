import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getAssignmentsByCourseId } from "../data/assignments";
import { getCourseById } from "../data/courses";
import { getAssignmentSubmission } from "../utils/assignmentSubmissions";
import "../styles/assignments.css";

function Assignments() {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = Number(id);
  const selectedCourse = getCourseById(courseId);
  const assignments = getAssignmentsByCourseId(courseId);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main assignments-page-main">
        <header className="assignments-page-topbar">
          <button className="assignments-back-btn" onClick={() => navigate(`/video/${id}`)}>
            <FiArrowLeft />
          </button>
          <h2>{selectedCourse?.title || "Assignments"}</h2>
        </header>

        <section className="assignments-section">
          <h1>Assignments</h1>
          <p>View and manage your course assignments</p>

          <div className="assignments-table">
            <div className="assignments-row assignments-row-head">
              <span>Assignment Title</span>
              <span>Course/lessons</span>
              <span>Due Date</span>
              <span>Status</span>
              <span>Submit</span>
            </div>

            {assignments.map((assignment) => {
              const submission = getAssignmentSubmission(courseId, assignment.id);
              const isSubmitted = Boolean(submission) || assignment.defaultSubmitted;

              return (
                <div key={assignment.id} className="assignments-row">
                  <span>{assignment.title}</span>
                  <span>{assignment.module}</span>
                  <span>{assignment.dueDate}</span>
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
          </div>
        </section>
      </div>
    </div>
  );
}

export default Assignments;
