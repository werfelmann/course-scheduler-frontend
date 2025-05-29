import { Routes, Route } from "react-router-dom";
import "./App.css";
import CoursesTable from "./components/CoursesTable";
import AddCourseForm from "./components/AddCourseForm";
import Navbar from "./components/Navbar";
import CourseDetails from "./components/CourseDetails";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/courses" element={<CoursesTable />} />
        <Route path="/add-course" element={<AddCourseForm />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
      </Routes>
    </div>
  );
}

export default App;
