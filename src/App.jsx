import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CoursesTable from "./components/CoursesTable";
import AddCourseForm from "./components/AddCourseForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <h1>Course Scheduler</h1>
      <CoursesTable />
      <AddCourseForm />
    </div>
  );
}

export default App;
