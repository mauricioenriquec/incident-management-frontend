// src/pages/DashboardPage.jsx
import React from 'react';
import IncidentForm from '../components/IncidentForm';
import IncidentList from '../components/IncidentList';

const DashboardPage = () => {
  return (
    <div className="container mx-auto p-4">
      <IncidentForm />
      <IncidentList />
    </div>
  );
};

export default DashboardPage;
