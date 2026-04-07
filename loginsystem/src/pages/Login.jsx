import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  // Get the login function from our auth context
  const { login } = useContext(AuthContext);
  
  // Hook for navigation/redirects
  const navigate = useNavigate();
  
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
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
    
    // Basic validation - check if fields are filled
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Start loading state
    setIsLoading(true);
    
    try {
      // Call the login function from AuthContext
      await login(email, password);
      
      // If successful, redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      // If error, display the error message
      setError(err.message);
    } finally {
      // Stop loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        
        {/* Header */}
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h2>
        
        {/* Error Message Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {/* Form */}
        <form onSubmit={handleSubmit}>
          
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          
        </form>
        
        {/* Link to Register Page */}
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
        
        {/* Demo credentials hint (helpful for testing) */}
        <div className="mt-6 p-3 bg-gray-50 rounded border border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Demo Credentials (for testing):<br/>
            Email: john@example.com | Password: 123456
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default Login;