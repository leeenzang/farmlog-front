// 현재 어떤 탭이 활성화됐는지에 따라 데이터 요청하는 컨트롤러

import { useEffect, useState } from 'react';
import DiaryTable from './DiaryTable';
import Button from '../../../components/Button';
import './DiaryViewer.css';

function DiaryViewer({ filterType, dateRange, keyword, entries: externalEntries }) {
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지
  const [hasNext, setHasNext] = useState(false); // 음 페이지 여부
  const [hasPrevious, setHasPrevious] = useState(false); // 이전 페이지 여부
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (filterType === 'keyword') {
      console.log('🔍 키워드 entries:', externalEntries);
      setTotalPages(Math.ceil((externalEntries?.length || 0) / 10));
      setEntries(externalEntries?.results || []);
    }
  }, [filterType, externalEntries]);

  useEffect(() => {
    if (filterType === 'keyword') return; // 키워드면 여기선 무시
  
    const fetchEntries = async () => {
      let url = `http://localhost:8000/diary/search/?page=${page}`;
      if (filterType === 'latest') {
        url += '&ordering=-created_at';
      }
      if (filterType === 'date' && dateRange?.start && dateRange?.end) {
        url += `&start_date=${dateRange.start}&end_date=${dateRange.end}`;
      }
  
      try {
        const token = localStorage.getItem('access_token');
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setEntries(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (err) {
        console.error('일기 불러오기 실패:', err);
      }
    };
  
    fetchEntries();
  }, [filterType, dateRange, page]);






  return (
    <div className="diary-viewer">
      <DiaryTable
        entries={
          filterType === 'keyword'
            ? externalEntries?.results || []
            : entries
        }
      />
    
        {/* ✅ 페이지네이션 버튼 */}
        <div className="pagination">
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                text={i + 1}
                onClick={() => setPage(i + 1)}
                className={page === i + 1 ? 'active-page' : ''}
                variant="text"
              />
            ))}
          </div>
        </div>
    </div>

    
  );
}
export default DiaryViewer;