// src/components/Sidebar.jsx
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <h2>🌱 농사일기</h2>
      <nav className="menu">
        <button onClick={() => navigate('/dashboard')}>🏠 홈</button>
        <button onClick={() => navigate('/diary/create')}>✍️ 일기 쓰기</button>
        <button onClick={() => navigate('/diary')}>📖 일기 보기</button>
        <button onClick={() => navigate('/export')}>📤 글 내보내기</button>
        <button onClick={() => navigate('/user')}>🛠 회원 정보</button>
      </nav>
      <div className="logout">
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </aside>
  );
}

export default Sidebar;