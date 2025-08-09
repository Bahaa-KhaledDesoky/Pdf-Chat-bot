//import { useState } from 'react'
import './App.css'
import Login from './component/Login'
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
