// 📁 src/pages/ExportPage.jsx

import { useEffect, useState } from 'react';
import axios from '../api/axios';
import './ExportPage.css';
import PageHeader from '../components/PageHeader';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function ExportPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [activeTab, setActiveTab] = useState('export'); // 탭 기능 미리 세팅

  const navigate = useNavigate();
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get('/diary/search/?ordering=-created_at');
        setEntries(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEntries();
  }, []);



  const handleExport = async () => {
    if (!startDate || !endDate) {
      alert('날짜를 모두 선택해주세요!');
      return;
    }
  
    try {
      const res = await axios.get('/api/diaries/export', {
        params: { startDate, endDate },
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
  
    
      const disposition = res.headers['content-disposition'];
      let filename = 'logs.xlsx';
      if (disposition) {
        const match = disposition.match(/filename="?(.+)"?/);
        if (match) filename = match[1];
      }
  
      // 다운로드 트리거
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
        tabs={[
          { label: '엑셀', value: 'export' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className='export-content'>
        <p>📆  원하는 기간을 입력해주세요!</p>
        <div className="date-wrapper">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start date"
          />
          <span className="arrow">→</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End date"
          />
        </div>

        {startDate && endDate && (
          <>
            <p>
                📤  {new Date(startDate).toLocaleDateString()}부터{' '}
                {new Date(endDate).toLocaleDateString()}까지의 일기를 내보낼까요?
            </p>
              <Button
              text="확인"
              onClick={handleExport}
              variant="export"
            />
          </>
          
        )}


      </div>
    </div>
  );
}

export default ExportPage;