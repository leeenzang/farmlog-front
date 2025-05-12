import './WeatherCardContainer.css';

function WeatherCardContainer({ title, date, children }) {
  return (
    <div className="weather-card">
      {/* ✅ 위쪽 전체 묶음 */}
      <div className="weather-top">
        <h4 className="weather-title">
          <span className="weather-highlight">{title}</span>의 날씨
        </h4>
        <div className="weather-date">{date}</div>
        {children.top}
      </div>

      {/* ✅ 하단 고정 */}
      <div className="weather-meta">
        {children.meta}
      </div>
    </div>
  );
}

export default WeatherCardContainer;