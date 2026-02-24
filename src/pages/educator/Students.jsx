import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaSearch
} from "react-icons/fa";

const Students = () => {

  const navigate = useNavigate();

  const [selectedCourse, setSelectedCourse] = useState("All");

  const studentsData = [
    { name: "John", course: "Theory of Computation", code: "CS3452", progress: 75 },
    { name: "Arjun Kumar", course: "Theory of Computation", code: "CS3452", progress: 60 },
    { name: "Rahul Verma", course: "Cloud Computing", code: "CC2041", progress: 52 },
    { name: "Sneha", course: "Cloud Computing", code: "CC2041", progress: 50 },
    { name: "Meera", course: "UI/UX Design", code: "UX1023", progress: 80 },
    { name: "Vikram", course: "UI/UX Design", code: "UX1023", progress: 67 }
  ];

  const courses = ["All", ...new Set(studentsData.map(s => s.course))];

  const filteredStudents =
    selectedCourse === "All"
      ? studentsData
      : studentsData.filter(s => s.course === selectedCourse);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }

        .dashboard {
          display: flex;
          background: #f4f6fb;
          min-height: 100vh;
        }

        /* SIDEBAR */
        .sidebar {
          width: 230px;
          background: white;
          padding: 30px 20px;
          border-right: 1px solid #eee;
        }

        .sidebar h2 {
          color: #6c63ff;
          margin-bottom: 35px;
        }

        .sidebar li {
          list-style: none;
          padding: 12px;
          margin-bottom: 12px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          transition: 0.25s ease;
        }

        .sidebar li:hover {
          background: #f1f1ff;
          transform: translateX(4px);
        }

        .sidebar li.active {
          background: #6c63ff;
          color: white;
          box-shadow: 0 10px 20px rgba(108, 99, 255, 0.28);
        }

        /* MAIN */
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* TOPBAR */
        .topbar {
          background: white;
          padding: 15px 35px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
        }

        .search-container {
          display: flex;
          align-items: center;
          background: #f4f6fb;
          padding: 8px 15px;
          border-radius: 8px;
          width: 250px;
          gap: 10px;
          transition: 0.2s ease;
        }

        .search-container:focus-within {
          background: #fff;
          border: 1px solid #6c63ff;
        }

        .search-container input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        /* CONTENT */
        .content {
          padding: 30px 40px;
        }

        .card {
          background: white;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.05);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 28px rgba(0,0,0,0.08);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .dropdown {
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          text-align: left;
          padding: 12px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }

        tbody tr:hover {
          background: #f8faff;
        }

        th {
          font-weight: 600;
          color: #555;
        }

        .progress-bar {
          background: #eee;
          border-radius: 8px;
          height: 8px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #6c63ff;
        }

        .total {
          margin-top: 15px;
          text-align: right;
          font-weight: 500;
          color: #555;
        }

      `}</style>

      <div className="dashboard">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h2>CourseSphere</h2>
          <ul>
            <li onClick={() => navigate("/educator/dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/educator/courses")}>My Courses</li>
            <li onClick={() => navigate("/educator/create-course")}>Create Course</li>
            <li className="active">Students</li>
            <li onClick={() => navigate("/educator/settings")}>Settings</li>
          </ul>
        </div>

        {/* MAIN */}
        <div className="main">

          {/* TOPBAR */}
          <div className="topbar">
            <div className="search-container">
              <FaSearch />
              <input type="text" placeholder="Search..." />
            </div>

            <div className="nav-right">
              <FaBell />
              <FaUserCircle size={26} />
            </div>
          </div>

          <div className="content">

            <div className="card">

              <div className="card-header">
                <h3>Student Details</h3>

                <select
                  className="dropdown"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Code</th>
                    <th>Progress</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student, index) => (
                    <tr key={index}>
                      <td>{student.name}</td>
                      <td>{student.course}</td>
                      <td>{student.code}</td>
                      <td>
                        {student.progress}%
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                      </td>
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
    </>
  );
};

export default Students;
