// 📁 src/pages/ExportPage.jsx

import { useState } from 'react';
import axios from '../api/axios';
import './ExportPage.css'; // ❗ 나중에 스타일 추가할 거면 이 css 만들기
import PageHeader from '../components/PageHeader';
function ExportPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleExport = async () => {
    if (!startDate || !endDate) {
      alert('날짜를 모두 선택해주세요!');
      return;
    }

    try {
      const res = await axios.get('/diary/export/', {
        params: {
          start_date: startDate,
          end_date: endDate
        },
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      const today = new Date();
      const filename = `logs_${today.toISOString().slice(0, 10).replace(/-/g, '')}.xlsx`;

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      console.error('❌ 다운로드 실패:', err);
      alert('다운로드 실패!');
    }
  };

  return (
    <div className="export-page">
        <PageHeader
        title="글 내보내기"
        />
      <p>원하는 기간을 입력해주세요!</p>
      <div className="date-picker">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <span>→</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {startDate && endDate && (
        <p>
          <strong>
            {new Date(startDate).toLocaleDateString()}부터{' '}
            {new Date(endDate).toLocaleDateString()}까지의 일기를 내보낼까요?
          </strong>
        </p>
      )}

      <button onClick={handleExport}>확인</button>
    </div>
  );
}

export default ExportPage;