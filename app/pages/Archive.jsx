// Archive.jsx - Pagina ARCHIVIO (meteo passato)

import { useEffect, useState } from 'react';
import CitySuggestions from '../components/CitySuggestions.jsx';
import StatusMessage from '../components/StatusMessage.jsx';
import { useCitySuggestions } from '../hooks/useCitySuggestions.js';
import { getCoordinatesByCity, getHistoricalWeatherByCoordinates } from '../services/api.js';
import { getWeatherDescription, getWeatherEmoji } from '../services/weatherCodes.js';

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function ArchiveTable({ city, data }) {
  const { daily } = data;

  return (
    <article className="archive-card">
      <div className="archive-card-header">
        <h3>Storico meteo: {city.name}</h3>
        <p>
          Coordinate: {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
        </p>
      </div>
      <div className="archive-table-wrapper">
        <table className="archive-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Condizione</th>
              <th>Max</th>
              <th>Min</th>
              <th>Pioggia</th>
            </tr>
          </thead>
          <tbody>
            {daily.time.map((date, index) => (
              <tr key={date}>
                <td>{new Date(date).toLocaleDateString('it-IT')}</td>
                <td>
                  {getWeatherEmoji(daily.weather_code[index])}{' '}
                  {getWeatherDescription(daily.weather_code[index])}
                </td>
                <td>{daily.temperature_2m_max[index]}°C</td>
                <td>{daily.temperature_2m_min[index]}°C</td>
                <td>{daily.precipitation_sum[index]} mm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

/**
 * Pagina di consultazione dei dati meteo storici per una città e un intervallo di date.
 * @returns {React.JSX.Element} - Componente Archive.
 */
function Archive() {
  const [cityQuery, setCityQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [status, setStatus] = useState('idle');
  const [errorInfo, setErrorInfo] = useState({ title: '', message: '' });
  const [emptyMessage, setEmptyMessage] = useState('');
  const [archiveResult, setArchiveResult] = useState(null);

  const suggestions = useCitySuggestions(getCoordinatesByCity);

  useEffect(() => {
    const sevenDaysAsMilliseconds = 7 * 24 * 60 * 60 * 1000;

    const today = new Date('05/04/2025');
    const lastWeek = new Date(today.valueOf() - sevenDaysAsMilliseconds);

    setEndDate(formatDate(today));
    setStartDate(formatDate(lastWeek));
  }, []);

  function handleCitySelect({ name, latitude, longitude }) {
    setSelectedCity({ name, latitude, longitude });
    setCityQuery(name);
    suggestions.reset();
  }

  async function searchArchive() {
    const rawCity = cityQuery.trim();

    if (!rawCity) {
      alert('Inserisci una citta');
      return;
    }

    if (!startDate || !endDate) {
      alert('Seleziona sia la data iniziale che quella finale');
      return;
    }

    if (startDate > endDate) {
      alert('La data iniziale deve essere precedente alla data finale');
      return;
    }

    setStatus('loading');

    try {
      let city = selectedCity;

      if (!city) {
        const candidates = await getCoordinatesByCity(rawCity);

        if (!candidates.length) {
          setStatus('empty');
          setEmptyMessage('Nessuna citta trovata');
          return;
        }

        const first = candidates[0];
        city = {
          name: `${first.name}, ${first.country}`,
          latitude: first.latitude,
          longitude: first.longitude,
        };
        setSelectedCity(city);
        setCityQuery(city.name);
      }

      const data = await getHistoricalWeatherByCoordinates(
        city.latitude,
        city.longitude,
        startDate,
        endDate
      );

      if (!data.daily || !data.daily.time || data.daily.time.length === 0) {
        setStatus('empty');
        setEmptyMessage('Nessun dato storico disponibile per il periodo selezionato.');
        return;
      }

      setArchiveResult({ city, data });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorInfo({ title: 'Errore nel caricamento archivio', message: error.message });
    }
  }

  return (
    <main className="main-content">
      <section className="page-section">
        <div className="search-form">
          <h2>🗂️ Archivio Meteo</h2>
          <p className="section-description">
            Seleziona una citta e un intervallo di date per vedere il meteo passato.
          </p>

          <div className="form-group">
            <label htmlFor="archive-city-input">Citta:</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="archive-city-input"
                placeholder="Es: Torino, Firenze, Bari..."
                autoComplete="off"
                autoFocus
                value={cityQuery}
                onChange={(event) => {
                  setCityQuery(event.target.value);
                  setSelectedCity(null);
                  suggestions.search(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') searchArchive();
                }}
              />
              <button
                id="btn-archive-search"
                className="btn btn-primary"
                type="button"
                onClick={searchArchive}
              >
                Cerca storico
              </button>
            </div>
            <CitySuggestions
              items={suggestions.items}
              loading={suggestions.loading}
              error={suggestions.error}
              onSelect={handleCitySelect}
            />
          </div>

          <div className="form-group archive-date-grid">
            <div>
              <label htmlFor="archive-start-date">Data inizio:</label>
              <input
                type="date"
                id="archive-start-date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="archive-end-date">Data fine:</label>
              <input
                type="date"
                id="archive-end-date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div id="archive-result-container" className="result-container">
          <StatusMessage
            status={status === 'success' ? 'idle' : status}
            loadingMessage="Caricamento archivio meteo..."
            errorTitle={errorInfo.title}
            errorMessage={errorInfo.message}
            emptyMessage={emptyMessage}
          />
          {status === 'success' && archiveResult && (
            <ArchiveTable city={archiveResult.city} data={archiveResult.data} />
          )}
        </div>
      </section>
    </main>
  );
}

export default Archive;
