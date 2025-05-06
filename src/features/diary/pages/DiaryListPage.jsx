import { useState } from 'react';
import DiaryFilterTabs from '../components/DiaryFilterTabs';
import DiaryViewer from '../components/DiaryViewer';
import PageHeader from '../../../components/PageHeader';

function DiaryListPage() {
  const [activeTab, setActiveTab] = useState('latest'); // 'latest' | 'date' | 'keyword'
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [keyword, setKeyword] = useState('');
  const diaryTabs = [
    { label: '최신순', value: 'latest' },
    { label: '날짜별', value: 'date' },
    { label: '키워드', value: 'keyword' }
  ];

  return (
    <div className="diary-list-page">
      <PageHeader
        title="일기 보기"
        tabs={diaryTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <DiaryFilterTabs
        activeTab={activeTab}
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