import axios from './axios';

// 일기 목록 조회
export const fetchDiaries = async () => {
  const res = await axios.get('/diary/search/');
  return res.data;
};

// 일기 등록
export const createDiary = async (data) => {
    const token = localStorage.getItem('access_token');
  
    const res = await axios.post('/diary/create/', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return res.data;
  };