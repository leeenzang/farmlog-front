import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
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

export default instance;