// Import necessary hooks from React and React Router
import { useContext } from 'react';        // Allows us to access global state (user data)
import { Link, useNavigate } from 'react-router-dom';  // Link = navigation between pages, useNavigate = programmatic redirect
import { AuthContext } from '../../contexts/AuthContext';  // Our global auth state (will create this later)

const Navbar = () => {
  // Get the logout function and user data from our global context
  const { user, logout } = useContext(AuthContext);
  
  // useNavigate gives us a function to redirect users programmatically
  const navigate = useNavigate();

  // Handle logout when user clicks the button
  const handleLogout = () => {
    logout();                    // Call the logout function from context (clears user data)
    navigate('/login');          // Redirect to login page
  };

  return (
    // This is the navigation bar container
    // className: Tailwind CSS classes
    // bg-blue-600 = blue background, text-white = white text
    // p-4 = padding on all sides (1rem/16px)
    // shadow-lg = large shadow effect
    // flex = display flex (for horizontal layout)
    // justify-between = space between left and right content
    // items-center = vertically center content
    <nav className="bg-blue-500 text-white p-4 shadow-lg flex justify-between items-center" >
      
      {/* Left side - Logo and App Name */}
      <div className="flex items-center space-x-4">
        {/* Link component = React Router's way of navigation without page refresh */}
        {/* to="/" = go to home/dashboard when clicked */}
        <Link to="/" className="text-xl font-bold hover:text-blue-200">
          Attendance System
        </Link>
      </div>

      {/* Right side - Shows user info and logout button (only if user is logged in) */}
      <div className="flex items-center space-x-10">
        {user ? (
          // If user exists (logged in), show this
          <>
            {/* Display user's name and role */}
            {/* bg-blue-700 = slightly darker blue background */}
            {/* px-3 py-1 = horizontal padding 0.75rem, vertical 0.25rem */}
            {/* rounded-full = makes it a pill shape */}
            <span className="bg-blue-700 px-3 py-1 rounded-full text-sm">
              {user.name} ({user.role})
            </span>
            
            {/* Logout button */}
            {/* onClick={handleLogout} = run function when clicked */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        ) : (
          // If no user (not logged in), show Login/Register links
          <div className="space-x-2">
            <Link to="/login" className="hover:text-blue-200">Login</Link>
            <Link to="/register" className="hover:text-blue-200">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;  // Make this component available to import elsewhere