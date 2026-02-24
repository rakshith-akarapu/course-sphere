import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBell, FaUserCircle } from "react-icons/fa";

const Doubts = () => {

  const navigate = useNavigate();

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

      /* TOPBAR */

      .topbar{
        background:white;
        padding:16px 40px;
        display:flex;
        justify-content:space-between;
        align-items:center;
        border-bottom:1px solid #eee;
      }

      .nav-left{
        display:flex;
        align-items:center;
        gap:20px;
      }

      .back-btn{
        display:flex;
        align-items:center;
        gap:8px;
        cursor:pointer;
        color:#6c63ff;
        font-weight:500;
        font-size:14px;
        padding:8px 14px;
        border-radius:8px;
        transition:0.2s;
      }

      .back-btn:hover{
        background:#f1f1ff;
      }

      .page-title{
        font-size:18px;
        font-weight:600;
      }

      .nav-right{
        display:flex;
        align-items:center;
        gap:25px;
      }

      /* CONTENT */

      .container{
        padding:40px;
        max-width:900px;
        margin:auto;
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

      {/* TOP NAVBAR */}

      <div className="topbar">

        <div className="nav-left">

          <div
            className="back-btn"
            onClick={()=>navigate(-1)}
          >
            <FaArrowLeft />
            Back
          </div>

          <div className="page-title">
            Student Doubts
          </div>

        </div>

        <div className="nav-right">
          <FaBell />
          <FaUserCircle size={26}/>
        </div>

      </div>

      {/* CONTENT */}

      <div className="container">

        {doubts.map(d => (

          <div
            key={d.id}
            className="doubt-card"
          >

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