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