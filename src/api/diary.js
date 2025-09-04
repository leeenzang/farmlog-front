// /diary/ 관련 API
import axios from './axios';

export const fetchDiaries = async ({ startDate, endDate, keyword, page = 0, size = 10 }) => {
  const token = localStorage.getItem('access_token');
  const params = {};

  if (startDate && endDate) {
    params.startDate = startDate;
    params.endDate = endDate;
  }
  if (keyword) {
    params.keyword = keyword;
  }
  params.page = page;
  params.size = size;

  const res = await axios.get('/api/diaries', {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params, // 여기서 쿼리 파라미터 전송
  });
  return res.data;
};

// 일기 등록
export const createDiary = async (data) => {
  const token = localStorage.getItem('access_token');
  try {
    const res = await axios.post('/api/diaries', data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (err) {
    console.error("❌ 일기 등록 실패:", err.response?.data || err.message);
    throw err; // 호출한 컴포넌트에서 잡을 수 있게
  }
};

// 일기 상세 조회
export const fetchDiaryDetail = async (id) => {
  const token = localStorage.getItem('access_token');
  const res = await axios.get(`/api/diaries/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};


// 일기 수정
export const updateDiary = async (id, updatedData) => {
  const token = localStorage.getItem('access_token');
  const res = await axios.put(`/api/diaries/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
  
// 일기 삭제
export const deleteDiary = async (id) => {
  const token = localStorage.getItem('access_token');
  const res = await axios.delete(`/api/diaries/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

export const fetchDiaryByExactDate = async (date) => {
  const token = localStorage.getItem('access_token');
  const res = await axios.get(`/api/diaries/date/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};