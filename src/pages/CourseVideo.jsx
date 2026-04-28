import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiBookOpen,
  FiChevronDown,
  FiClock,
  FiDownload,
  FiPlay,
  FiSend,
} from "react-icons/fi";
import API from "../api/api";
import { getCourseCoverUrl } from "../utils/courseMedia";
import "../styles/coursevideo.css";

function CourseVideo() {
  const scrollToDetails = () => {
    document.querySelector(".lecture-details")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";

    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes("youtu.be")) {
        const videoId = parsed.pathname.replace("/", "");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }

      if (parsed.hostname.includes("youtube.com")) {
        if (parsed.pathname === "/watch") {
          const videoId = parsed.searchParams.get("v");
          return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
        }

        if (parsed.pathname.startsWith("/embed/")) {
          return url;
        }

        if (parsed.pathname.startsWith("/shorts/")) {
          const videoId = parsed.pathname.split("/")[2];
          return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
        }
      }
    } catch {
      return "";
    }

    return "";
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [doubtText, setDoubtText] = useState("");
  const [actionMessage, setActionMessage] = useState({ tone: "", text: "" });
  const [isSubmittingDoubt, setIsSubmittingDoubt] = useState(false);
  const [isUnenrolling, setIsUnenrolling] = useState(false);

  const embeddedVideoUrl = getYouTubeEmbedUrl(course?.videoUrl);

  useEffect(() => {
    API.get(`/student/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmitDoubt = () => {
    if (!doubtText.trim()) return;

    setIsSubmittingDoubt(true);
    setActionMessage({ tone: "", text: "" });

    API.post("/student/doubt", {
      question: doubtText,
      courseId: Number(id),
    })
      .then(() => {
        setDoubtText("");
        setActionMessage({ tone: "success", text: "Doubt submitted successfully." });
      })
      .catch((err) => {
        console.error(err);
        setActionMessage({ tone: "error", text: err.response?.data || "Failed to submit doubt." });
      })
      .finally(() => setIsSubmittingDoubt(false));
  };

  const handleUnenroll = () => {
    setIsUnenrolling(true);
    setActionMessage({ tone: "", text: "" });

    API.delete(`/student/enroll/${id}`)
      .then(() => {
        navigate("/courses");
      })
      .catch((err) => {
        console.error(err);
        setActionMessage({ tone: "error", text: err.response?.data || "Unable to unenroll right now." });
      })
      .finally(() => setIsUnenrolling(false));
  };

  return (
    <div className="course-video-page">
      <header className="video-topbar">
        <button type="button" className="back-icon-btn btn btn-outline btn-sm" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>

        <div className="video-topbar-main">
          <h2>{course?.title || "Course Lecture"}</h2>

          <div className="video-stats">
            <span><FiBookOpen /> {course?.sections || "Sections"}</span>
            <span><FiPlay /> {course?.lectures || "Lectures"}</span>
            <span><FiClock /> {course?.duration || "Duration"}</span>
            <span className="course-id">Course #{id}</span>
          </div>
        </div>

        <button
          type="button"
          className="next-lecture-btn btn btn-primary btn-sm"
          onClick={scrollToDetails}
        >
          Course Details
        </button>
      </header>

      <div className="video-main-layout">
        <section className="player-panel">
          <div className="video-frame">
            {embeddedVideoUrl ? (
              <iframe
                src={embeddedVideoUrl}
                title={course?.title || "Course video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : course?.videoUrl ? (
              <div className="video-link-state">
                <p>Video is available for this course.</p>
                <a href={course.videoUrl} target="_blank" rel="noreferrer">
                  Open Video Link
                </a>
              </div>
            ) : (
              <img
                src={getCourseCoverUrl(course)}
                alt={course?.title || "Course preview"}
              />
            )}

            <div className="player-controls">
              <span className="player-pill"><FiPlay /> Course video</span>
              {course?.duration && <span className="player-pill"><FiClock /> {course.duration}</span>}
            </div>
          </div>
        </section>

        <aside className="contents-panel">
          <div className="contents-header">
            <h3>Course Contents</h3>
            <span>Progress</span>
          </div>

          <div className="contents-list">
            <div className="contents-item">
              <div className="contents-item-head">
                <div className="contents-item-title">
                  <FiChevronDown />
                  <span>Course Content</span>
                </div>
                <div className="contents-item-meta">
                  <span>{course?.title}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className="lecture-details">
        <h1>{course?.title}</h1>

        <div className="details-toolbar">
          <div className="tabs" aria-label="Course resource sections">
            <span className="tab-active">Description</span>
            <span>Lecture Notes</span>
            <span>Resources</span>
          </div>

          <button
            type="button"
            className="assignment-btn btn btn-secondary"
            onClick={() => navigate(`/video/${id}/assignments`)}
          >
            Assignments <FiSend />
          </button>
        </div>

        <div className="details-grid">
          <div className="details-left">
            <h3>Description</h3>
            <p>{course?.description || "No description"}</p>

            {course?.fileUrl && (
              <div className="attach-file-card">
                <div>
                  <p>Lecture Notes</p>
                  <small>Download supporting notes for this lesson.</small>
                </div>
                <a href={`https://backend-repo-production-f790.up.railway.app${course.fileUrl}`} target="_blank" rel="noreferrer">
                  <button type="button" className="btn btn-outline btn-sm"><FiDownload /> Download Notes</button>
                </a>
              </div>
            )}
          </div>

          <div className="details-right">
            <div className="doubt-card">
              <h4>Raise a Doubt</h4>

              {actionMessage.text && (
                <p className={`status-message ${actionMessage.tone} inline-status`}>
                  {actionMessage.text}
                </p>
              )}

              <textarea
                placeholder="Enter your doubt..."
                value={doubtText}
                onChange={(e) => setDoubtText(e.target.value)}
              />

              <div className="course-action-stack">
                <button
                  type="button"
                  className="submit-btn btn btn-primary"
                  onClick={handleSubmitDoubt}
                  disabled={isSubmittingDoubt || !doubtText.trim()}
                >
                  {isSubmittingDoubt ? "Submitting..." : "Submit Doubt"} <FiSend />
                </button>

                <button
                  className="secondary-action-btn btn btn-danger"
                  type="button"
                  onClick={handleUnenroll}
                  disabled={isUnenrolling}
                >
                  {isUnenrolling ? "Unenrolling..." : "Unenroll Course"}
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
