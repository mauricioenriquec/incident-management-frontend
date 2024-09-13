import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUser } from 'react-icons/fa';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-400">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
          Bienvenid@ a <span className="text-blue-600">ManteniLogin</span>
        </h1>
        <p className="text-center text-gray-600 mb-6">¡Administra tus incidencias con facilidad!</p>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              <FaUser className="inline-block mr-2 text-blue-600" /> Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 shadow-md focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              <FaLock className="inline-block mr-2 text-blue-600" /> Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 shadow-md focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all transform hover:translate-y-1 hover:shadow-2xl"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-6 flex justify-center items-center">
          <img
            src="https://media.istockphoto.com/id/1249591065/vector/vector-image-of-excavator-icon.jpg?s=170667a&w=0&k=20&c=lOfItkrt4nAOPdi_WQASpqGth5q7pnyin0lGWSZvlXs="
            alt="Building logo"
            className="w-16 h-16"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
