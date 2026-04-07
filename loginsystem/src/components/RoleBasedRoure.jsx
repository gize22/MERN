import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

// RoleBasedRoute - restricts access based on user role
// allowedRoles = array of roles that can access this page (e.g., ['admin', 'teacher'])
const RoleBasedRoute = ({ children, allowedRoles }) => {
  // Get user from global auth context
  const { user, loading } = useContext(AuthContext);
  
  // While checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  
  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If logged in but role is not allowed, redirect to dashboard
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // If logged in AND role is allowed, show the page
  return children;
};

export default RoleBasedRoute;