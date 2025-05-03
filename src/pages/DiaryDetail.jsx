// src/pages/DiaryDetail.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';

function DiaryDetail() {
  const { id } = useParams();
  const [diary, setDiary] = useState(null);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const res = await axios.get(`/diary/search/${id}/`);
        setDiary(res.data);
      } catch (err) {
        console.error('글 불러오기 실패:', err.response?.data || err.message);
      }
    };

    fetchDiary();
  }, [id]);

  if (!diary) return <p>불러오는 중...</p>;

  return (
    <div className="diary-detail">
      <h2>{new Date(diary.date).toLocaleDateString()}의 일기</h2>
      <p><strong>음력 날짜:</strong> {diary.lunar_date}</p>
      <p><strong>날씨:</strong> {diary.weather}</p>
      <p><strong>내용:</strong></p>
      <textarea readOnly value={diary.content} rows={10} style={{ width: '100%' }} />
    </div>
  );
}

export default DiaryDetail;