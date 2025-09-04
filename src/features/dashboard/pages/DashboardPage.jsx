import { useState, useEffect } from 'react';
import './DashboardPage.css'; 
import PageHeader from '../../../components/PageHeader';

import DashboardCalendar from '../components/DashboardCalendar';
import { fetchTodayWeather } from '../../../api/weather';
import TodayWeatherCard from '../components/TodayWeatherCard';
import { fetchTomorrowWeather } from '../../../api/weather';
import TomorrowWeatherCard from '../components/TomorrowWeatherCard';
import { fetchDiaryByExactDate } from '../../../api/diary';

import OldDiaryCard from '../components/OldDiaryCard';
import LinkCard from '../components/LinkCard';

function DashboardPage() {
  const [activeTab, setActiveTab] = useState('export');
  const [todayWeather, setTodayWeather] = useState(null); // 날씨 state
  const [tomorrowWeather, setTomorrowWeather] = useState(null);
  const [lastYearDiary, setLastYearDiary] = useState(null);
  const [twoYearsAgoDiary, setTwoYearsAgoDiary] = useState(null);

// 날씨 불러오기 (오늘 + 내일)
useEffect(() => {
  const loadWeather = async () => {
    try {
      const today = await fetchTodayWeather();
      const tomorrow = await fetchTomorrowWeather();
      setTodayWeather(today);
      setTomorrowWeather(tomorrow);
    } catch (err) {
      console.error('날씨 불러오기 실패:', err);
    }
  };
  loadWeather();
}, []);


useEffect(() => {
  console.log('🧨 useEffect 돌았다!!!!!');
  
  const today = new Date();

  const toDateStr = (date) => {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 10);
  };

  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);

  const twoYearsAgo = new Date(today);
  twoYearsAgo.setFullYear(today.getFullYear() - 2);

  const fetchOldDiaries = async () => {
    console.log('📦 fetchOldDiaries 실행됨!');
    try {
      const last = await fetchDiaryByExactDate(toDateStr(lastYear));
      console.log('🔥 작년 응답:', last);
      setLastYearDiary(last);
    } catch (err) {
      console.error('🚨 작년 일기 조회 실패:', err);
    }

    try {
      const twoYears = await fetchDiaryByExactDate(toDateStr(twoYearsAgo));
      console.log('🔥 재작년 응답:', twoYears);
      setTwoYearsAgoDiary(twoYears);
    } catch (err) {
      console.error('🚨 재작년 일기 조회 실패:', err);
    }
  };

  fetchOldDiaries();
}, []);


  return (
    <>
      <PageHeader
        title="홈"
        tabs={[{ label: '대시보드', value: 'export' }]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="dashboard-container">
        {/* 🟩 상단 섹션: 달력 + 날씨 */}
        <div className="dashboard-top">
          <DashboardCalendar />
          <TodayWeatherCard weather={todayWeather} />
          <TomorrowWeatherCard weather={tomorrowWeather} />

          <div className="dashboard-links-inline">
            <LinkCard title="농사로" url="https://www.nongsaro.go.kr/portal/portalMain.ps?menuId=PS00001" />
            <LinkCard title="농업기술진흥원" url="https://www.koat.or.kr/main2.do" />
            <LinkCard title="농업ON" url="https://www.agrion.kr/" />
            <LinkCard title="농업교육포털" url="https://agriedu.net/" />
          </div>
        </div>

        {/* 🟨 중단 섹션: 작년/재작년 일기 */}
        <div className="dashboard-middle">
          <OldDiaryCard title="작년 오늘" diary={lastYearDiary} />
          <OldDiaryCard title="재작년 오늘" diary={twoYearsAgoDiary} />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;