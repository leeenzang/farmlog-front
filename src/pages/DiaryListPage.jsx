import { useState } from 'react';
import DiaryFilterTabs from '../components/diary/DiaryFilterTabs';
import DiaryViewer from '../components/diary/DiaryViewer';

function DiaryListPage() {
  const [activeTab, setActiveTab] = useState('latest'); // 'latest' | 'date' | 'keyword'
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [keyword, setKeyword] = useState('');

  return (
    <div className="diary-list-page">
      <h1>📖 일기 보기</h1>

      {/* 탭 & 필터 입력 */}
      <DiaryFilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        dateRange={dateRange}
        setDateRange={setDateRange}
        keyword={keyword}
        setKeyword={setKeyword}
      />

      {/* 데이터 fetch & 테이블 출력 */}
      <DiaryViewer
        filterType={activeTab}
        dateRange={dateRange}
        keyword={keyword}
      />
    </div>
  );
}

export default DiaryListPage;