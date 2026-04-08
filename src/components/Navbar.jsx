import { useEffect, useState } from "react";
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
  const [searchValue, setSearchValue] = useState(currentQuery);

  useEffect(() => {
    setSearchValue(currentQuery);
  }, [currentQuery]);

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmed = searchValue.trim();

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
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("q");
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <div className="navbar">

      {/* Search */}
      <div className="nav-left">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-input-wrap">
            <input
              type="search"
              className="search-input"
              placeholder="Search courses or educator"
              name="search"
              value={searchValue}
              onChange={handleSearchInputChange}
            />
            {searchValue && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <button type="submit" className="search-submit-btn btn btn-primary btn-sm">Search</button>
        </form>
      </div>

      {/* Right Section */}
      <div className="nav-right">
        <div className="user-meta">
          <span className="user-label">Signed in as</span>
          <span className="user-name">{currentUser?.name || "Guest"}</span>
        </div>

        <button
          className="logout-btn btn btn-outline btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Navbar;
