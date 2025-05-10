import './OldDiaryCard.css';

function OldDiaryCard({ title, diary }) {
    return (
        <div className="old-diary-card">
        <h4 className="old-diary-title">
        <span className="highlight-year">{title.split(' ')[0]}</span>{' '}
        <span className="highlight-today">{title.split(' ')[1]}</span>
        </h4>
        {diary ? (
            <div className="old-diary-content">
            <div className="info-line">
                <span className="old-diary-date">{diary.date}</span>
                <span className="weather-line">날씨: {diary.weather || '정보 없음'}</span>
            </div>
            <div className="divider" />

            <div className="note-style">
                {[
                ...diary.content.split('\n'),
                ...Array(Math.max(0, 4 - diary.content.split('\n').length)).fill('')
                ].map((line, idx) => (
                <p key={idx}>{line}</p>
                ))}
            </div>
            </div>
        ) : (
            <div className="old-diary-content empty">
            <p>기록이 없습니다.</p>
            </div>
        )}
        </div>
    );
}

export default OldDiaryCard;