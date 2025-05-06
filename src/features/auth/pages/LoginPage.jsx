// ✅ 수정된 LoginPage.jsx
import AuthLayout from '../../../layouts/AuthLayout';
import LoginForm from '../components/LoginForm';

function LoginPage() {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
}

export default LoginPage;