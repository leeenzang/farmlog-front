import { useEffect, useState } from 'react';
import DiaryFilterTabs from '../components/DiaryFilterTabs';
import DiaryViewer from '../components/DiaryViewer';
import PageHeader from '../../../components/PageHeader';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
function DiaryListPage() {
  const [activeTab, setActiveTab] = useState('latest'); // 'latest' | 'date' | 'keyword'
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [keyword, setKeyword] = useState('');
  const diaryTabs = [
    { label: '최신순', value: 'latest' },
    { label: '날짜별', value: 'date' },
    { label: '키워드', value: 'keyword' }
  ];
  const [entries, setEntries] = useState([]);

  const handleSearchKeyword = async () => {
    try {
      const res = await axios.get('/diary/search/', {
        params: { keyword },
      });
      console.log('🔍 백에서 받은 검색 결과:', res.data); // ✅ 이 줄 추가!!
      setEntries(res.data); // 검색된 결과를 entries에 넣기
    } catch (err) {
      console.error('❌ 키워드 검색 실패:', err);
    }
  };


  const navigate = useNavigate();
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get('/diary/search/?ordering=-created_at');
        setEntries(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          alert('세션이 만료되었습니다. 다시 로그인해주세요.');
          navigate('/login'); 
        }
      }
    };

    fetchEntries();
  }, []);
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
        onSearchKeyword={handleSearchKeyword}
      />


      {/* 데이터 fetch & 테이블 출력 */}
      <DiaryViewer
        filterType={activeTab}
        dateRange={dateRange}
        keyword={keyword}
        entries={entries}
      />
    </div>
  );
}

export default DiaryListPage;