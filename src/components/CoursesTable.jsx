import { useState, useEffect, useMemo } from "react";

function CoursesTable() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

    const sortedCourses = useMemo(() => {
        const sortableCourses = [...courses];
        if (sortConfig.key) {
            sortableCourses.sort((a, b) => {
                const aVal = a[sortConfig.key]?.toString().toLowerCase() || '';
                const bVal = b[sortConfig.key]?.toString().toLowerCase() || '';

                if (aVal < bVal) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }

                if (aVal > bVal) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                
                return 0;
            });
        }
        return sortableCourses;
    }, [courses, sortConfig]);

    const requestSort = (key) => {
        let direction = 'asc';

        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
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
                            <button type="button" onClick={() => requestSort('fullCourseNumber')} className="btn btn-light">
                                Course Number
                            </button>
                        </th>
                        <th>
                            <button type="button" onClick={() => requestSort('name')} className="btn btn-light">
                                Course Title
                            </button>
                        </th>
                        <th>
                            <button type="button" onClick={() => requestSort('creditHours')} className="btn btn-light">
                                Credit Hours
                            </button></th>
                        <th>
                            <button type="button" onClick={() => requestSort('typicalRotation')} className="btn btn-light">
                                Typical Rotation
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCourses.map((course) => (
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