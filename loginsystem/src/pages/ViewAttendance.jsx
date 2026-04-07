import { useState, useContext, useEffect } from 'react';
import { AttendanceContext } from '../contexts/AttendanceContext';
import { AuthContext } from '../contexts/AuthContext';

const ViewAttendance = () => {
  const { attendanceRecords, getAttendanceByDate, getAttendanceByDateRange, getAllStudents } = useContext(AttendanceContext);
  const { user } = useContext(AuthContext);
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [viewMode, setViewMode] = useState('all');

  const loadRecords = () => {
    let filteredRecords = [...attendanceRecords];
    
    // Filter by date
    if (viewMode === 'date' && filterDate) {
      filteredRecords = getAttendanceByDate(filterDate);
    } else if (viewMode === 'range' && startDate && endDate) {
      filteredRecords = getAttendanceByDateRange(startDate, endDate);
    }
    
    // Filter by student
    if (selectedStudent !== 'all') {
      filteredRecords = filteredRecords.filter(r => r.studentId === parseInt(selectedStudent));
    }
    
    filteredRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
    setRecords(filteredRecords);
  };

  const getStatusBadge = (status) => {
    const colors = {
      present: 'bg-green-100 text-green-800',
      absent: 'bg-red-100 text-red-800',
      late: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const totalRecords = records.length;
  const presentCount = records.filter(r => r.status === 'present').length;
  const absentCount = records.filter(r => r.status === 'absent').length;
  const lateCount = records.filter(r => r.status === 'late').length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">View Attendance Records</h1>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Select Student</label>
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded w-full md:w-64"
          >
            <option value="all">All Students</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>{student.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded ${viewMode === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All Records
          </button>
          <button
            onClick={() => setViewMode('date')}
            className={`px-4 py-2 rounded ${viewMode === 'date' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Filter by Date
          </button>
          <button
            onClick={() => setViewMode('range')}
            className={`px-4 py-2 rounded ${viewMode === 'range' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Date Range
          </button>
        </div>
        
        {viewMode === 'date' && (
          <div>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        )}
        
        {viewMode === 'range' && (
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded"
            />
          </div>
        )}
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-gray-600 text-sm">Total Records</div>
          <div className="text-2xl font-bold">{totalRecords}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-green-600 text-sm">Present</div>
          <div className="text-2xl font-bold text-green-600">{presentCount}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-red-600 text-sm">Absent</div>
          <div className="text-2xl font-bold text-red-600">{absentCount}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-yellow-600 text-sm">Late</div>
          <div className="text-2xl font-bold text-yellow-600">{lateCount}</div>
        </div>
      </div>
      
      {/* Records Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Student</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Remarks</th>
               </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{record.studentName}</td>
                  <td className="px-4 py-2">{record.subject}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(record.status)}`}>
                      {record.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-2">{record.remarks || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {records.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No attendance records found
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAttendance;