import React from 'react';
import Dashboard from '../components/StudentDashboard/Dashboard';
import Layout from '../components/StudentDashboard/Layout';

export default function StudentDashboard() {
  document.title = 'Dashboard Page';
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}
