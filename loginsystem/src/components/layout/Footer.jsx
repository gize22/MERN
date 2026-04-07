// Simple static footer - no complex logic needed
const Footer = () => {
  return (
    // Fixed at bottom, full width, centered text
    // mt-auto = margin-top auto (pushes footer to bottom when used with flex column)
    // py-4 = padding top and bottom 1rem
    // text-center = center align text
    // text-gray-500 = gray text color
    // border-t = top border
    <footer className="mt-auto py-4 text-center text-gray-500 border-t">
      <p>© {new Date().getFullYear()} Student Attendance Management System</p>
      <p className="text-sm mt-1">All rights reserved</p>
    </footer>
  );
};

export default Footer;