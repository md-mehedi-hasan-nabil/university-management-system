import React, { useEffect } from 'react';
import Header from '../Header';
import SideBar from './SideBar';

export default function Layout({ children }) {
  useEffect(() => {
    document.title = 'Admin Dashboard Page';
  }, []);

  return (
    <main className="flex bg-gray-100 min-h-screen">
      <SideBar />
      <div className="flex-grow text-gray-800">
        <Header />
        {children}
      </div>
    </main>
  );
}
