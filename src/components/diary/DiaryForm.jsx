// src/components/diary/DiaryForm.jsx
import { createDiary } from '../../api/diary';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryForm.css';

function DiaryForm() {
  const [formData, setFormData] = useState({
    date: '',
    weather: '',
    content: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('제출된 일기:', formData);
  
    try {
      await createDiary(formData);     // ✅ 이게 핵심임!! 백엔드로 전송
      alert('작성 완료!');
      // navigate('/diary');  // 원하면 이동도 가능
    } catch (err) {
      console.error('작성 실패:', err.response?.data || err.message);
      alert('작성 실패!');
    }
  };

  return (
    <form className="diary-form" onSubmit={handleSubmit}>
      <input
        type="date"
        name="date"
        placeholder="날짜"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="weather"
        placeholder="날씨"
        value={formData.weather}
        onChange={handleChange}
      />
      <textarea
        name="content"
        placeholder="내용"
        value={formData.content}
        onChange={handleChange}
      />
      <button type="submit">저장하기</button>
    </form>
  );
}

export default DiaryForm;