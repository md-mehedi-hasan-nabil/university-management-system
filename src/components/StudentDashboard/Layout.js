import React from 'react';
import Header from '../Header';
import SideBar from './SideBar';

export default function Layout({ children }) {
  return (
    <main className="flex bg-gray-100 min-h-screen">
      <SideBar />
      <div className="flex-grow text-gray-800">
        <Header />
        {children}
        {/* <CourseAdvising /> */}
        {/* <MainContent /> */}
      </div>
    </main>
  );
}
