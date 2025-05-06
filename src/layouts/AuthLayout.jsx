// AuthLayout.jsx
// LoginPage, SignupPage가 쓰는 공통 레이아웃
import './AuthLayout.css';

function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="auth-wrapper">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;