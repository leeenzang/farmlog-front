// src/components/diary/DiaryForm.jsx
import { createDiary } from '../../../api/diary';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryForm.css';
import Button from '../../../components/Button';
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
  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;
  
    setFormData(prev => ({
      ...prev,
      date: formattedDate
    }));
  }, []);



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
      await createDiary({
        ...formData,
        weather: formData.weather.join(','),
      });
      alert('작성 완료!');
  
      // ✅ 폼 초기화
      setFormData({
        date: '',
        weather: [],
        content: ''
      });
    } catch (err) {
      console.error('작성 실패:', err.response?.data || err.message);
      alert('작성 실패!');
    }
  };

return (
  <div className='diary-form-wrapper'>
    <form className="diary-form" onSubmit={handleSubmit}>
        <div className="date-section">
          <label htmlFor="date">날짜</label>
          <input
              type="date"
              name="date"
              placeholder="날짜"
              value={formData.date}
              onChange={handleChange}
          />
        </div>
        <div className="weather-section">
            <label>날씨</label>
            <div className="weather-buttons">
            {weatherOptions.map((option) => (
              <Button
                key={option}
                text={option}
                type="button"
                onClick={() => handleWeatherSelect(option)}
                variant={`plain ${formData.weather.includes(option) ? 'selected' : ''}`}
              />
            ))}
            </div>
        </div>
        <div className='content-section'>
          <label htmlFor="date">내용</label>
          <textarea
              name="content"
              placeholder="내용"
              value={formData.content}
              onChange={handleChange}
          />
        </div>
          <Button
            text="저장하기"
            type="submit"
            variant="plain" // ✅ 원하는 스타일 클래스 쓰기
          />
        </form>
    </div>
  );
}

export default DiaryForm;