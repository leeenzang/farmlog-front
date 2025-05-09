// features/dashboard/components/TodayWeatherCard.jsx
import WeatherCardContainer from './WeatherCardContainer';
import WeatherIcon from './WeatherIcon';

function TodayWeatherCard({ weather }) {
  if (!weather) return null;

  const today = new Date();
  const formattedDate = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\./g, '').replace(/ /g, '.').slice(0, -1); // YYYY.MM.DD

  return (
    <WeatherCardContainer title="오늘" date={formattedDate}>
      <WeatherIcon pty={weather.pty} sky={weather.sky} size={64} />
      <div style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>
        {weather.temperature}°C
      </div>
      <div className="weather-meta">
        <div>
          <div className="label">상태</div>
          <div className="value">{weather.weatherStatus}</div>
        </div>
        <div>
          <div className="label">습도</div>
          <div className="value">{weather.humidity}%</div>
        </div>
      </div>
    </WeatherCardContainer>
  );
}

export default TodayWeatherCard;