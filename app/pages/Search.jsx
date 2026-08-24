// Search.jsx - Pagina RICERCA

import { useState } from 'react';
import CitySuggestions from '../components/CitySuggestions.jsx';
import DailyForecast from '../components/DailyForecast.jsx';
import FavoriteButton from '../components/FavoriteButton.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import WeatherCard from '../components/WeatherCard.jsx';
import { useCitySuggestions } from '../hooks/useCitySuggestions.js';
import { getCoordinatesByCity, getWeatherByCoordinates } from '../services/api.js';
import { addFavorite, addToHistory, isFavorite } from '../services/storage.js';

/**
 * Pagina di ricerca meteo per città o coordinate, con autocomplete e preferiti.
 * @returns {React.JSX.Element} - Componente Search.
 */
function Search() {
  const [cityQuery, setCityQuery] = useState('');
  const [latitude, setLatitude] = useState('45.4642');
  const [longitude, setLongitude] = useState('9.1900');

  const [status, setStatus] = useState('idle');
  const [errorInfo, setErrorInfo] = useState({ title: '', message: '' });
  const [emptyMessage, setEmptyMessage] = useState('');

  const [weather, setWeather] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [favoriteVisible, setFavoriteVisible] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const suggestions = useCitySuggestions(getCoordinatesByCity);

  async function loadWeather(lat, lon, name = 'Posizione') {
    setFavoriteVisible(false);
    setStatus('loading');

    try {
      const data = await getWeatherByCoordinates(lat, lon);

      setWeather(data);
      setLocationName(name);
      addToHistory(name, lat, lon);
      setIsFav(isFavorite(data.latitude, data.longitude));
      setFavoriteVisible(true);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorInfo({ title: 'Errore nel caricamento del meteo', message: error.message });
    }
  }

  async function searchByCity() {
    const query = cityQuery.trim();

    if (!query) {
      alert('Inserisci il nome di una città');
      return;
    }

    try {
      setStatus('loading');

      const results = await getCoordinatesByCity(query);

      if (results.length === 0) {
        setStatus('empty');
        setEmptyMessage('Città non trovata');
        return;
      }

      const city = results[0];
      await loadWeather(city.latitude, city.longitude, `${city.name}, ${city.country}`);
    } catch (error) {
      setStatus('error');
      setErrorInfo({ title: 'Errore nella ricerca', message: error.message });
    }
  }

  function searchByCoordinates() {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lon)) {
      alert('Inserisci coordinate valide');
      return;
    }

    loadWeather(lat, lon, `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`);
  }

  function handleCitySelect({ name, latitude: lat, longitude: lon }) {
    setCityQuery(name);
    suggestions.reset();
    loadWeather(lat, lon, name);
  }

  function addToFavorites() {
    if (!weather) return;

    const result = addFavorite(locationName, weather.latitude, weather.longitude);

    if (result) {
      alert('✅ Aggiunto ai preferiti!');
      setIsFav(true);
    }
  }

  return (
    <main className="main-content">
      <section className="page-section">
        <div className="search-form">
          <h2>🔍 Ricerca Meteo</h2>

          <div className="form-group">
            <label htmlFor="city-input">Cerca per città:</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="city-input"
                placeholder="Es: Milano, Roma, Napoli..."
                autoComplete="off"
                autoFocus
                value={cityQuery}
                onChange={(event) => {
                  setCityQuery(event.target.value);
                  suggestions.search(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') searchByCity();
                }}
              />
              <button
                id="btn-search-city"
                className="btn btn-primary"
                type="button"
                onClick={searchByCity}
              >
                Cerca
              </button>
            </div>
            <CitySuggestions
              items={suggestions.items}
              loading={suggestions.loading}
              error={suggestions.error}
              onSelect={handleCitySelect}
            />
          </div>

          <div className="divider">O</div>

          <div className="form-group">
            <label>Ricerca per coordinate:</label>
            <div className="coords-group">
              <input
                type="number"
                id="latitude-input"
                placeholder="Latitudine"
                step="0.01"
                min="-90"
                max="90"
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
              />
              <input
                type="number"
                id="longitude-input"
                placeholder="Longitudine"
                step="0.01"
                min="-180"
                max="180"
                value={longitude}
                onChange={(event) => setLongitude(event.target.value)}
              />
              <button
                id="btn-search-coords"
                className="btn btn-primary"
                type="button"
                onClick={searchByCoordinates}
              >
                Cerca
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section result-section-with-favorite">
        <div id="result-container" className="result-container">
          <StatusMessage
            status={status === 'success' ? 'idle' : status}
            errorTitle={errorInfo.title}
            errorMessage={errorInfo.message}
            emptyMessage={emptyMessage}
          />
          {status === 'success' && weather && (
            <WeatherCard
              weather={weather}
              locationName={locationName}
              compact
              favoriteSlot={
                <FavoriteButton
                  visible={favoriteVisible}
                  isFavorite={isFav}
                  onClick={addToFavorites}
                />
              }
            />
          )}
        </div>
      </section>

      <section className="page-section location-forecast">
        <div id="forecast-container" className="forecast-container">
          {status === 'success' && weather && (
            <DailyForecast weather={weather} compact title="📅 Previsioni" />
          )}
        </div>
      </section>
    </main>
  );
}

export default Search;
