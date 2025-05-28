import { useState, useEffect, useMemo } from "react";

function CoursesTable() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "fullCourseNumber",
    direction: "asc",
  });
  const [showModal, setShowModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("courses data: ", data);
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDeleteClick = (courseId) => {
    setCourseToDelete(courseId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/courses/${courseToDelete}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete course.");
      }

      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseToDelete)
      );
      setShowModal(false);
      setCourseToDelete(null);
    } catch (err) {
      setError("Error deleting course.", err);
    }
  };

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
                  onClick={() => handleDeleteClick(course.id)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this course?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursesTable;
