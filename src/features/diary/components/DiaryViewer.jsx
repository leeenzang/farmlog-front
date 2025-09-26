// 📄 src/features/diary/components/DiaryViewer.jsx
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';
import DiaryTable from './DiaryTable';
import Button from '../../../components/Button';
import './DiaryViewer.css';

import leftArrow from '../../../assets/larrow.png';
import rightArrow from '../../../assets/arrow.png';

function DiaryViewer({ filterType, dateRange, keyword }) {
  const [entries, setEntries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const params = {
          page: page - 1,
          size: 10,
        };

        if (filterType === 'date' && dateRange?.start && dateRange?.end) {
          params.startDate = dateRange.start;
          params.endDate = dateRange.end;
        }

        // props로 받은 keyword (searchKeyword가 내려옴)
        if (filterType === 'keyword' && keyword) {
          params.keyword = keyword;
        }

        const res = await axios.get('/api/diaries', { params });
        setEntries(res.data.content);
        setTotalPages(res.data.pageInfo.totalPages);
      } catch (err) {
        console.error('❌ 일기 불러오기 실패:', err);
      }
    };

    fetchEntries();
  }, [filterType, dateRange, keyword, page]); // keyword는 props로 받은 searchKeyword

  return (
    <div className="diary-viewer">
      <DiaryTable entries={entries} />

      <div className="pagination">
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          variant="text"
        >
          <img src={leftArrow} alt="이전" className="arrow-icon" />
        </Button>

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
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          variant="text"
        >
          <img src={rightArrow} alt="다음" className="arrow-icon" />
        </Button>
      </div>
    </div>
  );
}

export default DiaryViewer;