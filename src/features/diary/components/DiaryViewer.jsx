// 현재 어떤 탭이 활성화됐는지에 따라 데이터 요청하는 컨트롤러

import { useEffect, useState } from 'react';
import DiaryTable from './DiaryTable';

function DiaryViewer({ filterType, dateRange, keyword, entries: externalEntries }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      if (filterType === 'keyword') return;

      let url = 'http://localhost:8000/diary/search/?';
      if (filterType === 'latest') {
        url += 'ordering=-created_at';
      }
      if (filterType === 'date' && dateRange?.start && dateRange?.end) {
        url += `start_date=${dateRange.start}&end_date=${dateRange.end}`;
      }

      try {
        const token = localStorage.getItem('access_token');
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setEntries(data);
      } catch (err) {
        console.error('일기 불러오기 실패:', err);
      }
    };

    fetchEntries();
  }, [filterType, dateRange]);

  return (
    <div className="diary-viewer">
      <DiaryTable entries={filterType === 'keyword' ? externalEntries : entries} />
    </div>
  );
}
export default DiaryViewer;