import { useRef, useState } from "react";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import "../styles/assignmentupload.css";

function AssignmentUpload() {

  const { id, assignmentId } = useParams();
  const navigate = useNavigate();

  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = localStorage.getItem("token");

  const setFileFromList = (fileList) => {
    const file = fileList?.[0];
    if (!file) return;
    setSelectedFile(file);
    setErrorMessage("");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setFileFromList(event.dataTransfer.files);
  };

  // 🔥 SUBMIT TO BACKEND
  const handleSubmit = async () => {

    if (!selectedFile) {
      setErrorMessage("Please upload a file before submitting.");
      return;
    }

    try {

      // 🔥 STEP 1: Upload file
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadRes = await API.post(
        "/file/upload",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      const fileUrl = uploadRes.data;

      // 🔥 STEP 2: Submit assignment
      await API.post(
        "/student/submit",
        {
          assignmentId: Number(assignmentId),
          fileUrl: fileUrl,
          description: description
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      alert("Assignment submitted ✅");
      navigate(`/video/${id}/assignments`);

    } catch (err) {
      console.error(err);
      setErrorMessage("Upload failed ❌");
    }
  };

  return (
    <div className="assignment-upload-page">

      <header className="assignment-upload-topbar">
        <button
          className="assignment-upload-back-btn"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft />
        </button>
        <h2>Assignments</h2>
      </header>

      <main className="assignment-upload-main">

        <h1>Upload Assignment</h1>

        <div className="assignment-upload-layout">

          <section className="assignment-upload-card">
            <h3>Upload Document</h3>

            <div
              className={isDragging ? "drop-zone drop-zone-active" : "drop-zone"}
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
            >
              <FiPlus className="drop-plus-icon" />
              <p>Drag and drop</p>

              <button
                type="button"
                className="upload-from-system-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload from System
              </button>

              <input
                ref={fileInputRef}
                type="file"
                hidden
                onChange={(e) => setFileFromList(e.target.files)}
              />

              {selectedFile && (
                <p className="selected-file-text">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            <label>Description</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes"
            />

            {errorMessage && (
              <p className="upload-error">{errorMessage}</p>
            )}

          </section>

          <aside className="upload-action-buttons">

            <button
              className="cancel-upload-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button
              className="submit-upload-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>

          </aside>

        </div>

      </main>
    </div>
  );
}

export default AssignmentUpload;