import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Load todos
  useEffect(() => {
    axios.get('/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const res = await axios.post('/api/todos', { text: input });
    setTodos([res.data, ...todos]);
    setInput('');
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos(todos.filter(t => t._id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>📝 MERN Todo App</h1>
      
      <form onSubmit={addTodo} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter todo..."
          style={{ flex: 1, padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Add</button>
      </form>
      
      {todos.length === 0 ? (
        <p>No todos yet. Add one!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <li key={todo._id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', padding: '10px', background: '#f0f0f0' }}>
              <span style={{ flex: 1 }}>{todo.text}</span>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
