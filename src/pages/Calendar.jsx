import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/calendar.css";

function Calendar() {
  const today = new Date();

  const currentYear = today.getFullYear();
  const currentMonthIndex = today.getMonth();
  const currentMonthName = today.toLocaleString("default", { month: "long" });
  const currentDate = today.getDate();

  const firstDay = new Date(currentYear, currentMonthIndex, 1).getDay();
  const totalDays = new Date(
    currentYear,
    currentMonthIndex + 1,
    0
  ).getDate();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const emptyCells = Array.from({ length: firstDay });
  const dateCells = Array.from({ length: totalDays }, (_, i) => i + 1);

  // 🔥 Events (Demo Data)
  const events = {
    [currentDate]: [
      { color: "purple" },
      { color: "green" },
      { color: "orange" }
    ],
    10: [{ color: "red" }],
    18: [{ color: "yellow" }],
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <div className="calendar-container">

          {/* LEFT SIDE - CALENDAR */}
          <div className="calendar-left">

            <h2 className="calendar-title">
              {currentMonthName} {currentYear}
            </h2>

            {/* Days Header */}
            <div className="calendar-header">
              {days.map((day, index) => (
                <div key={index} className="calendar-day">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid-full">

              {/* Empty cells before month start */}
              {emptyCells.map((_, index) => (
                <div
                  key={"empty" + index}
                  className="calendar-cell empty"
                ></div>
              ))}

              {/* Date cells */}
              {dateCells.map((date) => (
                <div key={date} className="calendar-cell">

                  <div
                    className={
                      date === currentDate
                        ? "date-number today-date"
                        : "date-number"
                    }
                  >
                    {date}
                  </div>

                  {/* Event Dots */}
                  <div className="event-dots">
                    {events[date]?.map((event, i) => (
                      <span
                        key={i}
                        className={`dot ${event.color}`}
                      ></span>
                    ))}
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* RIGHT SIDE - TIMELINE */}
          <div className="calendar-right">
            <h3>Today's Timeline</h3>

            <div className="timeline-item">
              <div className="timeline-dot purple"></div>
              <div>
                <p className="timeline-time">10:00 AM</p>
                <p>Design Review</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot green"></div>
              <div>
                <p className="timeline-time">12:30 PM</p>
                <p>Team Meeting</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-dot orange"></div>
              <div>
                <p className="timeline-time">03:00 PM</p>
                <p>Project Discussion</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Calendar;