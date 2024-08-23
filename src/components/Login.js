import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.trim()) {
      // Store username in local storage
      localStorage.setItem('username', username);

      // Redirect to chat page
      navigate('/chat');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-neutral">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-primary mb-4">Login</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-lg p-2 border-accent w-full mb-4"
          placeholder="Enter your username"
        />
        <button
          onClick={handleLogin}
          className="bg-primary text-white p-2 rounded-lg w-full shadow-md hover:bg-secondary transition duration-200"
        >
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default Login;
