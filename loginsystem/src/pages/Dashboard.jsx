import { useContext } from 'react';
import { AttendanceContext } from "../contexts/AttendanceContext";
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { attendanceRecords } = useContext(AttendanceContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-2">
            Welcome, {user?.name}!
          </h2>
          <p className="text-gray-600 mb-4">
            You are logged in as a <span className="font-bold capitalize">{user?.role}</span>
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded p-6">
            <p className="text-blue-700">
              {user?.role === 'admin' && "You have full system access. Manage users and view all attendance records."}
              {user?.role === 'teacher' && "You can mark attendance for your classes and view student records."}
              {user?.role === 'student' && "You can view your own attendance history."}
            </p>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;