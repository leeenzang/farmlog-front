// src/components/PageHeader.jsx
import './PageHeader.css';

function PageHeader({ title, tabs, activeTab, onTabChange }) {
  return (
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      {tabs && (
        <div className="page-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`tab-button ${activeTab === tab.value ? 'active' : ''}`}
              onClick={() => onTabChange(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PageHeader;