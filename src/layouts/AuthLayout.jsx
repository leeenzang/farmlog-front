// AuthLayout.jsx
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