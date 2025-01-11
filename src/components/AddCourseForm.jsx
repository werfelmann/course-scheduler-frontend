import { useState } from "react";

function AddCourseForm() {
    const [courseNumber, setCourseNumber] = useState('');
    const [name, setName] = useState('');
    const [creditHours, setCreditHours] = useState(0);
    const [typicalRotation, setTypicalRotation] = useState(['']);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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
            setTypicalRotation(['']);
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
                    <label htmlFor="typicalRotation" className="form-label">Typical Rotation</label>
                    <input 
                        type="text"
                        id="typicalRotation"
                        className="form-control"
                        value={typicalRotation}
                        onChange={(e) => setTypicalRotation(e.target.value.split(',').map(item => item.trim()))}
                        placeholder='e.g., FA, SP, FA1, etc.' 
                    />
                    <small className="text-muted">
                        Enter one or more rotations separated by commas. Example: "FA, SP"
                    </small>
                </div>

                <button type="submit" className="btn btn-dark">Add Course</button>

            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

        </div>
    )
}

export default AddCourseForm;