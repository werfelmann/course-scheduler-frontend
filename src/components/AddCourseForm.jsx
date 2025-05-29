import { useState } from "react";

const rotationOptions = [
  { label: "Fall", value: "FA" },
  { label: "Spring", value: "SP" },
  { label: "Fall 1", value: "FA1" },
  { label: "Fall 2", value: "FA2" },
  { label: "Spring 1", value: "SP1" },
  { label: "Spring 2", value: "SP2" },
  { label: "Summer", value: "SU" },
];

function AddCourseForm() {
  const [courseNumber, setCourseNumber] = useState("");
  const [name, setName] = useState("");
  const [isVariableCredit, setIsVariableCredit] = useState(false);
  const [minCreditHours, setMinCreditHours] = useState(3);
  const [maxCreditHours, setMaxCreditHours] = useState(3);
  const [typicalRotation, setTypicalRotation] = useState([]);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleCourseNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setCourseNumber(value);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setTypicalRotation((prevState) => [...prevState, value]);
    } else {
      setTypicalRotation((prevState) =>
        prevState.filter((rotationOption) => rotationOption !== value)
      );
    }
  };

  const handleVariableCreditChange = (e) => {
    setIsVariableCredit(e.target.checked);
    if (!e.target.checked) {
      setMaxCreditHours(minCreditHours);
    }
  };

  const handleMinCreditChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setMinCreditHours(value);
    if (!isVariableCredit) {
      setMaxCreditHours(value);
    }
  };

  const handleMaxCreditChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    setMaxCreditHours(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (courseNumber.length !== 4) {
      setError("Course number must be a 4 digit number.");
      return;
    }

    const newCourse = {
      courseNumber,
      name,
      minCreditHours,
      maxCreditHours,
      typicalRotation,
      description,
      notes,
    };

    try {
      const response = await fetch("http://localhost:8080/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      const data = await response.json();
      console.log("Course created:", data);
      setSuccessMessage(`Course "${data.name}" created successfully!`);

      setCourseNumber("");
      setName("");
      setMinCreditHours(3);
      setMaxCreditHours(3);
      setTypicalRotation([]);
      setIsVariableCredit(false);
      setDescription("");
      setNotes("");
    } catch (err) {
      console.log(err);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add a New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="courseNumber" className="form-label">
            Course Number
          </label>
          <input
            type="text"
            id="courseNumber"
            className="form-control"
            value={courseNumber}
            onChange={handleCourseNumberChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Course Title
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Course Description
          </label>
          <textarea
            rows={4}
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="form-label">Variable Credit?</label>
          <input
            type="checkbox"
            className="form-check-input ms-2"
            checked={isVariableCredit}
            onChange={handleVariableCreditChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="creditHours" className="form-label">
            Credit Hours
          </label>
          {!isVariableCredit ? (
            <input
              type="number"
              className="form-control"
              value={minCreditHours}
              onChange={handleMinCreditChange}
            />
          ) : (
            <div className="d-flex gap-2">
              <input
                type="number"
                className="form-control"
                value={minCreditHours}
                onChange={handleMinCreditChange}
                required
                placeholder="Min"
              />
              <span className="align-self-center">to</span>
              <input
                type="number"
                className="form-control"
                value={maxCreditHours}
                onChange={handleMaxCreditChange}
                required
                placeholder="Max"
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Typical Rotation</label>
          <div>
            {rotationOptions.map((option) => (
              <div key={option.value} className="form-check form-check-inline">
                <input
                  type="checkbox"
                  id={option.value}
                  className="form-check-input"
                  value={option.value}
                  checked={typicalRotation.includes(option.value)}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={option.value} className="form-check-label">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label">
            Notes
          </label>
          <textarea
            rows={4}
            id="notes"
            className="form-control"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-dark">
          Add Course
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}
    </div>
  );
}

export default AddCourseForm;
