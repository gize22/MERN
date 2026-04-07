import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AttendanceContext } from '../contexts/AttendanceContext';

const Profile = () => {
  const { user, users, setUsers, saveUsersToLocalStorage } = useContext(AuthContext);
  const { getStudentAttendanceSummary } = useContext(AttendanceContext);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const attendanceSummary = user?.role === 'student' ? getStudentAttendanceSummary(user.id) : null;

  const handleSave = () => {
    if (!name || !email) {
      setError('Name and email are required');
      return;
    }
    
    // Update user in the users array
    const updatedUsers = users.map(u => {
      if (u.id === user.id) {
        return { ...u, name, email, updatedAt: new Date().toISOString() };
      }
      return u;
    });
    
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
    
    // Update current user
    const updatedUser = { ...user, name, email };
    localStorage.setItem('attendence_current_user', JSON.stringify(updatedUser));
    
    setMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Profile Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
            
            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                {message}
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setName(user.name);
                      setEmail(user.email);
                      setError('');
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-semibold w-32">Name:</span>
                  <span>{user?.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32">Email:</span>
                  <span>{user?.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32">Role:</span>
                  <span className="capitalize">{user?.role}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-32">Member Since:</span>
                  <span>{new Date(user?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Stats Card (for students) */}
        {user?.role === 'student' && attendanceSummary && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Attendance Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Days:</span>
                  <span className="font-bold">{attendanceSummary.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-600">Present:</span>
                  <span className="font-bold text-green-600">{attendanceSummary.present}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-red-600">Absent:</span>
                  <span className="font-bold text-red-600">{attendanceSummary.absent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-yellow-600">Late:</span>
                  <span className="font-bold text-yellow-600">{attendanceSummary.late}</span>
                </div>
                <div className="border-t pt-3 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Percentage:</span>
                    <span className="font-bold text-blue-600 text-lg">
                      {attendanceSummary.attendancePercentage}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;