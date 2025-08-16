import axios from './axios';

// 로그인
export const login = async (username, password) => {
  const res = await axios.post('/api/auth/login', {
    username,
    password,
  });

  const { accessToken, refreshToken, userId, nickname } = res.data;

  // 토큰 저장
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
  localStorage.setItem('user_id', userId);
  localStorage.setItem('nickname', nickname);

  return res.data; // 필요하면 리턴해서 상태 관리에도 활용
};

// 회원가입
export const signup = async (formData) => {
  const res = await axios.post('/api/auth/signup', formData);
  return res.data;
};

// 로그아웃
export const logout = async () => {
  const res = await axios.post(
    '/api/auth/logout',
    {}, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    }
  );

  // 로그아웃 성공하면 토큰도 제거
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('nickname');

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