import { Link } from "react-router-dom";
import CS from "../assets/CS.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={CS} alt="logo" style={{ height: "24px" }} />
        </a>
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
              <Link className="nav-link" to="/courses">
                Course List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-course">
                Add Course
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Semester Schedules
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
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
