import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/courseoverview.css";

function CourseOverview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [enrolled, setEnrolled] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        {/* Return Button */}
        <div className="return-btn" onClick={() => navigate(-1)}>
          ← Return
        </div>

        {/* ===== Banner Section ===== */}
        <div className="overview-banner">
          <div className="banner-main">
            <img src="/course-banner.png" alt="Course Banner" />
          </div>

          <div className="banner-preview">
            <img src="/course-banner.png" alt="Preview" />
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="overview-container">

          {/* LEFT */}
          <div className="overview-left">
            <button className="overview-btn" disabled>
              Overview
            </button>

            <div className="overview-description">
              <h3>Lectures Description</h3>
              <p>
                This course guides you from Figma to Webflow.
                Learn how to design and publish your own website.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="overview-right">

            <button
              className="enroll-btn"
              disabled={enrolled}
              onClick={() => {
                setMessage(`Course #${id} enrollment is successful`);
                setEnrolled(true);
              }}
            >
              {enrolled ? "Enrolled" : "Enroll Now"}
            </button>

            {message && (
              <p className="success-message">{message}</p>
            )}

            <div className="course-included">
              <h4>This Course included</h4>
              <ul>
                <li>Money Back Guarantee</li>
                <li>Access on all devices</li>
                <li>Certification of completion</li>
                <li>32 Modules</li>
              </ul>
            </div>

            <div className="training-box">
              <h4>Training 5 or more people</h4>
              <p>
                Class launched less than a year ago by Blackboard co-founder.
              </p>
            </div>

            <div className="share-box">
              <h4>Share this course</h4>
              <div className="share-icons">
                <span>🔵</span>
                <span>🟣</span>
                <span>🔴</span>
                <span>⚫</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseOverview;
