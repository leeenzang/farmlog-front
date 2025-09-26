// 📄 src/features/diary/pages/DiaryListPage.jsx
import { useState } from 'react';
import DiaryFilterTabs from '../components/DiaryFilterTabs';
import DiaryViewer from '../components/DiaryViewer';
import PageHeader from '../../../components/PageHeader';

function DiaryListPage() {
  const [activeTab, setActiveTab] = useState('latest'); // 'latest' | 'date' | 'keyword'
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [keyword, setKeyword] = useState('');          // 입력 중인 값
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 버튼 눌러서 확정된 값

  const diaryTabs = [
    { label: '최신순', value: 'latest' },
    { label: '날짜별', value: 'date' },
    { label: '키워드', value: 'keyword' },
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
        onSearchKeyword={setSearchKeyword} // 돋보기 누르면 searchKeyword 갱신
      />

      <DiaryViewer
        filterType={activeTab}
        dateRange={dateRange}
        keyword={searchKeyword} // 검색 확정된 값만 Viewer로 내려감
      />
    </div>
  );
}

export default DiaryListPage;