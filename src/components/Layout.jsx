import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#000000]">
      <Navbar />
      <main className="relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;
