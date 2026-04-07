/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('attendence_users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('attendence_current_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  // Set loading false after initial localStorage hydration
  useEffect(() => {
    setLoading(false);
  }, []);

  // Save users to localStorage
  const saveUsersToLocalStorage = (userList) => {
    localStorage.setItem('attendence_users', JSON.stringify(userList));
  };

  // Register function
  const register = async (name, email, password, role) => {
    // 1. Check if email exists
    const existingUser = users.find(u => u.email === email);
    
  
    if (existingUser) {
      throw new Error('Email already registered');
    }
     // 2. Create user object
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    // 3. Save to users array
    const updatedUsers = [...users, newUser];
      // 4. Save to localStorage
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
