import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children, onSearch }) => {
    return (
        <div className="app-layout">
            <Navbar onSearch={onSearch} />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
