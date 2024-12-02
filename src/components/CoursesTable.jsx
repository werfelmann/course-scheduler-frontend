import React, { useState, useEffect } from "react";

function CoursesTable() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/courses')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setCourses(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setError(error.message);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container-fluid">
            <table className="table table-striped mx-auto">
                <thead>
                    <tr>
                        <th>Course Number</th>
                        <th>Course Title</th>
                        <th>Credit Hours</th>
                        <th>Typical Rotation</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id}>
                            <td>{course.fullCourseNumber}</td>
                            <td>{course.name}</td>
                            <td>{course.creditHours}</td>
                            <td>{course.typicalRotation.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

}

export default CoursesTable;