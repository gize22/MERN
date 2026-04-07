// This component wraps all pages with Navbar, Sidebar, Footer
import { Outlet } from 'react-router-dom';  // Outlet = where page content gets rendered
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const Layout = () => {
  const { user } = useContext(AuthContext);
  
  // Check if we should show sidebar (only on protected routes, not on login/register)
  const showSidebar = user !== null;  // Show sidebar only when logged in

  return (
    // Flex column layout - stacks children vertically
    <div className="min-h-screen flex flex-col">
      {/* Navbar always at top */}
      <Navbar />
      
      {/* Main content area - grows to fill space */}
      <div className="flex flex-1">
        {/* Conditionally render sidebar */}
        {showSidebar && <Sidebar />}
        
        {/* Main content - outlet is where routed pages render */}
        {/* p-6 = padding, flex-1 = takes remaining width */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet />  {/* This is where Dashboard, Users, Attendance pages go */}
        </main>
      </div>
      
      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default Layout;