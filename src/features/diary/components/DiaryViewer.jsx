// 📄 src/features/diary/components/DiaryViewer.jsx
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import DiaryTable from './DiaryTable';
import Button from '../../../components/Button';
import './DiaryViewer.css';

function DiaryViewer({ filterType, dateRange, keyword }) {
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1); // 프론트는 1-based
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const params = {
          page: page - 1, // 스프링은 0-based
          size: 10,
        };

        if (filterType === 'date' && dateRange?.start && dateRange?.end) {
          params.startDate = dateRange.start;
          params.endDate = dateRange.end;
        }

        if (filterType === 'keyword' && keyword) {
          params.keyword = keyword;
        }

        // 최신순 정렬은 서버 기본 정렬을 따르거나, 추가적으로 sort param을 넘길 수도 있음
        const res = await axios.get('/api/diaries', { params });

        setEntries(res.data.content);
        setTotalPages(res.data.pageInfo.totalPages);
      } catch (err) {
        console.error('❌ 일기 불러오기 실패:', err);
      }
    };

    fetchEntries();
  }, [filterType, dateRange, keyword, page]);

  return (
    <div className="diary-viewer">
      <DiaryTable entries={entries} />

      <div className="pagination">
        <Button
          text="◀"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          variant="text"
        />

        {Array.from({ length: 10 }, (_, i) => {
          const startPage = Math.floor((page - 1) / 10) * 10 + 1;
          const pageNumber = startPage + i;

          if (pageNumber > totalPages) return null; 

          return (
            <Button
              key={pageNumber}
              text={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={page === pageNumber ? 'active-page' : ''}
              variant="text"
            />
          );
        })}

        <Button
          text="▶"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          variant="text"
        />
      </div>
    </div>
  );
}

export default DiaryViewer;