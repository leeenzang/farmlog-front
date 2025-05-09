import '../pages/DashboardPage.css'; // CSS 파일 import
function WeatherCardContainer({ title, date, children }) {
    return (
      <div className="weather-card">
        <h4 className="weather-title">{title}의 날씨</h4>
        <div className="weather-date">{date}</div>
        <div className="weather-content">{children}</div>
      </div>
    );
  }
  
  export default WeatherCardContainer;