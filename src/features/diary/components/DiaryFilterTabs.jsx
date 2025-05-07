// src/features/diary/components/DiaryFilterTabs.jsx
import './DiaryFilterTabs.css';

function DiaryFilterTabs({
  activeTab,
  dateRange,
  setDateRange,
  keyword,
  setKeyword,
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
            placeholder="Start date"
          />

          <div className="arrow">→</div>

          <input
            type="date"
            value={dateRange.end}
            onChange={(e) =>
              setDateRange({ ...dateRange, end: e.target.value })
            }
            placeholder="End date"
          />
        </div>
      )}

      {/* 키워드 필터 UI */}
      {activeTab === 'keyword' && (
        <form
          className="keyword-filter-form"
          onSubmit={(e) => {
            e.preventDefault(); 
          }}
        >
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>
      )}
    </div>
  );
}

export default DiaryFilterTabs;