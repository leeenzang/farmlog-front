// src/layouts/MainLayout.jsx
// 로그인 후 사용하는 전체 틀 (ex: Sidebar)
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