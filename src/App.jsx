import React, { useState } from 'react';
import Login from './modulo_login/Login';
import ArchivadoresList from './modulo_buscadorHT/ArchivadoresList';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <header className="p-4 text-center relative">
        <h1 className="text-4xl font-bold text-white">
          Sistema SOAT
        </h1>
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-600 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition-colors duration-200"
        >
          Cerrar Sesión
        </button>
      </header>
      <main className="container mx-auto p-4">
        <ArchivadoresList />
      </main>
    </div>
  );
}

export default App;
