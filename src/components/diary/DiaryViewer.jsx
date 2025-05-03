// 현재 어떤 탭이 활성화됐는지에 따라 데이터 요청하는 컨트롤러

import { useEffect, useState } from 'react';
import DiaryTable from './DiaryTable';

function DiaryViewer({ filterType, dateRange, keyword }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      let url = 'http://localhost:8000/diary/search/?';
      if (filterType === 'latest') {
        url += 'ordering=-created_at';
      }
      if (filterType === 'date' && dateRange?.start && dateRange?.end) {
        url += `start_date=${dateRange.start}&end_date=${dateRange.end}`;
      }
      if (filterType === 'keyword' && keyword) {
        url += `search=${encodeURIComponent(keyword)}`;
      }
  
      try {
        const token = localStorage.getItem('access_token'); // ✅ 로컬에 저장된 access 토큰 꺼냄
  
        const res = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`, // ✅ 헤더에 추가
          },
        });
  
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error('일기 불러오기 실패:', err);
      }
    };
  
    fetchEntries();
  }, [filterType, dateRange, keyword]);
  return (
    <div className="diary-viewer">
      <DiaryTable entries={entries} />
    </div>
  );
}

export default DiaryViewer;