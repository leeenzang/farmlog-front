// features/dashboard/components/OldDiaryCard.jsx
import '../pages/DashboardPage.css'; 

function OldDiaryCard({ title, diary }) {
    if (!diary) {
      return (
        <div className="old-diary-card">
          <h4>{title}</h4>
          <p style={{ color: '#999', fontSize: '0.85rem' }}>작성된 일기가 없습니다.</p>
        </div>
      );
    }
  
    return (
      <div className="old-diary-card">
        <h4>{title}</h4>
        <p className="old-diary-date">{diary.date}</p>
        <p className="old-diary-content">{diary.content.slice(0, 40)}...</p>
      </div>
    );
  }
  
  export default OldDiaryCard;