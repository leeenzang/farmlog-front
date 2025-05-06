// src/components/diary/DiaryForm.jsx
import { createDiary } from '../../../api/diary';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryForm.css';

const weatherOptions = [
    '맑음', '비', '흐림', '눈', '바람',
    '서리', '우박', '가뭄', '폭염', '장마'
];

function DiaryForm() {
  const [formData, setFormData] = useState({
    date: '',
    weather: [],
    content: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleWeatherSelect = (weather) => {
    setFormData(prev => {
      const alreadySelected = prev.weather.includes(weather);
      return {
        ...prev,
        weather: alreadySelected
          ? prev.weather.filter(w => w !== weather) // 선택돼 있으면 제거
          : [...prev.weather, weather]             // 아니면 추가
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('제출된 일기:', formData);
  
    try {
      await createDiary(formData); 
      alert('작성 완료!');
    } catch (err) {
      console.error('작성 실패:', err.response?.data || err.message);
      alert('작성 실패!');
    }
  };

return (
    <form className="diary-form" onSubmit={handleSubmit}>
        <label htmlFor="date">날짜</label>
        <input
            type="date"
            name="date"
            placeholder="날짜"
            value={formData.date}
            onChange={handleChange}
        />
        <div className="weather-section">
            <label>날씨</label>
            <div className="weather-buttons">
            {weatherOptions.map((option) => (
              <button
                type="button"
                key={option}
                className={formData.weather.includes(option) ? 'selected' : ''}
                onClick={() => handleWeatherSelect(option)}
              >
                {option}
              </button>
            ))}
            </div>
        </div>
            <label htmlFor="date">내용</label>
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