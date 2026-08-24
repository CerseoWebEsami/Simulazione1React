// WeatherCard.jsx - Card con il meteo attuale
//
// Mostra: temperatura, umidità, vento, direzione vento, timezone

import { getWeatherDescription, getWeatherEmoji } from '../services/weatherCodes.js';

/**
 * Card grande con il meteo attuale di una posizione.
 *
 * @param {Object} props
 * @param {Object} props.weather - I dati del meteo (da Open-Meteo)
 * @param {string} [props.locationName="Posizione"] - Nome della città/posizione
 * @param {boolean} [props.compact=false] - Se true, la card è più piccola
 * @param {React.JSX.Element} [props.favoriteSlot] - Elemento opzionale (es. pulsante preferiti) da affiancare al titolo
 * @returns {React.JSX.Element} - Componente WeatherCard.
 */
function WeatherCard({ weather, locationName = 'Posizione', compact = false, favoriteSlot }) {
  const { current, latitude, longitude, timezone } = weather;

  const emoji = getWeatherEmoji(current.weather_code);
  const descrizione = getWeatherDescription(current.weather_code);

  const classNames = ['weather-card', compact && 'compact', favoriteSlot && 'has-inline-favorite']
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classNames}>
      <div className="weather-card-header">
        <div className="weather-title-block">
          <h2>{locationName}</h2>
          <p className="weather-coords">
            📍 {latitude.toFixed(2)}°, {longitude.toFixed(2)}°
          </p>
        </div>
        {favoriteSlot}
      </div>

      <div className="weather-current">
        <div className="weather-emoji" style={{ fontSize: '60px' }}>
          {emoji}
        </div>
        <div className="weather-temp">
          <div className="temp-main" style={{ fontSize: '36px' }}>
            {current.temperature_2m}°C
          </div>
          <div className="temp-desc">{descrizione}</div>
        </div>
      </div>

      <div className="weather-details-grid">
        <div className="detail-item">
          <span className="detail-label">Umidità</span>
          <span className="detail-value">{current.relative_humidity_2m}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Vento</span>
          <span className="detail-value">{current.wind_speed_10m} km/h</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Direzione</span>
          <span className="detail-value">{current.wind_direction_10m}°</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Timezone</span>
          <span className="detail-value">{timezone}</span>
        </div>
      </div>
    </article>
  );
}

export default WeatherCard;
