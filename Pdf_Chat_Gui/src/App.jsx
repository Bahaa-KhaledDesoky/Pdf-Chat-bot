import './App.css'
import Login from './component/Login'
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Chat from './component/Chat';

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
