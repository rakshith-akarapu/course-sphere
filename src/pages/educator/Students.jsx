import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaDownload, FaSearch } from "react-icons/fa";
import API from "../../api/api";
import { clearCurrentUser } from "../../utils/auth";
import "../../styles/educator-layout.css";

const Students = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  const [studentsData, setStudentsData] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [pageError, setPageError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [assignForm, setAssignForm] = useState({
    studentEmail: "",
    courseId: ""
  });

  const mapStudentRows = (rows) => rows.map((e) => ({
    name: e.name,
    email: e.email,
    course: e.course,
    code: e.code,
    progress: e.progress
  }));

  const loadStudentData = async () => {
    setIsLoading(true);
    setPageError("");

    const [studentsResult, allStudentsResult, coursesResult] = await Promise.allSettled([
      API.get("/educator/students"),
      API.get("/educator/students/all"),
      API.get("/educator/courses")
    ]);

    if (studentsResult.status === "fulfilled") {
      setStudentsData(mapStudentRows(studentsResult.value.data));
    } else {
      console.error(studentsResult.reason);
      setStudentsData([]);
      setPageError("Unable to load the student table right now.");
    }

    if (allStudentsResult.status === "fulfilled") {
      setAvailableStudents(allStudentsResult.value.data);
    } else {
      console.error(allStudentsResult.reason);
      setAvailableStudents([]);
      setPageError((current) => current || "Unable to load the student list for assignment.");
    }

    if (coursesResult.status === "fulfilled") {
      setCourses(coursesResult.value.data);
    } else {
      console.error(coursesResult.reason);
      setCourses([]);
      setPageError((current) => current || "Unable to load your courses for assignment.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadStudentData();
  }, [token]);

  const filterCourses = ["All", ...new Set(studentsData.map(s => s.course))];

  const filteredStudents =
    selectedCourse === "All"
      ? studentsData
      : studentsData.filter(s => s.course === selectedCourse);

  const downloadCSV = () => {
    const headers = ["Name", "Course", "Code", "Progress"];

    const rows = filteredStudents.map(s => [
      s.name,
      s.course,
      s.code,
      s.progress
    ]);

    let csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(r => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", "students.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="dashboard">

      <div className="sidebar">
        <h2>CourseSphere</h2>
        <ul>
          <li onClick={()=>navigate("/educator/dashboard")}>Dashboard</li>
          <li onClick={()=>navigate("/educator/courses")}>My Courses</li>
          <li onClick={()=>navigate("/educator/create-course")}>Create Course</li>
          <li className="active">Students</li>
          <li onClick={()=>navigate("/educator/settings")}>Settings</li>
        </ul>
      </div>

      <div className="main">

        <div className="topbar">
          <div className="search-container">
            <FaSearch />
            <input placeholder="Search records..." />
          </div>

          <div className="nav-right">
            <FaUserCircle onClick={goToSettings}/>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="content">
          <div className="section-title">Enrolled Students</div>

          <div className="card">
            {pageError && (
              <p className="auth-error" style={{ marginBottom: "16px" }}>
                {pageError}
              </p>
            )}

            <div className="card-header">
              <h3>Student Details</h3>

              <div className="header-right">
                <select
                  className="dropdown"
                  value={selectedCourse}
                  onChange={(e)=>setSelectedCourse(e.target.value)}
                >
                  {filterCourses.map((c,i)=>(
                    <option key={i}>{c}</option>
                  ))}
                </select>

                <button className="download-btn" onClick={downloadCSV}>
                  <FaDownload/> Download CSV
                </button>
              </div>
            </div>

            <div className="card-header" style={{ marginBottom: "16px", alignItems: "flex-end" }}>
              <div>
                <h3>Assign Course to Student</h3>
                <p style={{ color: "#666", marginTop: "6px" }}>
                  Enroll a student into one of your courses directly from here.
                </p>
              </div>

              <div className="header-right">
                <select
                  className="dropdown"
                  value={assignForm.studentEmail}
                  onChange={(e) => setAssignForm({
                    ...assignForm,
                    studentEmail: e.target.value
                  })}
                >
                  <option value="">Select student</option>
                  {availableStudents.map((student) => (
                    <option key={student.email} value={student.email}>
                      {student.name} ({student.email})
                    </option>
                  ))}
                </select>

                <select
                  className="dropdown"
                  value={assignForm.courseId}
                  onChange={(e) => setAssignForm({
                    ...assignForm,
                    courseId: e.target.value
                  })}
                >
                  <option value="">Select course</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>

                <button
                  className="download-btn"
                  disabled={!availableStudents.length || !courses.length}
                  onClick={() => {
                    if (!assignForm.studentEmail || !assignForm.courseId) {
                      alert("Select both a student and a course.");
                      return;
                    }

                    API.post(
                      "/educator/students/assign",
                      assignForm
                    )
                    .then(() => {
                      alert("Student assigned successfully ✅");
                      setAssignForm({ studentEmail: "", courseId: "" });
                      return loadStudentData();
                    })
                    .catch((err) => {
                      console.error(err);
                      alert(err.response?.data || "Unable to assign student");
                    });
                  }}
                >
                  Assign Course
                </button>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Name / Email</th>
                  <th>Course Segment</th>
                  <th>Course Code</th>
                  <th>Progress</th>
                </tr>
              </thead>

              <tbody>
                {!isLoading && filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="4">No students found.</td>
                  </tr>
                )}

                {filteredStudents.map((s,i)=>(
                  <tr key={i}>
                    <td>{s.name} ({s.email})</td>
                    <td>{s.course}</td>
                    <td>#{s.code}</td>
                    <td>{s.progress}%</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="total">
              Total Students: {filteredStudents.length}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Students;
