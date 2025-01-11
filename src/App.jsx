import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import CoursesTable from './components/CoursesTable'
import Navbar from './components/NavBar';
import AddCourseForm from './components/AddCourseForm';

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

export default App
