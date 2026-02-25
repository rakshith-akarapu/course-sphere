import React, { useState } from "react";
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
import { clearCurrentUser, getCurrentUser } from "../../../utils/auth";

const EducatorDashboard = () => {

  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const firstName = currentUser?.name?.split(" ")[0] || "Educator";

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

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
      <style>{`

      * {
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:"Poppins",sans-serif;
      }

      .dashboard {
        display:flex;
        background:#f6f7fb;
        min-height:100vh;
      }

      /* SIDEBAR */

      .sidebar {
        width:240px;
        background:white;
        padding:30px 20px;
        border-right:1px solid #eee;
      }

      .sidebar h2 {
        color:#6c63ff;
        margin-bottom:40px;
        font-weight:600;
      }

      .sidebar li {
        list-style:none;
        padding:12px;
        margin-bottom:12px;
        border-radius:10px;
        cursor:pointer;
        font-size:14px;
        transition:0.25s ease;
      }

      .sidebar li:hover {
        background:#f1f1ff;
        transform:translateX(4px);
      }

      .sidebar li.active {
        background:linear-gradient(90deg,#6c63ff,#8b7cff);
        color:white;
        box-shadow:0 8px 18px rgba(108,99,255,0.3);
      }

      .main {
        flex:1;
        display:flex;
        flex-direction:column;
      }

      /* CLEAN NAVBAR */

      .topbar {
        background:white;
        padding:18px 35px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        border-bottom:1px solid #f0f0f0;
      }

      .search-container {
        display:flex;
        align-items:center;
        background:#f4f6ff;
        padding:10px 16px;
        border-radius:30px;
        width:300px;
        gap:10px;
        transition:0.25s ease;
      }

      .search-container:focus-within {
        background:#fff;
        box-shadow:0 0 0 2px rgba(108,99,255,0.15);
      }

      .search-container input {
        border:none;
        background:transparent;
        outline:none;
        width:100%;
      }

      .nav-right {
        display:flex;
        align-items:center;
        gap:20px;
      }

      .profile-icon {
        cursor:pointer;
        color:#555;
        transition:0.25s ease;
      }

      .profile-icon:hover {
        color:#6c63ff;
        transform:scale(1.1);
      }

      .logout-btn {
        border:none;
        padding:8px 18px;
        border-radius:999px;
        background:linear-gradient(90deg,#6c63ff,#8b7cff);
        color:white;
        cursor:pointer;
        font-weight:600;
        transition:0.2s ease;
      }

      .logout-btn:hover {
        transform:translateY(-1px);
        box-shadow:0 10px 20px rgba(108,99,255,0.25);
      }

      /* CONTENT */

      .content {
        padding:35px;
      }

      .greeting h1 {
        font-size:28px;
        font-weight:600;
      }

      .greeting p {
        color:#777;
        margin-top:6px;
      }

      .top-grid {
        display:grid;
        grid-template-columns:1fr 1fr 330px;
        gap:25px;
        margin:35px 0;
      }

      .stat-card {
        background:white;
        padding:35px;
        border-radius:16px;
        box-shadow:0 10px 25px rgba(0,0,0,0.05);
        transition:0.3s ease;
      }

      .stat-card:hover {
        transform:translateY(-5px);
      }

      .stat-card p {
        color:#888;
        font-size:14px;
      }

      .stat-card h2 {
        margin-top:8px;
        font-size:32px;
      }

      .calendar-card {
        background:white;
        padding:20px;
        border-radius:16px;
        box-shadow:0 10px 25px rgba(0,0,0,0.05);
      }

      .calendar-header {
        display:flex;
        justify-content:space-between;
        margin-bottom:12px;
        font-weight:600;
      }

      .calendar-grid {
        display:grid;
        grid-template-columns:repeat(7,1fr);
        gap:6px;
        text-align:center;
      }

      .calendar-grid span {
        padding:6px;
        border-radius:8px;
        cursor:pointer;
        font-size:13px;
      }

      .calendar-grid span:hover {
        background:#6c63ff;
        color:white;
      }

      .selected {
        background:#6c63ff;
        color:white;
      }

      .bottom-grid {
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:25px;
      }

      .card {
        background:white;
        padding:25px;
        border-radius:16px;
        box-shadow:0 10px 25px rgba(0,0,0,0.05);
      }

      .card h4 {
        margin-bottom:18px;
        font-weight:600;
      }

      .action-btn {
        width:100%;
        padding:12px;
        margin-bottom:12px;
        border-radius:12px;
        border:1px solid #eee;
        background:#f8f9ff;
        cursor:pointer;
        font-weight:500;
        display:flex;
        align-items:center;
        gap:10px;
        transition:0.25s ease;
      }

      .action-btn:hover {
        background:#ecebff;
        border-color:#6c63ff;
        transform:translateY(-2px);
      }

      .action-btn.primary {
        background:linear-gradient(90deg,#6c63ff,#8b7cff);
        color:white;
        border:none;
      }

      .todo input {
        width:100%;
        padding:10px;
        margin-bottom:12px;
        border-radius:10px;
        border:1px solid #ddd;
      }

      .todo button {
        width:100%;
        padding:10px;
        background:#6c63ff;
        color:white;
        border:none;
        border-radius:10px;
        cursor:pointer;
        margin-bottom:15px;
      }

      .task {
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:8px;
        font-size:14px;
      }

      .completed {
        text-decoration:line-through;
        opacity:0.6;
      }

      `}</style>

      <div className="dashboard">

        {/* SIDEBAR */}
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

          {/* CLEAN NAVBAR */}
          <div className="topbar">
            <div className="search-container">
              <FaSearch />
              <input placeholder="Search..." />
            </div>

            <div className="nav-right">
              <FaUserCircle
                size={26}
                className="profile-icon"
                onClick={goToSettings}
              />
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="content">

            <div className="greeting">
              <h1>Hello {firstName} 👋</h1>
              <p>Let’s build something amazing today!</p>
            </div>

            <div className="top-grid">
              <div className="stat-card">
                <p>Total Courses</p>
                <h2>5</h2>
              </div>

              <div className="stat-card">
                <p>Total Students</p>
                <h2>120</h2>
              </div>

              <div className="calendar-card">
                <div className="calendar-header">
                  <FaChevronLeft onClick={prevMonth} style={{cursor:"pointer"}}/>
                  <span>{month} {year}</span>
                  <FaChevronRight onClick={nextMonth} style={{cursor:"pointer"}}/>
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

            <div className="bottom-grid">

              <div className="card">
                <h4>Quick Actions</h4>

                <button
                  className="action-btn primary"
                  onClick={()=>navigate("/educator/create-course")}
                >
                  <FaPlus /> Create Course
                </button>

                <button
                  className="action-btn"
                  onClick={()=>navigate("/educator/assignments")}
                >
                  <FaClipboardList /> View Assignments
                </button>

                <button
                  className="action-btn"
                  onClick={()=>navigate("/educator/doubts")}
                >
                  <FaCommentDots /> Manage Doubts
                </button>

                <button
                  className="action-btn"
                  onClick={()=>navigate("/educator/students")}
                >
                  <FaUsers /> View Students
                </button>
              </div>

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
                      style={{cursor:"pointer"}}
                    >
                      {task.text}
                    </span>

                    <FaTrash
                      style={{cursor:"pointer",color:"red"}}
                      onClick={()=>deleteTask(task.id)}
                    />
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