import React, { useState } from 'react';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      setError('Credenciales incorrectas. Inténtelo de nuevo.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleLogin} className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md transform transition-transform duration-500 ease-in-out hover:scale-105">
        <div className="text-center mb-8">
          <FaUser className="mx-auto text-blue-500 text-6xl mb-4" />
          <h2 className="text-4xl font-extrabold text-white">Iniciar Sesión</h2>
        </div>
        
        {error && (
          <div className="bg-red-900/40 text-red-300 p-4 rounded-xl mb-6 text-center shadow-inner animate-pulse">
            {error}
          </div>
        )}
        
        <div className="mb-6 relative">
          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            className="w-full bg-gray-700 text-gray-200 border-2 border-gray-600 rounded-xl py-3 px-12 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
        </div>
        
        <div className="mb-8 relative">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full bg-gray-700 text-gray-200 border-2 border-gray-600 rounded-xl py-3 px-12 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
        </div>
        
        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <FaSignInAlt />
          <span>Acceder</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
