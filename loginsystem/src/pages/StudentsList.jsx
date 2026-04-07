import { useState, useContext } from 'react';
import { AttendanceContext } from '../contexts/AttendanceContext';

const StudentsList = () => {
  const { getAllStudents, getStudentAttendanceSummary } = useContext(AttendanceContext);
  const [searchTerm, setSearchTerm] = useState('');

  const students = getAllStudents().map((student) => ({
    ...student,
    summary: getStudentAttendanceSummary(student.id)
  }));

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Students</h1>
      
      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <input
          type="text"
          placeholder="Search students by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      
      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{student.name}</h3>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                Student
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-3">{student.email}</p>
            
            <div className="border-t pt-3">
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <div className="text-gray-500">Present</div>
                  <div className="font-bold text-green-600">{student.summary?.present || 0}</div>
                </div>
                <div>
                  <div className="text-gray-500">Absent</div>
                  <div className="font-bold text-red-600">{student.summary?.absent || 0}</div>
                </div>
                <div>
                  <div className="text-gray-500">Late</div>
                  <div className="font-bold text-yellow-600">{student.summary?.late || 0}</div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-sm font-semibold">
                  Attendance: {student.summary?.attendancePercentage || 0}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredStudents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No students found
        </div>
      )}
    </div>
  );
};

export default StudentsList;