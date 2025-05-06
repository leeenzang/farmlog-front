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
        <div className="filter-group">
          <label>
            시작일:
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </label>
          <label>
            종료일:
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </label>
        </div>
      )}

      {/* 키워드 필터 UI */}
      {activeTab === 'keyword' && (
        <div className="filter-group">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}

export default DiaryFilterTabs;