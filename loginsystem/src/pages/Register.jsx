import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
  // Get the register function from our auth context
  const { register } = useContext(AuthContext);
  
  // Hook for navigation/redirects
  const navigate = useNavigate();
  
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');  // Default role: student
  
  // State for error messages
  const [error, setError] = useState('');
  
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    // Prevent page refresh
    e.preventDefault();
    
    // Clear any previous error messages
    setError('');
    
    // Basic validation - check if all fields are filled
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Email format validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Password length validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Start loading state
    setIsLoading(true);
    
    try {
      // Call the register function from AuthContext
      await register(name, email, password, role);
      
      // If successful, redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      // If error, display the error message
      setError(err.message);
    } finally {
      // Stop loading state (whether success or error)
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>
        
        {/* Error Message Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              disabled={isLoading}
            />
          </div>
          
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>
          
          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password (min 6 characters)"
              disabled={isLoading}
            />
          </div>
          
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Role
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="student"
                  checked={role === 'student'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                  disabled={isLoading}
                />
                <span className="text-gray-700">Student</span>
                <span className="text-xs text-gray-500 ml-2">- Can only view their attendance</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  value="teacher"
                  checked={role === 'teacher'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                  disabled={isLoading}
                />
                <span className="text-gray-700">Teacher</span>
                <span className="text-xs text-gray-500 ml-2">- Can mark and manage attendance</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                  disabled={isLoading}
                />
                <span className="text-gray-700">Admin</span>
                <span className="text-xs text-gray-500 ml-2">- Full system access</span>
              </label>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
          
        </form>
        
        {/* Link to Login Page */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default Register;