import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const rotationOptions = [
  { label: "Fall", value: "FA" },
  { label: "Spring", value: "SP" },
  { label: "Fall 1", value: "FA1" },
  { label: "Fall 2", value: "FA2" },
  { label: "Spring 1", value: "SP1" },
  { label: "Spring 2", value: "SP2" },
  { label: "Summer", value: "SU" },
];

function CourseDetails() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/courses/${courseId}`
        );
        if (!res.ok) throw new Error("Failed to load course");
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleChange = (field, value) => {
    setCourse({ ...course, [field]: value });
  };

  const handleRotationChange = (value) => {
    const updated = course.typicalRotation.includes(value)
      ? course.typicalRotation.filter((r) => r !== value)
      : [...course.typicalRotation, value];
    handleChange("typicalRotation", updated);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`http://localhost:8080/api/courses/${courseId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Deletion failed");
      setSuccess("Course has been deleted.");
      setCourse(null);
      navigate("/courses");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`http://localhost:8080/api/courses/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(course),
      });
      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();
      setCourse(data);
      setSuccess("Course updated successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (!course) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Course Details</h2>

      <h3 className="mt-4 mb-3">MUSC {course.courseNumber}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Course Name</label>
          <input
            className="form-control"
            value={course.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="mb-3 d-flex gap-2">
          <div>
            <label className="form-label">Min Credits</label>
            <input
              type="number"
              className="form-control"
              value={course.minCreditHours}
              onChange={(e) =>
                handleChange("minCreditHours", Number(e.target.value))
              }
            />
          </div>
          <div>
            <label className="form-label">Max Credits</label>
            <input
              type="number"
              className="form-control"
              value={course.maxCreditHours}
              onChange={(e) =>
                handleChange("maxCreditHours", Number(e.target.value))
              }
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Semesters Offered</label>
          <div>
            {rotationOptions.map((opt) => (
              <div className="form-check form-check-inline" key={opt.value}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={course.typicalRotation.includes(opt.value)}
                  onChange={() => handleRotationChange(opt.value)}
                />
                <label className="form-check-label">{opt.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows={4}
            value={course.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            className="form-control"
            rows={2}
            value={course.notes || ""}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </div>

        <div className="container-fluid">
          <div className="row justify-content-between">
            <button onClick={handleDelete} className="btn btn-danger col-4">
              Delete Course
            </button>
            <button type="submit" className="btn btn-dark col-4">
              Save Changes
            </button>
          </div>
        </div>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {success && <div className="alert alert-success mt-3">{success}</div>}

      {/* Placeholder for sections by semester */}
      <div className="mt-5">
        <h4>Sections</h4>
        <p className="text-muted">
          Sections organized by semester will appear here.
        </p>
      </div>
    </div>
  );
}

export default CourseDetails;
