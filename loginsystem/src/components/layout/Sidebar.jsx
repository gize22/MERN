// Import necessary dependencies
import { useContext } from 'react';        // Access global user data
import { NavLink } from 'react-router-dom'; // Special Link that knows when it's active
import { AuthContext } from '../../contexts/AuthContext';

const Sidebar = () => {
  // Get current user from global context
  const { user } = useContext(AuthContext);
  
  // If no user is logged in, don't show sidebar
  if (!user) return null;

  // Define menu items based on user role
  // This is the CORE of role-based access control
  const getMenuItems = () => {
    // Common menu items for ALL users
    const commonMenus = [
      { path: '/dashboard', name: 'Dashboard', icon: '📊' },
    ];

    // Role-specific menu items
    switch (user.role) {
      case 'admin':
        return [
          ...commonMenus,
          { path: '/users', name: 'Manage Users', icon: '👥' },
          { path: '/attendance/all', name: 'All Attendance', icon: '📋' },
          { path: '/reports', name: 'Reports', icon: '📈' },
        ];
      
      case 'teacher':
        return [
          ...commonMenus,
          { path: '/attendance/mark', name: 'Mark Attendance', icon: '✅' },
          { path: '/attendance/view', name: 'View Records', icon: '👀' },
          { path: '/students', name: 'My Students', icon: '🎓' },
        ];
      
      case 'student':
        return [
          ...commonMenus,
          { path: '/my-attendance', name: 'My Attendance', icon: '📅' },
          { path: '/profile', name: 'My Profile', icon: '👤' },
        ];
      
      default:
        return commonMenus;
    }
  };

  const menuItems = getMenuItems();

  return (
    // Sidebar container
    // w-64 = fixed width of 16rem (256px)
    // bg-gray-800 = dark gray background
    // text-white = white text
    // min-h-screen = minimum height = full screen
    // p-4 = padding all around
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      
      {/* Sidebar Header */}
      <div className="mb-8 pb-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-center">
          Welcome, {user.name}!
        </h2>
        <p className="text-sm text-gray-400 text-center mt-1">
          Role: {user.role.toUpperCase()}
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // className can be a function that receives the active state
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
              ${isActive 
                ? 'bg-blue-600 text-white'   // Active link styling
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'  // Inactive styling
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;