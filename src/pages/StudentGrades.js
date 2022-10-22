import React, { useEffect } from 'react';
import Grades from '../components/StudentDashboard/Grades';
import Layout from '../components/StudentDashboard/Layout';

export default function StudentGrades() {
  useEffect(() => {
    document.title = 'Grade Page';
  }, []);
  return (
    <Layout>
      <Grades />
    </Layout>
  );
}
