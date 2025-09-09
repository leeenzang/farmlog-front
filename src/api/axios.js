import axios from 'axios';

console.log("🌍 현재 API baseURL:", import.meta.env.VITE_REACT_APP_API_URL);

const instance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');

    const url = new URL(config.url, config.baseURL); // URL 객체로 정확하게 파싱
    const path = url.pathname;

    const nonAuthUrls = [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/logout'
    ];

    const isAuthRequired = !nonAuthUrls.includes(path); // 정확히 path만 비교

    if (token && isAuthRequired) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);


// 세션 만료되면
let alertLock = false;

const nonSessionApis = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
];

instance.interceptors.response.use(
  response => response,
  error => {
    const requestUrl = new URL(error.config?.url, error.config?.baseURL).pathname;

    const isSessionExpired = error.response?.status === 401
      && !nonSessionApis.includes(requestUrl);

    if (isSessionExpired) {
      if (!alertLock) {
        alertLock = true;

        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        setTimeout(() => {
          alertLock = false;
        }, 1000);

        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  }
);

export default instance;