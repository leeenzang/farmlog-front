import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';

import DashboardPage from './pages/DashboardPage';
import DiaryCreatePage from './pages/DiaryCreatePage'; // ✅ 추가
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

import DiaryListPage from './pages/DiaryListPage';
import DiaryDetail from './pages/DiaryDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 공개 경로 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* 🔐 로그인 유저만 접근 가능한 영역 */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/diary/create" element={<DiaryCreatePage />} /> 
          <Route path="/diary" element={<DiaryListPage />} />
          <Route path="/diary/search/:id" element={<DiaryDetail />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;