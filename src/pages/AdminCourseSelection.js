import React, { useEffect } from 'react';
import Courses from '../components/AdminDashboard/Courses';
import Layout from '../components/AdminDashboard/Layout';

export default function AdminCourseSelection() {
  useEffect(() => {
    document.title = 'Course Selection Page';
  }, []);
  return (
    <Layout>
      <Courses />
    </Layout>
  );
}
