import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import API from "../../api/api";
import { clearCurrentUser } from "../../utils/auth";

const Doubts = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const goToSettings = () => {
    navigate("/educator/settings");
  };

  const [doubts, setDoubts] = useState([]);
  const [replies, setReplies] = useState({});

  // 🔥 FETCH DOUBTS FROM BACKEND
  useEffect(() => {
    API.get("/educator/doubts", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(res => setDoubts(res.data))
    .catch(err => console.error(err));
  }, []);

  const handleReply = (id, text) => {
    setReplies({
      ...replies,
      [id]: text
    });
  };

  // 🔥 SEND REPLY TO BACKEND
  const submitReply = (doubtId) => {

    const message = replies[doubtId];
    if (!message) return;

    API.post("/educator/reply", {
      doubtId: doubtId,
      answer: message
    }, {
      headers: {
        Authorization: "Bearer " + token
      }
    })
    .then(() => {
      alert("Reply submitted ✅");
      setReplies((current) => ({
        ...current,
        [doubtId]: ""
      }));
    })
    .catch(err => console.error(err));
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
      }

      .container{
        padding:40px;
        max-width:900px;
        margin:auto;
      }

      .back-button{
        padding:10px 18px;
        border-radius:8px;
        border:1px solid #6c63ff;
        background:white;
        color:#6c63ff;
        cursor:pointer;
        margin-bottom:25px;
      }

      .doubt-card{
        background:white;
        padding:25px;
        border-radius:12px;
        margin-bottom:25px;
        box-shadow:0 5px 15px rgba(0,0,0,0.05);
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
      }

      .reply-btn{
        margin-top:10px;
        padding:8px 14px;
        background:#6c63ff;
        color:white;
        border:none;
        border-radius:6px;
        cursor:pointer;
      }

      .reply-status{
        color:#2ecc71;
        font-size:13px;
        margin-top:8px;
      }

      `}</style>

      {/* NAVBAR */}
      <div className="topbar">
        <div className="nav-right">
          <FaUserCircle size={24} className="profile-icon" onClick={goToSettings}/>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container">

        <button
          className="back-button"
          onClick={()=>navigate("/educator/courses")}
        >
          <FaArrowLeft /> Back
        </button>

        {doubts.length === 0 && (
          <div className="doubt-card">
            <div className="question">No doubts yet for your courses.</div>
          </div>
        )}

        {doubts.map(d => (

          <div key={d.id} className="doubt-card">

            <div className="student-name">
              {d.studentEmail}
            </div>

            <div className="question">
              {d.question}
            </div>

            <textarea
              placeholder="Write your reply..."
              value={replies[d.id] || ""}
              onChange={(e)=>handleReply(d.id, e.target.value)}
            />

            <button
              className="reply-btn"
              onClick={()=>submitReply(d.id)}
            >
              Submit Reply
            </button>

            {replies[d.id] && (
              <div className="reply-status">
                ✔ Ready to submit
              </div>
            )}

          </div>

        ))}

      </div>
    </>
  );
};

export default Doubts;
