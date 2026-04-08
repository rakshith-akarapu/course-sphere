import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/calendar.css";
import { useEffect, useState } from "react";
import API from "../api/api";

function Calendar() {

  const today = new Date();
  const token = localStorage.getItem("token");

  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth();
  const currentMonthName = today.toLocaleString("default", { month: "long" });
  const currentDate = today.getDate();

  const firstDay = new Date(currentYear, currentMonthIndex, 1).getDay();
  const totalDays = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const emptyCells = Array.from({ length: firstDay });
  const dateCells = Array.from({ length: totalDays }, (_, i) => i + 1);

  const [events, setEvents] = useState({});

  // 🔥 FETCH ASSIGNMENTS → CONVERT TO EVENTS
  useEffect(() => {

    // ⚠️ example courseId = 1 (you can improve later)
    API.get("/student/assignments/1", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(res => {

      const newEvents = {};

      res.data.forEach(a => {
        if (!a.dueDate) return;

        const date = new Date(a.dueDate).getDate();

        if (!newEvents[date]) newEvents[date] = [];

        newEvents[date].push({ color: "purple" });
      });

      setEvents(newEvents);

    })
    .catch(err => console.error(err));

  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <div className="calendar-container">

          {/* LEFT */}
          <div className="calendar-left">

            <h2 className="calendar-title">
              {currentMonthName} {currentYear}
            </h2>

            <div className="calendar-header">
              {days.map((day, i) => (
                <div key={i} className="calendar-day">{day}</div>
              ))}
            </div>

            <div className="calendar-grid-full">

              {emptyCells.map((_, i) => (
                <div key={i} className="calendar-cell empty"></div>
              ))}

              {dateCells.map((date) => (
                <div key={date} className="calendar-cell">

                  <div className={
                    date === currentDate
                      ? "date-number today-date"
                      : "date-number"
                  }>
                    {date}
                  </div>

                  {/* 🔥 EVENTS FROM BACKEND */}
                  <div className="event-dots">
                    {events[date]?.map((e, i) => (
                      <span key={i} className={`dot ${e.color}`}></span>
                    ))}
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* RIGHT */}
          <div className="calendar-right">
            <h3>Today's Timeline</h3>

            {/* Optional: show today assignments */}
            {events[currentDate]?.length ? (
              <p>You have assignments today 📚</p>
            ) : (
              <p>No events today 🎉</p>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Calendar;