import axios from './axios';

// 로그인
export const login = async (username, password) => {
  const res = await axios.post('/users/login/', {
    username,
    password,
  });
  return res.data;
};

// 회원가입
export const signup = async (formData) => {
  const res = await axios.post('/users/register/', formData);
  return res.data;
};

// 로그아웃
export const logout = async () => {
    const res = await axios.post(
      '/users/logout/',
      {}, // POST지만 바디는 비움
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      }
    );
    return res.data;
  };

// 사용자 정보 조회
export const fetchUserInfo = async () => {
  const res = await axios.get('/users/me/', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
  return res.data; // 👉 { username: 'user1', nickname: '은진햄' }
};

// 사용자 정보 수정
export const updateUserInfo = async (formData) => {
  const res = await axios.patch('/users/me/', formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });
  return res.data;
};