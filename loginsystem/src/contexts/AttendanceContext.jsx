/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const AttendanceContext = createContext();

const ATTENDANCE_STORAGE_KEY = 'attendence_records';

export const AttendanceProvider = ({ children }) => {
  const { user, users } = useContext(AuthContext);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedRecords = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
    setAttendanceRecords(storedRecords ? JSON.parse(storedRecords) : []);
  }, []);

  const persistRecords = (records) => {
    localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(records));
  };

  const markAttendance = async (attendanceData) => {
    setLoading(true);
    try {
      const newRecord = {
        id: Date.now(),
        ...attendanceData,
        date: attendanceData.date || new Date().toISOString(),
        markedBy: user?.name || 'System',
        createdAt: new Date().toISOString()
      };
      setAttendanceRecords((prevRecords) => {
        const updatedRecords = [...prevRecords, newRecord];
        persistRecords(updatedRecords);
        return updatedRecords;
      });
      return newRecord;
    } catch (err) {
      setError('Error marking attendance');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMyAttendance = () => {
    return attendanceRecords.filter((record) => record.studentId === user?.id);
  };

  const getAllAttendance = () => {
    return attendanceRecords;
  };

  const getAttendanceByClass = (classId, date) => {
    return attendanceRecords.filter((record) => {
      const matchesClass = record.classId === classId;
      if (!date) return matchesClass;
      return matchesClass && record.date?.slice(0, 10) === date;
    });
  };

  const getAttendanceByDate = (date) => {
    return attendanceRecords.filter((record) => record.date?.slice(0, 10) === date);
  };

  const getAttendanceByDateRange = (startDate, endDate) => {
    return attendanceRecords.filter((record) => {
      const recordDate = record.date?.slice(0, 10);
      return recordDate >= startDate && recordDate <= endDate;
    });
  };

  const getAllStudents = () => {
    return users?.filter((account) => account.role === 'student') || [];
  };

  const getStudentAttendanceSummary = (studentId) => {
    const studentRecords = attendanceRecords.filter((record) => record.studentId === studentId);
    const present = studentRecords.filter((record) => record.status === 'present').length;
    const absent = studentRecords.filter((record) => record.status === 'absent').length;
    const late = studentRecords.filter((record) => record.status === 'late').length;
    const total = studentRecords.length;
    const attendancePercentage = total ? Math.round((present / total) * 100) : 0;

    return { present, absent, late, total, attendancePercentage };
  };

  const value = {
    attendanceRecords,
    loading,
    error,
    markAttendance,
    getMyAttendance,
    getAllAttendance,
    getAttendanceByClass,
    getAttendanceByDate,
    getAttendanceByDateRange,
    getAllStudents,
    getStudentAttendanceSummary,
    setError
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};
