import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { AttendanceProvider } from './contexts/AttendanceContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AttendanceProvider>
        <App />
      </AttendanceProvider>
    </AuthProvider>
  </React.StrictMode>,
)
