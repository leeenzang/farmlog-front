import './MainLanding.css';
import logo from '../assets/react.svg';  // 너 로고 이미지 위치에 맞게 수정해!

function MainLayout() {
  return (
    <div className="main-layout">
      <div className="main-left">
        <img src={logo} alt="농사일기 로고" className="main-logo" />
        <h1>농사일기</h1>
        <p>편하게 일기를 쓸 수 있어요!</p>
        <div className="button-group">
          <a href="/login" className="btn green">로그인</a>
          <a href="/signup" className="btn outline">회원가입</a>
        </div>
      </div>
      <div className="main-right">
        <div className="image-placeholder"> {/* 나중에 이미지로 교체 가능 */}
          <img src="/assets/react.svg" alt="일러스트" />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;