import React, { useState } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editingText, setEditingText] = useState("");


  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };


  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };


  const handleEditTodo = (id, text) => {
    setEditingTodoId(id);
    setEditingText(text);
  };


  const handleUpdateTodo = () => {
    setTodos(todos.map(todo =>
      todo.id === editingTodoId ? { ...todo, text: editingText } : todo
    ));
    setEditingTodoId(null);
    setEditingText("");
  };

 
  const toggleCompletion = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">React Todo List</h1>
        
        
        <div className="flex mb-4">
          <input
            type="text"
            className="border border-gray-300 rounded-l-md p-2 w-full"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            onClick={handleAddTodo}
            className="bg-blue-500 text-white rounded-r-md px-4 hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        
        <ul className="max-h-96 overflow-y-auto">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleCompletion(todo.id)}
                  className="mr-2"
                />
                {editingTodoId === todo.id ? (
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="border border-gray-300 rounded p-1"
                  />
                ) : (
                  <span className={todo.completed ? "line-through text-gray-500" : ""}>
                    {todo.text}
                  </span>
                )}
              </div>
              <div className="space-x-2">
                {editingTodoId === todo.id ? (
                  <button
                    onClick={handleUpdateTodo}
                    className="bg-green-500 text-white px-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTodo(todo.id, todo.text)}
                    className="bg-yellow-500 text-white px-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )} 
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      
      <footer className="bg-white text-center py-4 w-full">
        <p className="text-gray-700">
          Copyright © {new Date().getFullYear()} Venkatesh S
        </p>
      </footer>
    </div>
  );
};

export default TodoApp;
