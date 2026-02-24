import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { clearCurrentUser, getCurrentUser } from "../utils/auth";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentUser = getCurrentUser();

  const currentQuery = searchParams.get("q") || "";
  const isCourseListingPage =
    location.pathname.startsWith("/courses") || location.pathname.startsWith("/explore");

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const trimmed = String(formData.get("search") || "").trim();

    if (isCourseListingPage) {
      const nextParams = new URLSearchParams(searchParams);
      if (trimmed) {
        nextParams.set("q", trimmed);
      } else {
        nextParams.delete("q");
      }
      setSearchParams(nextParams);
      return;
    }

    if (trimmed) {
      navigate(`/explore?q=${encodeURIComponent(trimmed)}`);
      return;
    }

    navigate("/explore");
  };

  const handleSearchInputChange = (event) => {
    const typedValue = event.target.value;
    const nextParams = new URLSearchParams(searchParams);

    if (typedValue.trim()) {
      nextParams.set("q", typedValue);
    } else {
      nextParams.delete("q");
    }

    setSearchParams(nextParams, { replace: true });
  };

  const handleClearSearch = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("q");
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <div className="navbar">

      {/* Search */}
      <div className="nav-left">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="search"
            className="search-input"
            placeholder="Search courses, instructor..."
            name="search"
            value={currentQuery}
            onChange={handleSearchInputChange}
          />
          {currentQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          <button type="submit" className="search-submit-btn">Search</button>
        </form>
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
