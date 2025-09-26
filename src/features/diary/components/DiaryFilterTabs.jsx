// src/features/diary/components/DiaryFilterTabs.jsx
import './DiaryFilterTabs.css';

// DiaryFilterTabs.jsx
function DiaryFilterTabs({
  activeTab,
  dateRange,
  setDateRange,
  keyword,
  setKeyword,
  onSearchKeyword, // searchKeyword 갱신해줄 함수
}) {
  return (
    <div className="filter-ui">
      {/* 날짜 필터 UI */}
      {activeTab === 'date' && (
        <div className="date-range-wrapper">
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) =>
              setDateRange({ ...dateRange, start: e.target.value })
            }
          />
          <div className="arrow">→</div>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
          />
        </div>
      )}

      {/* 키워드 필터 UI */}
      {activeTab === 'keyword' && (
        <form
          className="keyword-filter-form"
          onSubmit={(e) => {
            e.preventDefault();
            onSearchKeyword(keyword); // 버튼 눌렀을 때만 실행
          }}
        >
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)} // 입력 중 값만 관리
          />
          <button type="submit" className="search-button">🔍</button>
        </form>
      )}
    </div>
  );
}

export default DiaryFilterTabs;