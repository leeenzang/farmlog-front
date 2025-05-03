// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('access_token');

  if (!token) {
    alert('로그인이 필요합니다!');
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;