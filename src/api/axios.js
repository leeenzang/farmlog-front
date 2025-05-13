import axios from 'axios';

console.log("🌍 현재 API baseURL:", import.meta.env.VITE_REACT_APP_API_URL);

const instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

// 요청 보내기 전에 토큰 붙이기 (인증 필요한 URL에만!)
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');

        // 이 경로들은 인증 없이도 접근 가능해야 하니까 토큰 안 붙임
        const nonAuthUrls = ['/users/login/', '/users/register/', '/api/token/'];
        const isAuthRequired = !nonAuthUrls.some(path => config.url.includes(path));

        if (token && isAuthRequired) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => Promise.reject(error)
);
// 세션 만료되면
instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401) {
        // 세션 만료 또는 인증 실패 → 토큰 제거하고 메인페이지로 이동
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
  
      return Promise.reject(error);
    }
  );

export default instance;