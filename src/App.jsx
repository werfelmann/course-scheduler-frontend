import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container mt-1'>
        <h1 className='text-center'>Course Scheduler</h1>
        <button className='btn btn-primary' onClick={() => setCount((count) => count + 1)}>Click Me This Many: {count}</button>
      </div>
    </>
  )
}

export default App
