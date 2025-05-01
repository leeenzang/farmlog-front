import axios from './axios';

// 일기 목록 조회
export const fetchDiaries = async () => {
  const res = await axios.get('/api/diary/');
  return res.data;
};

// 일기 등록
export const createDiary = async (data) => {
  const res = await axios.post('/api/diary/', data);
  return res.data;
};