// src/layouts/MainLayout.jsx
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';

function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;