import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
  FaSearch
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

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));
  };

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

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

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

        .logout-btn {
          border: none;
          padding: 9px 16px;
          border-radius: 999px;
          background: linear-gradient(90deg, #5f5bd6, #7a77e6);
          color: #fff;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .logout-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(95, 91, 214, 0.3);
        }

        .notification {
          position: relative;
        }

        .notif-dot {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 8px;
          height: 8px;
          background: red;
          border-radius: 50%;
        }

        /* CONTENT */
        .content {
          padding: 30px 35px;
        }

        .greeting h1 {
          margin-bottom: 5px;
        }

        .top-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 320px;
          gap: 20px;
          margin: 30px 0;
        }

        .stat-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 26px rgba(0,0,0,0.08);
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
        }

        .card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        }

        .deadline-item {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          border-radius: 10px;
          margin-bottom: 12px;
          background: #f9f9ff;
        }

        .deadline-item.red { border-left: 4px solid #ff4d4f; }
        .deadline-item.orange { border-left: 4px solid #fa8c16; }
        .deadline-item.green { border-left: 4px solid #52c41a; }

        .status-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .deadline-item.red .status-dot { background: #ff4d4f; }
        .deadline-item.orange .status-dot { background: #fa8c16; }
        .deadline-item.green .status-dot { background: #52c41a; }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 5px;
          text-align: center;
        }

        .calendar-grid span {
          padding: 6px;
          border-radius: 6px;
          cursor: pointer;
        }

        .calendar-grid span:hover {
          background: #6c63ff;
          color: white;
        }

        .selected {
          background: #6c63ff;
          color: white;
        }

        .todo input {
          width: 100%;
          padding: 8px;
          margin: 10px 0;
          border-radius: 6px;
          border: 1px solid #ddd;
        }

        .todo button {
          width: 100%;
          padding: 8px;
          background: #6c63ff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .todo button:hover {
          background: #574fd6;
          transform: translateY(-1px);
        }

        .task {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .completed {
          text-decoration: line-through;
          opacity: 0.6;
        }
      `}</style>

      <div className="dashboard">

        <div className="sidebar">
          <h2>CourseSphere</h2>
          <ul>
            <li className="active" onClick={() => navigate("/educator/dashboard")}>Dashboard</li>
            <li onClick={() => navigate("/educator/courses")}>My Courses</li>
            <li onClick={() => navigate("/educator/create-course")}>Create Course</li>
            <li onClick={() => navigate("/educator/students")}>Students</li>
            <li onClick={() => navigate("/educator/settings")}>Settings</li>
          </ul>
        </div>

        <div className="main">

          <div className="topbar">
            <div className="search-container">
              <FaSearch />
              <input type="text" placeholder="Search..." />
            </div>

            <div className="nav-right">
              <div className="notification">
                <FaBell />
                <span className="notif-dot"></span>
              </div>
              <FaUserCircle size={26} />
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>

          <div className="content">

            <div className="greeting">
              <h1>Hello {firstName} 👋</h1>
              <p>Let’s build something amazing today!</p>
            </div>

            <div className="top-grid">
              <div className="stat-card">
                <p>Courses</p>
                <h2>5</h2>
              </div>

              <div className="stat-card">
                <p>Students</p>
                <h2>120</h2>
              </div>

              <div className="card">
                <div className="calendar-header">
                  <FaChevronLeft onClick={prevMonth} style={{ cursor: "pointer" }} />
                  <h4>{month} {year}</h4>
                  <FaChevronRight onClick={nextMonth} style={{ cursor: "pointer" }} />
                </div>

                <div className="calendar-grid">
                  {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => (
                    <strong key={day}>{day}</strong>
                  ))}

                  {[...Array(firstDay)].map((_, i) => (
                    <span key={"empty" + i}></span>
                  ))}

                  {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1;
                    return (
                      <span
                        key={day}
                        onClick={() =>
                          setSelectedDate(new Date(year, currentDate.getMonth(), day))
                        }
                        className={
                          selectedDate.getDate() === day &&
                          selectedDate.getMonth() === currentDate.getMonth()
                            ? "selected"
                            : ""
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
                <h4>Upcoming Deadlines</h4>

                <div className="deadline-item red">
                  <div>
                    <strong>AI Workshop</strong>
                    <p>5 Feb 2026</p>
                  </div>
                  <span className="status-dot"></span>
                </div>

                <div className="deadline-item orange">
                  <div>
                    <strong>Design Exam</strong>
                    <p>10 Feb 2026</p>
                  </div>
                  <span className="status-dot"></span>
                </div>

                <div className="deadline-item green">
                  <div>
                    <strong>UX Conference</strong>
                    <p>15 Feb 2026</p>
                  </div>
                  <span className="status-dot"></span>
                </div>
              </div>

              <div className="card">
                <h4>Quick Actions</h4>
                <div style={{ marginTop: "15px" }}>
                  <p>+ Assignments</p>
                  <p>D Doubts</p>
                  <p>C Courses</p>
                </div>
              </div>

              <div className="card todo">
                <h4>To Do List</h4>

                <input
                  type="text"
                  placeholder="Add new task..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />

                <button onClick={addTask}>Add Task</button>

                {tasks.map(task => (
                  <div key={task.id} className="task">
                    <span
                      onClick={() => toggleTask(task.id)}
                      className={task.completed ? "completed" : ""}
                      style={{ cursor: "pointer" }}
                    >
                      {task.text}
                    </span>

                    <FaTrash
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => deleteTask(task.id)}
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
