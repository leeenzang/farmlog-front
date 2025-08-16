// /diary/ 관련 API
import axios from './axios';

// 일기 목록 조회
export const fetchDiaries = async () => {
  const res = await axios.get('/diary/');
  return res.data;
};

// 일기 등록
export const createDiary = async (data) => {
    const token = localStorage.getItem('access_token');
  
    const res = await axios.post('/diary/', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    return res.data;
  };

// 일기 상세 조회
export const fetchDiaryDetail = async (id) => {
    const res = await axios.get(`/diary/${id}/`);
    return res.data;
  };

// 일기 하루 조회
export const fetchDiaryByDate = async (dateStr) => {
  const res = await axios.get(`/diary/?search_date=${dateStr}`);
  return res.data;
};
  
  // 일기 수정 (PATCH)
  export const updateDiary = async (id, updatedData) => {
    const token = localStorage.getItem('access_token');
    const res = await axios.patch(`/diary/${id}/`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  };
  
  // 일기 삭제
  export const deleteDiary = async (id) => {
    const token = localStorage.getItem('access_token');
    const res = await axios.delete(`/diary/${id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  };