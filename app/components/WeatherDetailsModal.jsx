// WeatherDetailsModal.jsx - Modale condivisa per i dettagli meteo

import { useEffect } from 'react';
import DailyForecast from './DailyForecast.jsx';
import WeatherCard from './WeatherCard.jsx';

/**
 * Modale con i dettagli meteo di un record (voce di cronologia o preferito).
 *
 * @param {Object} props
 * @param {boolean} props.open - Se true, la modale è visibile
 * @param {string} props.title - Titolo (nome della località)
 * @param {string} props.subtitle - Sottotitolo (coordinate)
 * @param {Object|null} props.weather - Dati meteo caricati, oppure null
 * @param {boolean} props.loading - True mentre il meteo è in caricamento
 * @param {string|null} props.error - Messaggio di errore, oppure null
 * @param {Function} props.onClose - Callback per chiudere la modale
 * @returns {React.JSX.Element|null} - Componente WeatherDetailsModal.
 */
function WeatherDetailsModal({ open, title, subtitle, weather, loading, error, onClose }) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="weather-modal-overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="weather-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="weather-modal-title"
      >
        <div className="weather-modal-header">
          <div>
            <p className="weather-modal-kicker">Dettagli meteo</p>
            <h2 id="weather-modal-title">{title}</h2>
            <p className="weather-modal-subtitle">{subtitle}</p>
          </div>
          <button
            type="button"
            className="weather-modal-close"
            aria-label="Chiudi modale"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="weather-modal-body">
          <div className="weather-modal-weather">
            {loading && <div className="loading">⏳ Caricamento dettagli...</div>}
            {!loading && error && (
              <div className="error">
                <strong>❌ Errore nel caricamento del meteo</strong>
                <p>{error}</p>
              </div>
            )}
            {!loading && !error && weather && (
              <WeatherCard weather={weather} locationName={title} compact />
            )}
          </div>
          <div className="weather-modal-forecast">
            {!loading && !error && weather && <DailyForecast weather={weather} compact />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetailsModal;
