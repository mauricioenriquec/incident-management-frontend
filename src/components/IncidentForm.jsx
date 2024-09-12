import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const IncidentForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      await api.post('/incidents', formData);
      setSuccess(true);
      setError('');
      setTitle('');
      setDescription('');
      setLocation('');
      setImages([]);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError('Error al reportar la incidencia. Inténtalo de nuevo.');
      setSuccess(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Descripción:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Ubicación:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Imágenes (opcional):</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reportar Incidencia
        </button>
      </form>

      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-green-500">Incidencia reportada exitosamente.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentForm;
