// src/components/IncidentList.jsx
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../services/api';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await api.get('/incidents');
        setIncidents(response.data);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Incidents</h1>
        <Link
          to="/report"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center"
        >
          <FaPlus className="mr-2" /> Report New Incident
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {incidents.map((incident) => (
          <div
            key={incident.id}
            className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-lg font-semibold">{incident.title}</h2>
            <p className="text-gray-600 mt-2">{incident.description}</p>
            <p className="text-gray-400 text-sm mt-2">Reported by: {incident.reportedBy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentList;
