import './MainLanding.css';
import Button from './Button';
import logo from '../assets/logo.png';
import mainImage from '../assets/main.png'; // 👈 요거 추가!

function MainLayout() {
  return (
    <div className="main-layout">
      <div className="main-left">
        <div className='logo-title'>
          <img src={logo} alt="농사일기 로고" className="main-logo" />
          <h1>농사일기</h1>
        </div>
        <p>편하게 일기를 쓸 수 있어요!</p>
        <div className="button-group">
          <Button text="로그인" to="/login" isLink={true} variant="main-green" />
          <Button text="회원가입" to="/signup" isLink={true} variant="main-outline" />
        </div>
      </div>

      <div className="main-right">
        <div className="main-box">
          <img src={mainImage} alt="일러스트" />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;