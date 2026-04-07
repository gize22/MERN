import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on app start
  useEffect(() => {
    const storedUsers = localStorage.getItem('attendence_users');
    const storedUser = localStorage.getItem('attendence_current_user');
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  // Save users to localStorage
  const saveUsersToLocalStorage = (userList) => {
    localStorage.setItem('attendence_users', JSON.stringify(userList));
  };

  // Register function
  const register = async (name, email, password, role) => {
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
    
    setUser(newUser);
    localStorage.setItem('attendence_current_user', JSON.stringify(newUser));
    
    return newUser;
  };

  // Login function
  const login = async (email, password) => {
    const foundUser = users.find(
      u => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    setUser(foundUser);
    localStorage.setItem('attendence_current_user', JSON.stringify(foundUser));
    
    return foundUser;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('attendence_current_user');
  };

  // Get all users
  const getAllUsers = () => {
    return users;
  };

  // Get users by role
  const getUsersByRole = (role) => {
    return users.filter(u => u.role === role);
  };

  const value = {
    user,
    users,
    loading,
    register,
    login,
    logout,
    getAllUsers,
    getUsersByRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};