import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  // Load todos when app starts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos from backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Add new todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/todos`, {
        text: newTodo
      });
      setTodos([response.data, ...todos]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
    setLoading(false);
  };

  // Toggle todo completion
  const toggleTodo = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`);
      setTodos(todos.map(todo =>
        todo._id === id ? response.data : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="App">
      <h1>📝 MERN Todo App</h1>
      <p className="subtitle">React + Express + MongoDB + Node.js</p>

      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>

      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <p>✨ No todos yet! Add one above.</p>
          </div>
        ) : (
          todos.map(todo => (
            <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo._id)}
              />
              <span className="todo-text">{todo.text}</span>
              <button onClick={() => deleteTodo(todo._id)} className="delete-btn">
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="stats">
        <p>Total tasks: {todos.length}</p>
        <p>Completed: {todos.filter(t => t.completed).length}</p>
        <p>Pending: {todos.filter(t => !t.completed).length}</p>
      </div>
    </div>
  );
}

export default App;