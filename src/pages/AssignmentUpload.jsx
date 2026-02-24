import { useRef, useState } from "react";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { getAssignmentById } from "../data/assignments";
import { saveAssignmentSubmission } from "../utils/assignmentSubmissions";
import "../styles/assignmentupload.css";

function AssignmentUpload() {
  const { id, assignmentId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const courseId = Number(id);
  const assignmentIdNumber = Number(assignmentId);
  const assignment = getAssignmentById(courseId, assignmentIdNumber);

  const setFileFromList = (fileList) => {
    const firstFile = fileList?.[0];
    if (!firstFile) {
      return;
    }
    setSelectedFile(firstFile);
    setErrorMessage("");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setFileFromList(event.dataTransfer.files);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      setErrorMessage("Please upload a file before submitting.");
      return;
    }

    saveAssignmentSubmission(courseId, assignmentIdNumber, {
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      description: description.trim(),
      uploadedAt: new Date().toISOString(),
    });

    navigate(`/video/${id}/assignments`);
  };

  return (
    <div className="assignment-upload-page">
      <header className="assignment-upload-topbar">
        <button className="assignment-upload-back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h2>Assignments</h2>
      </header>

      <main className="assignment-upload-main">
        <h1>{assignment?.title || "Upload Assignment"}</h1>

        <div className="assignment-upload-layout">
          <section className="assignment-upload-card">
            <h3>Upload Document</h3>

            <div
              className={isDragging ? "drop-zone drop-zone-active" : "drop-zone"}
              onDrop={handleDrop}
              onDragOver={(event) => {
                event.preventDefault();
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
                onChange={(event) => setFileFromList(event.target.files)}
              />

              {selectedFile && <p className="selected-file-text">Selected: {selectedFile.name}</p>}
            </div>

            <label>Description</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add short notes for your submission"
            />
            {errorMessage && <p className="upload-error">{errorMessage}</p>}
          </section>

          <aside className="upload-action-buttons">
            <button className="cancel-upload-btn" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button className="submit-upload-btn" onClick={handleSubmit}>
              Submit
            </button>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default AssignmentUpload;
