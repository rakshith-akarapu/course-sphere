import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { clearCurrentUser } from "../../utils/auth";

const Doubts = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  const [replies, setReplies] = useState({});

  const doubts = [
    { id:1, student:"Rahul", question:"What is responsive design?" },
    { id:2, student:"Sneha", question:"Can you explain Flexbox again?" },
    { id:3, student:"Arjun", question:"Difference between Grid and Flexbox?" }
  ];

  const handleReply = (id, text) => {
    setReplies({
      ...replies,
      [id]: text
    });
  };

  return (
    <>
      <style>{`

      *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family:"Poppins", sans-serif;
      }

      body{
        background:#f4f6fb;
      }

      /* UPDATED TOPBAR */

      .topbar{
        background:white;
        padding:10px 30px;
        display:flex;
        justify-content:flex-end;
        align-items:center;
        border-bottom:1px solid #eee;
      }

      .nav-right{
        display:flex;
        align-items:center;
        gap:20px;
      }

      .profile-icon{
        color:#555;
        cursor:pointer;
        transition:0.25s ease;
      }

      .profile-icon:hover{
        color:#6c63ff;
        transform:scale(1.1);
      }

      .logout-btn{
        border:none;
        padding:6px 16px;
        border-radius:999px;
        background:linear-gradient(90deg,#6c63ff,#8b7cff);
        color:#fff;
        cursor:pointer;
        font-weight:600;
        transition:0.2s ease;
      }

      .logout-btn:hover{
        transform:translateY(-1px);
        box-shadow:0 8px 18px rgba(108,99,255,0.25);
      }

      /* CONTENT */

      .container{
        padding:40px;
        max-width:900px;
        margin:auto;
      }

      .back-button{
        display:inline-flex;
        align-items:center;
        gap:8px;
        padding:10px 18px;
        border-radius:8px;
        border:1px solid #6c63ff;
        background:white;
        color:#6c63ff;
        font-weight:600;
        cursor:pointer;
        transition:0.25s ease;
        margin-bottom:25px;
      }

      .back-button:hover{
        background:#6c63ff;
        color:white;
        transform:translateY(-1px);
        box-shadow:0 8px 18px rgba(108,99,255,0.25);
      }

      .doubt-card{
        background:white;
        padding:25px;
        border-radius:12px;
        margin-bottom:25px;
        box-shadow:0 5px 15px rgba(0,0,0,0.05);
        transition:0.2s;
      }

      .doubt-card:hover{
        transform:translateY(-3px);
        box-shadow:0 10px 25px rgba(0,0,0,0.08);
      }

      .student-name{
        font-weight:600;
        margin-bottom:6px;
      }

      .question{
        color:#555;
        margin-bottom:15px;
      }

      textarea{
        width:100%;
        min-height:90px;
        border:1px solid #ddd;
        border-radius:8px;
        padding:12px;
        resize:none;
        font-size:14px;
      }

      textarea:focus{
        outline:none;
        border:1px solid #6c63ff;
      }

      .reply-status{
        color:#2ecc71;
        font-size:13px;
        font-weight:500;
        margin-top:8px;
      }

      `}</style>

      {/* UPDATED NAVBAR */}

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

      {/* CONTENT */}

      <div className="container">

        <button
          className="back-button"
          onClick={()=>navigate("/educator/courses")}
        >
          <FaArrowLeft />
          Back to Courses
        </button>

        {doubts.map(d => (

          <div key={d.id} className="doubt-card">

            <div className="student-name">
              {d.student}
            </div>

            <div className="question">
              {d.question}
            </div>

            <textarea
              placeholder="Write your reply to the student..."
              value={replies[d.id] || ""}
              onChange={(e)=>handleReply(d.id, e.target.value)}
            />

            {replies[d.id] && (
              <div className="reply-status">
                ✔ Reply Saved
              </div>
            )}

          </div>

        ))}

      </div>

    </>
  );
};

export default Doubts;