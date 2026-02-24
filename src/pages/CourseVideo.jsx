import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiChevronRight,
  FiClock,
  FiDownload,
  FiMaximize2,
  FiPause,
  FiPlay,
  FiSend,
  FiSettings,
  FiVolume2,
} from "react-icons/fi";
import { getCourseById } from "../data/courses";
import "../styles/coursevideo.css";

const sections = [
  {
    title: "Getting Started",
    lectures: "4 lectures",
    duration: "51m",
    progress: "7% finish (1/4)",
    expanded: true,
    lessons: [
      { title: "1. Sign up in Webflow", length: "07:31", active: true },
      { title: "2. What is Webflow?", length: "07:31" },
      { title: "3. Teaser of Webflow", length: "07:31" },
      { title: "4. Figma Introduction", length: "07:31" },
    ],
  },
  { title: "Secret of Good Design", lectures: "52 lectures", duration: "5h 49m" },
  { title: "Practice Design Like an Artist", lectures: "43 lectures", duration: "51m" },
  { title: "Web Development (Webflow)", lectures: "137 lectures", duration: "10h 6m" },
  { title: "Secrets of Making Money Freelancing", lectures: "21 lectures", duration: "38m" },
  { title: "Advanced", lectures: "39 lectures", duration: "1h 31m" },
  { title: "What's Next", lectures: "7 lectures", duration: "1h 17m" },
];

function CourseVideo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedCourse = getCourseById(Number(id));

  return (
    <div className="course-video-page">
      <header className="video-topbar">
        <button className="back-icon-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>

        <div className="video-topbar-main">
          <h2>{selectedCourse?.title || "Course Lecture"}</h2>
          <div className="video-stats">
            <span>
              <FiBookOpen /> {selectedCourse?.sections || "6 Sections"}
            </span>
            <span>
              <FiPlay /> {selectedCourse?.lectures || "202 lectures"}
            </span>
            <span>
              <FiClock /> {selectedCourse?.duration || "19h 37m"}
            </span>
            <span className="course-id">Course #{id}</span>
          </div>
        </div>

        <button className="next-lecture-btn">Next Lecture</button>
      </header>

      <div className="video-main-layout">
        <section className="player-panel">
          <div className="video-frame">
            <img
              src={selectedCourse?.image || "/course-banner.png"}
              alt="Course lecture preview"
              onError={(event) => {
                event.currentTarget.src = "/course-banner.png";
              }}
            />

            <div className="player-controls">
              <div className="player-controls-left">
                <button>
                  <FiPlay />
                </button>
                <button>
                  <FiPause />
                </button>
                <span>1:25 / 9:15</span>
              </div>

              <div className="player-controls-right">
                <button>
                  <FiVolume2 />
                </button>
                <button>
                  <FiSettings />
                </button>
                <button>
                  <FiMaximize2 />
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside className="contents-panel">
          <div className="contents-header">
            <h3>Course Contents</h3>
            <span>7% Completed</span>
          </div>

          <div className="contents-progress">
            <div className="contents-progress-fill"></div>
          </div>

          <div className="contents-list">
            {sections.map((section) => (
              <div key={section.title} className="contents-item">
                <div className="contents-item-head">
                  <div className="contents-item-title">
                    {section.expanded ? <FiChevronDown /> : <FiChevronRight />}
                    <span>{section.title}</span>
                  </div>
                  <div className="contents-item-meta">
                    <span>{section.lectures}</span>
                    <span>{section.duration}</span>
                  </div>
                </div>

                {section.expanded && (
                  <div className="lesson-list">
                    {section.lessons.map((lesson) => (
                      <div
                        key={lesson.title}
                        className={lesson.active ? "lesson-row lesson-row-active" : "lesson-row"}
                      >
                        <span>{lesson.title}</span>
                        <span>{lesson.length}</span>
                      </div>
                    ))}

                    <p className="lesson-progress">
                      <FiCheck /> {section.progress}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="lecture-details">
        <h1>1. Sign up in Webflow</h1>

        <div className="details-toolbar">
          <div className="tabs">
            <button className="tab-active">Description</button>
            <button>Lectures Notes</button>
            <button>Attach File</button>
          </div>
          <button className="assignment-btn" onClick={() => navigate(`/video/${id}/assignments`)}>
            Assignments <FiSend />
          </button>
        </div>

        <div className="details-grid">
          <div className="details-left">
            <h3>Lectures Description</h3>
            <p>
              We cover everything you need to build your first website. From creating your first
              page through uploading your website to the internet. This course is project-first,
              so every lecture helps you complete the final product step by step.
            </p>
            <p>
              You will design in Figma, build in Webflow, and export supporting files. Every major
              chapter includes practical tasks and a downloadable version for offline practice.
            </p>

            <h3>Lecture Notes</h3>
            <p>
              Build clarity with repeatable design systems, consistent spacing, and reusable
              components. Focus on typography, contrast, and responsive behavior from mobile to
              desktop breakpoints.
            </p>
            <ul>
              <li>Keep section hierarchy clean and predictable.</li>
              <li>Use one color role for primary action buttons.</li>
              <li>Validate spacing rhythm before final export.</li>
              <li>Test layout behavior under real content lengths.</li>
            </ul>

            <h3>Attach Files (01)</h3>
            <div className="attach-file-card">
              <div>
                <p>Create account on webflow.pdf</p>
                <small>12.6 MB</small>
              </div>
              <button>
                <FiDownload /> Download File
              </button>
            </div>
          </div>

          <div className="details-right">
            <div className="doubt-card">
              <div className="doubt-card-head">
                <h4>Raise a Doubt</h4>
              </div>
              <label>Mention the topic or timestamp from the video</label>
              <textarea placeholder="Mention your doubts here..." />

              <div className="doubt-card-footer">
                <button className="timestamp-btn">Attach Current Timestamp (04:32)</button>
                <button className="submit-btn">
                  Submit <FiSend />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CourseVideo;
