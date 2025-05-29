import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import pencil from "../assets/pencil-square.svg";

function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "fullCourseNumber",
    direction: "asc",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error.");
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const sortedCourses = useMemo(() => {
    const sortableCourses = [...courses];
    if (sortConfig.key) {
      sortableCourses.sort((a, b) => {
        const aVal = a[sortConfig.key]?.toString().toLowerCase() || "";
        const bVal = b[sortConfig.key]?.toString().toLowerCase() || "";

        if (aVal < bVal) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }

        if (aVal > bVal) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }

        return 0;
      });
    }
    return sortableCourses;
  }, [courses, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const goToCourseDetails = (id) => {
    navigate(`/courses/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid">
      <table className="table table-striped mx-auto">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("fullCourseNumber")}
                className="btn btn-light"
              >
                Course Number
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("name")}
                className="btn btn-light"
              >
                Course Title
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("creditHours")}
                className="btn btn-light"
              >
                Credit Hours
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("typicalRotation")}
                className="btn btn-light"
              >
                Rotation
              </button>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.fullCourseNumber}</td>
              <td>{course.name}</td>
              <td>
                {course.minCreditHours < course.maxCreditHours
                  ? `${course.minCreditHours}-${course.maxCreditHours}`
                  : course.minCreditHours}
              </td>
              <td>
                {course.typicalRotation.length > 0
                  ? course.typicalRotation.join(", ")
                  : "As Needed"}
              </td>
              <td>
                <button
                  className="btn btn-sm"
                  onClick={() => goToCourseDetails(course.id)}
                >
                  <img src={pencil} alt="edit" style={{ height: "18px" }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoursesTable;
