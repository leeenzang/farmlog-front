import { useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { logout } from '../api/users';
import logoImg from '../assets/logo.png';
import iconHome from '../assets/home.png';
import iconWrite from '../assets/write.png';
import iconView from '../assets/view.png';
import iconExport from '../assets/export.png';
import iconUser from '../assets/user.png';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // ✨ API 함수 호출
    } catch (error) {
      console.error('❌ 로그아웃 실패:', error);
    }
  
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/');
  };

  return (
    <aside className="sidebar">

        <div className="top-section">
            <div className="sidebar-header">
                <img src={logoImg} alt="로고" className="sidebar-logo" />
                <h2>농사일기</h2>
            </div>

            <nav className="text-bold menu">
                <button onClick={() => navigate('/dashboard')}>
                <img src={iconHome} alt="홈" />
                홈
                </button>
                <button onClick={() => navigate('/diary/create')}>
                <img src={iconWrite} alt="일기쓰기" />
                일기 쓰기
                </button>
                <button onClick={() => navigate('/diary')}>
                <img src={iconView} alt="일기보기" />
                일기 보기
                </button>
                <button onClick={() => navigate('/export')}>
                <img src={iconExport} alt="내보내기" />
                글 내보내기
                </button>
                <button onClick={() => navigate('/user')}>
                <img src={iconUser} alt="회원정보" />
                회원 정보
                </button>
            </nav>
        </div>

      <div className="logout">
        <button onClick={handleLogout}>로그아웃</button> {/* ✅ 여기만 아이콘 없음 */}
      </div>
    </aside>
  );
}

export default Sidebar;