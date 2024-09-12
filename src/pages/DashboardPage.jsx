import React from 'react';
import IncidentList from '../components/IncidentList';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  console.log('test')
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard de Incidencias</h2>
      <Link to="/report" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Reportar nueva incidencia
      </Link>
      <IncidentList />
    </div>
  );
};

export default DashboardPage;
