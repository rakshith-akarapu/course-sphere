import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../utils/auth";
import "../styles/dashboard.css";

function Dashboard() {
  const currentUser = getCurrentUser();
  const firstName = currentUser?.name?.split(" ")[0] || "Learner";
  const today = new Date();
  const currentDate = today.getDate();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <h1>Hello {firstName} 👋</h1>
        <p className="subtitle">
          Let’s learn something new today!
        </p>

        {/* TOP CARDS */}
        <div className="top-cards">

          {/* Recent Enrolled */}
          <div className="card">
            <h4>Recent enrolled course</h4>
            <p className="course-title">Product Design Course</p>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

            <span className="progress-text">14/30 class</span>
          </div>

          {/* Recently Accessed */}
          <div className="card">
            <h4>Recently accessed materials</h4>

            <div className="file-item">
              <span className="file pdf">PDF</span>
              <span>Auto-layout.pdf</span>
              <a href="#">Download</a>
            </div>

            <div className="file-item">
              <span className="file zip">ZIP</span>
              <span>Design_files.zip</span>
              <a href="#">Download</a>
            </div>

            <div className="file-item">
              <span className="file doc">DOC</span>
              <span>Notes_UI.doc</span>
              <a href="#">Download</a>
            </div>

            <button className="small-btn">See more</button>
          </div>

          {/* Calendar */}
          <div className="card calendar">
            <h4>{currentMonth} {currentYear}</h4>

            <div className="calendar-grid">
              {[...Array(30)].map((_, i) => (
                <span
                  key={i}
                  className={currentDate === i + 1 ? "today" : ""}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="bottom-section">

          <div className="courses-box">
            <h3>Enrolled Courses</h3>

            <div className="course-item active">
              <p>User Experience (UX) Design</p>
              <span>5.3hrs • 05 Lessons • Assignments</span>
            </div>

            <div className="course-item">
              <p>Visual Design and Branding</p>
              <span>4.0hrs • 03 Lessons • Assignments</span>
            </div>

            <div className="course-item">
              <p>React fundamentals</p>
              <span>8.3hrs • 09 Lessons • Assignments</span>
            </div>
          </div>

          {/* Performance */}
          <div className="performance-box">
            <h3>Performance</h3>

            <div className="gauge-wrapper">
              <div className="gauge-background"></div>
              <div className="gauge-progress"></div>

              <div className="gauge-text">
                <p>Your Grade</p>
                <h2>8.9</h2>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
