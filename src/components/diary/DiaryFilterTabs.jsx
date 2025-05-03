// 탭 버튼, 입력필드 컴포넌트

import './DiaryFilterTabs.css';

function DiaryFilterTabs({
  activeTab,
  onTabChange,
  dateRange,
  setDateRange,
  keyword,
  setKeyword,
}) {
  return (
    <div className="diary-tabs">
      {/* 탭 버튼 */}
      <div className="tab-buttons">
        <button
          className={activeTab === 'latest' ? 'active' : ''}
          onClick={() => onTabChange('latest')}
        >
          최신순
        </button>
        <button
          className={activeTab === 'date' ? 'active' : ''}
          onClick={() => onTabChange('date')}
        >
          날짜별
        </button>
        <button
          className={activeTab === 'keyword' ? 'active' : ''}
          onClick={() => onTabChange('keyword')}
        >
          키워드
        </button>
      </div>

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