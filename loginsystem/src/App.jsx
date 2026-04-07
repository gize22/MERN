import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

// Layout Components
import Layout from './components/layout/Layout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ManageUsers from './pages/ManageUsers';
// import AllAttendance from './pages/AllAttendance';
import ViewAttendance from './pages/ViewAttendance';
import StudentsList from './pages/StudentsList';
import Profile from './pages/Profile';
import MarkAttendance from './pages/MarkAttendance';
import MyAttendance from './pages/MyAttendance';

// Protected Route Components
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';

// Placeholder components for pages we'll build later
// These will be replaced with actual components in future steps
// const ManageUsers = () => <div className="text-center py-10">Manage Users Page (Admin Only)</div>;
// const MarkAttendance = () => <div className="text-center py-10">Mark Attendance Page (Teacher Only)</div>;
// const MyAttendance = () => <div className="text-center py-10">My Attendance Page (Student Only)</div>;
// const AllAttendance = () => <div className="text-center py-10">All Attendance Records (Admin Only)</div>;
// const Reports = () => <div className="text-center py-10">Reports Page (Admin Only)</div>;
// const StudentsList = () => <div className="text-center py-10">My Students Page (Teacher Only)</div>;
// const ViewAttendance = () => <div className="text-center py-10">View Attendance Records (Teacher Only)</div>;
// const Profile = () => <div className="text-center py-10">My Profile Page (All Users)</div>;

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Public Routes - accessible without login */}
        {/* These are outside the Layout because they don't need sidebar/navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes - require login, wrapped in Layout */}
        {/* The Layout component contains Navbar, Sidebar, Footer */}
        <Route element={<Layout />}>
          
          {/* Dashboard - accessible by all logged-in users */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Profile - accessible by all logged-in users */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* ADMIN ONLY ROUTES */}
          <Route 
            path="/users" 
            element={
              <RoleBasedRoute allowedRoles={['admin']}>
                <ManageUsers />
              </RoleBasedRoute>
            } 
          />
          {/* <Route 
            path="/attendance/all" 
            element={
              <RoleBasedRoute allowedRoles={['admin']}>
                <AllAttendance />
              </RoleBasedRoute>
            } 
          /> */}
          
          {/* TEACHER ONLY ROUTES */}
          <Route 
            path="/attendance/mark" 
            element={
              <RoleBasedRoute allowedRoles={['teacher']}>
                <MarkAttendance />
              </RoleBasedRoute>
            } 
          />
          <Route 
            path="/attendance/view" 
            element={
              <RoleBasedRoute allowedRoles={['teacher']}>
                <ViewAttendance />
              </RoleBasedRoute>
            } 
          />
          <Route 
            path="/students" 
            element={
              <RoleBasedRoute allowedRoles={['teacher']}>
                <StudentsList />
              </RoleBasedRoute>
            } 
          />
          
          {/* STUDENT ONLY ROUTES */}
          <Route 
            path="/my-attendance" 
            element={
              <RoleBasedRoute allowedRoles={['student']}>
                <MyAttendance />
              </RoleBasedRoute>
            } 
          />
          
          {/* Catch-all: Any undefined route redirects to dashboard or login */}
          <Route 
            path="*" 
            element={
              user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;