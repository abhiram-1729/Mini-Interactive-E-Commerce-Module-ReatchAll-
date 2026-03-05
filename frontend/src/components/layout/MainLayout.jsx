import React from 'react';
import Navbar from './Navbar';

const MainLayout = ({ children, onSearch }) => {
    return (
        <div className="app-layout">
            <Navbar onSearch={onSearch} />
            <main className="main-content">
                {children}
            </main>
            {/* Standard footer can be added here later */}
        </div>
    );
};

export default MainLayout;
