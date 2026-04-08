import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
  FaSearch,
  FaPlus,
  FaClipboardList,
  FaCommentDots,
  FaUsers
} from "react-icons/fa";
import API from "../../../api/api";
import { clearCurrentUser, getCurrentUser } from "../../../utils/auth";
import "../../../styles/educator-layout.css";

const EducatorDashboard = () => {

  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const token = localStorage.getItem("token");

  const firstName = currentUser?.name?.split(" ")[0] || "Educator";

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  // 🔥 REAL DATA STATES
  const [courseCount, setCourseCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  // 🔥 FETCH DATA
  useEffect(() => {

    // Courses
    API.get("/educator/courses", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => setCourseCount(res.data.length))
    .catch(err => console.error(err));

    // Students
    API.get("/educator/students", {
      headers: { Authorization: "Bearer " + token }
    })
    .then(res => setStudentCount(res.data.length))
    .catch(err => console.error(err));

  }, []);

  /* ---------------- CALENDAR ---------------- */

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();

  const prevMonth = () =>
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));

  const nextMonth = () =>
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));

  /* ---------------- TODO ---------------- */

  const [tasks, setTasks] = useState([
    { id: 1, text: "Human Interaction Designs", completed: false },
    { id: 2, text: "Design System Basics", completed: false }
  ]);

  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) =>
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));

  const deleteTask = (id) =>
    setTasks(tasks.filter(t => t.id !== id));

  return (
    <>
      <div className="dashboard">

        <div className="sidebar">
          <h2>CourseSphere</h2>
          <ul>
            <li className="active" onClick={()=>navigate("/educator/dashboard")}>Dashboard</li>
            <li onClick={()=>navigate("/educator/courses")}>My Courses</li>
            <li onClick={()=>navigate("/educator/create-course")}>Create Course</li>
            <li onClick={()=>navigate("/educator/students")}>Students</li>
            <li onClick={()=>navigate("/educator/settings")}>Settings</li>
          </ul>
        </div>

        <div className="main">

          <div className="topbar">
            <div className="search-container">
              <FaSearch />
              <input placeholder="Search..." />
            </div>

            <div className="nav-right">
              <FaUserCircle onClick={goToSettings}/>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="content">

            <div className="greeting">
              <h1>Hello {firstName} 👋</h1>
              <p>Let’s build something amazing today!</p>
            </div>

            <div className="top-grid">

              {/* ✅ REAL DATA */}
              <div className="stat-card">
                <p>Total Courses</p>
                <h2>{courseCount}</h2>
              </div>

              <div className="stat-card">
                <p>Total Students</p>
                <h2>{studentCount}</h2>
              </div>

              {/* Calendar same */}
              <div className="calendar-card">
                <div className="calendar-header">
                  <FaChevronLeft onClick={prevMonth}/>
                  <span>{month} {year}</span>
                  <FaChevronRight onClick={nextMonth}/>
                </div>

                <div className="calendar-grid">
                  {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day=>(
                    <strong key={day}>{day}</strong>
                  ))}

                  {[...Array(firstDay)].map((_,i)=><span key={i}></span>)}

                  {[...Array(daysInMonth)].map((_,i)=>{
                    const day=i+1;
                    return (
                      <span
                        key={day}
                        onClick={()=>setSelectedDate(new Date(year,currentDate.getMonth(),day))}
                        className={
                          selectedDate.getDate()===day &&
                          selectedDate.getMonth()===currentDate.getMonth()
                          ? "selected" : ""
                        }
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Bottom unchanged */}
            <div className="bottom-grid">
              <div className="card">
                <h4>Quick Actions</h4>

                <button className="action-btn primary" onClick={()=>navigate("/educator/create-course")}>
                  <FaPlus /> Create Course
                </button>

                <button className="action-btn" onClick={()=>navigate("/educator/courses")}>
                  <FaClipboardList /> View Assignments
                </button>

                <button className="action-btn" onClick={()=>navigate("/educator/doubts")}>
                  <FaCommentDots /> Manage Doubts
                </button>

                <button className="action-btn" onClick={()=>navigate("/educator/students")}>
                  <FaUsers /> View Students
                </button>
              </div>

              {/* TODO SAME */}
              <div className="card todo">
                <h4>To Do List</h4>

                <input
                  placeholder="Add new task..."
                  value={newTask}
                  onChange={(e)=>setNewTask(e.target.value)}
                />

                <button onClick={addTask}>Add Task</button>

                {tasks.map(task=>(
                  <div key={task.id} className="task">
                    <span
                      onClick={()=>toggleTask(task.id)}
                      className={task.completed ? "completed":""}
                    >
                      {task.text}
                    </span>

                    <FaTrash onClick={()=>deleteTask(task.id)} />
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default EducatorDashboard;
