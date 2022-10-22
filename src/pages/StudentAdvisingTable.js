import React, { useEffect } from 'react';
import AdvisingTable from '../components/StudentDashboard/AdvisingTable';
import Layout from '../components/StudentDashboard/Layout';

export default function StudentAdvisingTable() {
  useEffect(() => {
    document.title = 'Advising Table Page';
  }, []);
  return (
    <Layout>
      <AdvisingTable />
    </Layout>
  );
}
