// DailyForecast.jsx - Box con le previsioni a 7 giorni
//
// Mostra: data, temperatura min/max, pioggia per i prossimi 7 giorni

import { getWeatherDescription, getWeatherEmoji } from '../services/weatherCodes.js';

/**
 * Box con le previsioni a 7 giorni.
 *
 * @param {Object} props
 * @param {Object} props.weather - I dati del meteo
 * @param {boolean} [props.compact=false] - Se true, il box è più piccolo
 * @param {string} [props.title] - Titolo (default: "📅 Previsioni 7 giorni")
 * @returns {React.JSX.Element} - Componente DailyForecast.
 */
function DailyForecast({ weather, compact = false, title }) {
  const { daily } = weather;

  return (
    <div className={`daily-forecast${compact ? ' compact' : ''}`}>
      <h3>{title || '📅 Previsioni 7 giorni'}</h3>

      <div
        className="forecast-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}
      >
        {daily.time.map((date, index) => {
          const giorno = new Date(date);
          const nomeGiorno = giorno.toLocaleDateString('it-IT', { weekday: 'short' });
          const numero = giorno.toLocaleDateString('it-IT', { day: 'numeric' });

          const emoji = getWeatherEmoji(daily.weather_code[index]);
          const tempMax = daily.temperature_2m_max[index];
          const tempMin = daily.temperature_2m_min[index];
          const pioggia = daily.precipitation_sum[index];

          return (
            <div
              key={date}
              className="forecast-day"
              style={{
                border: '1px solid #ddd',
                borderRadius: '5px',
                padding: '10px',
                textAlign: 'center',
              }}
              title={getWeatherDescription(daily.weather_code[index])}
            >
              <div className="forecast-date" style={{ fontWeight: 'bold' }}>
                {nomeGiorno} {numero}
              </div>
              <div className="forecast-emoji" style={{ fontSize: '30px', margin: '5px 0' }}>
                {emoji}
              </div>
              <div className="forecast-temps" style={{ fontSize: '12px' }}>
                <span className="temp-high">{tempMax}°</span> /{' '}
                <span className="temp-low">{tempMin}°</span>
              </div>
              <div className="forecast-precip" style={{ fontSize: '12px' }}>
                💧 {pioggia}mm
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DailyForecast;
