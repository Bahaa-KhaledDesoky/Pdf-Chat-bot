import './App.css'
import Login from './component/Login'
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Chat from './component/Chat';
import AppHeader from './component/AppHeader';
import Setting from './component/Setting';
import { useSelector } from 'react-redux';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const userId = useSelector((state) => state.user?.user?.id);
    
    if (!userId) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
    const userId = useSelector((state) => state.user?.user?.id);
    
    if (userId) {
        return <Navigate to="/dashboard" replace />;
    }
    
    return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
