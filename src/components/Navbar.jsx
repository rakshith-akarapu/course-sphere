import { useNavigate } from "react-router-dom";
import { clearCurrentUser, getCurrentUser } from "../utils/auth";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  return (
    <div className="navbar">

      {/* Search */}
      <div className="nav-left">
        <input type="text" placeholder="Search..." />
      </div>

      {/* Right Section */}
      <div className="nav-right">
        <span className="user-name">{currentUser?.name || "Guest"}</span>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Navbar;
