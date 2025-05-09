// features/dashboard/components/TomorrowWeatherCard.jsx
import WeatherCardContainer from './WeatherCardContainer';
import WeatherIcon from './WeatherIcon';

function TomorrowWeatherCard({ weather }) {
  if (!weather) return null;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDate = tomorrow.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\./g, '').replace(/ /g, '.').slice(0, -1); // YYYY.MM.DD

  return (
    <WeatherCardContainer title="내일" date={formattedDate}>
      <WeatherIcon pty={weather.pty} sky={weather.sky} size={64} />
      <div style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
        {weather.weatherStatus}
      </div>

      <div className="weather-meta">
        <div>
          <div className="label">강수확률</div>
          <div className="value">{weather.precipitationProbability}%</div>
        </div>
        <div>
          <div className="label">기온</div>
          <div className="value">
            {weather.lowestTemp ?? '-'}° / {weather.highestTemp ?? '-'}°
          </div>
        </div>
      </div>
    </WeatherCardContainer>
  );
}

export default TomorrowWeatherCard;