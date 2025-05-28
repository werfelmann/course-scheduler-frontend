import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Course Scheduler
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Schedule
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">
                Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sections">
                Sections
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/export">
                Export
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {/* Semester Dropdown */}
            <select className="form-select me-3" aria-label="Select Semester">
              <option>Fall 2025</option>
              <option>Spring 2026</option>
              <option>Summer 2026</option>
            </select>

            {/* Dummy login/logout */}
            <Link className="btn btn-outline-dark" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
