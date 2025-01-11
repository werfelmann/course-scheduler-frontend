import { useState } from "react";

const rotationOptions = [
    { label: 'Fall', value: 'FA' }, 
    { label: 'Spring', value: 'SP' }, 
    { label: 'Fall 1', value: 'FA1' }, 
    { label: 'Fall 2', value: 'FA2' }, 
    { label: 'Spring 1', value: 'SP1' }, 
    { label: 'Spring 2', value: 'SP2' }, 
    { label: 'Summer', value: 'SU' }, 
];

function AddCourseForm() {
    const [courseNumber, setCourseNumber] = useState('');
    const [name, setName] = useState('');
    const [creditHours, setCreditHours] = useState(0);
    const [typicalRotation, setTypicalRotation] = useState([]);

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setTypicalRotation((prev) => [...prev, value]);
        } else {
            setTypicalRotation((prev) => prev.filter((option) => option !== value));
        }
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const newCourse = {
            courseNumber,
            name,
            creditHours,
            typicalRotation,
        };

        try {
            const response = await fetch('http://localhost:8080/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });

            if (!response.ok) {
                throw new Error('Failed to create course');
            }

            const data = await response.json();
            console.log('Course created:', data);
            setSuccessMessage(`Course "${data.name}" created successfully!`);

            setCourseNumber('');
            setName('');
            setCreditHours(0);
            setTypicalRotation([]);
        } catch (err) {
            console.log(err);
            setError(err.message || 'Something went wrong');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add a New Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="courseNumber" className="form-label">Course Number</label>
                    <input 
                        type="text"
                        id="courseNumber"
                        className="form-control"
                        value={courseNumber}
                        onChange={(e) => setCourseNumber(e.target.value)}
                        required 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Course Title</label>
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
                    <label htmlFor="creditHours" className="form-label">Credit Hours</label>
                    <input 
                        type="text"
                        id="creditHours"
                        className="form-control"
                        value={creditHours}
                        onChange={(e) => setCreditHours(e.target.value)}
                        required 
                    />
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
                                    <label htmlFor={option.value} className="form-check-label">{option.label}</label>
                                </div>
                            ))}
                        </div>
                </div>

                <button type="submit" className="btn btn-dark">Add Course</button>

            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

        </div>
    )
}

export default AddCourseForm;