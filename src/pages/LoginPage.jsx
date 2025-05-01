// pages/LoginPage.jsx
import LoginForm from '../components/LoginForm';
import './LoginPage.css'; // 스타일 따로 넣고 싶으면 여기에

function LoginPage() {
    return (
        <div className="login-page">
            <LoginForm />
        </div>
    );
}

export default LoginPage;