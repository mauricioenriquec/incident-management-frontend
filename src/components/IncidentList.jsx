import React, { useEffect, useState } from 'react';
import api from '../services/api';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const response = await api.get('/incidents', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Role': role
          }
        });
        setIncidents(response.data);
      } catch (err) {
        setError('Error al cargar las incidencias. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return <p>Cargando incidencias...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {incidents.length > 0 ? (
        incidents.map((incident) => (
          <div key={incident.id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold">{incident.title}</h3>
            <p>{incident.description}</p>
            <p className="text-sm text-gray-500">Estado: {incident.status}</p>
            <p className="text-sm text-gray-500">Ubicación: {incident.location}</p>
            <p className="text-sm text-gray-500">Fecha: {incident.date}</p>
          </div>
        ))
      ) : (
        <p>No hay incidencias reportadas.</p>
      )}
    </div>
  );
};

export default IncidentList;
