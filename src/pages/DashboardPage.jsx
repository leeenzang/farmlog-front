// DashboardPage.jsx
import { useState } from 'react';

import MainLayout from '../layouts/MainLayout';
import PageHeader from '../components/PageHeader';
function DashboardPage() {
    const [activeTab, setActiveTab] = useState('export'); // 탭 기능 미리 세팅

    return (
        <PageHeader
        title="홈"
        tabs={[
            { label: '대시보드', value: 'export' },
          // 필요 시 확장 탭 추가 가능
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
    );
  }
  
  export default DashboardPage;