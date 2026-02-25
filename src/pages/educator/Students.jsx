import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaDownload
} from "react-icons/fa";
import { clearCurrentUser } from "../../utils/auth";

const Students = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

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

  const downloadCSV = () => {
    const headers = ["Name", "Course", "Course Code", "Progress (%)"];

    const rows = filteredStudents.map(student => [
      student.name,
      student.course,
      student.code,
      student.progress
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map(row => row.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");

    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `students_${selectedCourse === "All" ? "all" : selectedCourse}.csv`
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <style>{`

        * { 
          margin:0; 
          padding:0; 
          box-sizing:border-box; 
          font-family:"Poppins", sans-serif; 
        }

        .dashboard { 
          display:flex; 
          background:#f4f6fb; 
          min-height:100vh; 
        }

        .sidebar {
          width:230px;
          background:white;
          padding:30px 20px;
          border-right:1px solid #eee;
        }

        .sidebar h2 { 
          color:#6c63ff; 
          margin-bottom:35px; 
        }

        .sidebar li {
          list-style:none;
          padding:12px;
          margin-bottom:12px;
          border-radius:8px;
          cursor:pointer;
          font-size:14px;
          transition:0.25s ease;
        }

        .sidebar li:hover { 
          background:#f1f1ff; 
          transform:translateX(4px); 
        }

        .sidebar li.active {
          background:#6c63ff;
          color:white;
          box-shadow:0 10px 20px rgba(108,99,255,0.28);
        }

        .main { 
          flex:1; 
          display:flex; 
          flex-direction:column; 
        }

        /* UPDATED NAVBAR */

        .topbar {
          background:white;
          padding:10px 30px;
          display:flex;
          justify-content:flex-end;
          align-items:center;
          border-bottom:1px solid #eee;
        }

        .nav-right {
          display:flex;
          align-items:center;
          gap:20px;
        }

        .profile-icon {
          color:#555;
          cursor:pointer;
          transition:0.25s ease;
        }

        .profile-icon:hover {
          color:#6c63ff;
          transform:scale(1.1);
        }

        .logout-btn {
          border:none;
          padding:6px 16px;
          border-radius:999px;
          background:linear-gradient(90deg,#6c63ff,#8b7cff);
          color:#fff;
          cursor:pointer;
          font-weight:600;
          transition:0.2s ease;
        }

        .logout-btn:hover {
          transform:translateY(-1px);
          box-shadow:0 8px 18px rgba(108,99,255,0.25);
        }

        .content { 
          padding:30px 40px; 
        }

        .card {
          background:white;
          padding:25px;
          border-radius:16px;
          box-shadow:0 8px 25px rgba(0,0,0,0.05);
        }

        .card-header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:20px;
        }

        .header-right {
          display:flex;
          gap:15px;
          align-items:center;
        }

        .dropdown {
          padding:8px 12px;
          border-radius:8px;
          border:1px solid #ddd;
        }

        .download-btn {
          display:flex;
          align-items:center;
          gap:8px;
          padding:8px 14px;
          border:none;
          border-radius:8px;
          background:linear-gradient(90deg,#6c63ff,#8b7cff);
          color:white;
          cursor:pointer;
          font-weight:500;
          transition:0.25s ease;
        }

        .download-btn:hover {
          transform:translateY(-2px);
          box-shadow:0 8px 18px rgba(108,99,255,0.3);
        }

        table {
          width:100%;
          border-collapse:collapse;
        }

        th, td {
          text-align:left;
          padding:12px;
          border-bottom:1px solid #eee;
          font-size:14px;
        }

        th { 
          font-weight:600; 
          color:#555; 
        }

        tbody tr:hover { 
          background:#f8faff; 
        }

        .progress-bar {
          background:#eee;
          border-radius:8px;
          height:8px;
          overflow:hidden;
          margin-top:5px;
        }

        .progress-fill {
          height:100%;
          background:#6c63ff;
        }

        .total {
          margin-top:15px;
          text-align:right;
          font-weight:500;
          color:#555;
        }

      `}</style>

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

          <div className="content">

            <div className="card">

              <div className="card-header">
                <h3>Student Details</h3>

                <div className="header-right">
                  <select
                    className="dropdown"
                    value={selectedCourse}
                    onChange={(e)=>setSelectedCourse(e.target.value)}
                  >
                    {courses.map((course,index)=>(
                      <option key={index} value={course}>{course}</option>
                    ))}
                  </select>

                  <button
                    className="download-btn"
                    onClick={downloadCSV}
                  >
                    <FaDownload size={14}/>
                    Download CSV
                  </button>
                </div>
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
                  {filteredStudents.map((student,index)=>(
                    <tr key={index}>
                      <td>{student.name}</td>
                      <td>{student.course}</td>
                      <td>{student.code}</td>
                      <td>
                        {student.progress}%
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{width:`${student.progress}%`}}
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