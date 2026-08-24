// History.jsx - Pagina CRONOLOGIA

import { useState } from 'react';
import RecordsTable from '../components/RecordsTable.jsx';
import WeatherDetailsModal from '../components/WeatherDetailsModal.jsx';
import { useWeatherModal } from '../hooks/useWeatherModal.js';
import { clearHistory, getHistory, removeHistoryEntry } from '../services/storage.js';

/**
 * Pagina con la cronologia delle ricerche effettuate dall'utente.
 * @returns {React.JSX.Element} - Componente History.
 */
function History() {
  const [history, setHistory] = useState(() => getHistory().slice().reverse());
  const { modalState, openRecord, closeModal } = useWeatherModal();

  function refresh() {
    setHistory(getHistory().slice().reverse());
  }

  function openHistoryWeather(entry) {
    openRecord(entry);
  }

  function handleDelete(entry) {
    removeHistoryEntry(entry.timestamp);
    closeModal();
    refresh();
  }

  function handleDeleteAll() {
    clearHistory();
    closeModal();
    refresh();
  }

  return (
    <main className="main-content">
      <section className="page-section">
        <div className="search-form">
          <h2>📋 Cronologia Ricerche</h2>
          <p className="section-description">Clicca su una riga per aprire i dettagli nel modale</p>
        </div>
      </section>

      <section className="page-section">
        <div id="history-container" className="result-container">
          <RecordsTable
            records={history}
            emptyMessage="📭 Nessuna ricerca nella cronologia. Vai a Ricerca per cercarne una!"
            columns={[
              {
                header: 'Data',
                render: (entry) => new Date(entry.timestamp).toLocaleString('it-IT'),
              },
              { header: 'Località', render: (entry) => entry.name },
              {
                header: 'Coordinate',
                render: (entry) => `${entry.latitude.toFixed(2)}°, ${entry.longitude.toFixed(2)}°`,
              },
            ]}
            onRowClick={openHistoryWeather}
            onDelete={handleDelete}
            onDeleteAll={handleDeleteAll}
            clearAllLabel="Cancella cronologia"
            deleteLabel="Rimuovi"
          />
        </div>
      </section>

      <WeatherDetailsModal {...modalState} onClose={closeModal} />
    </main>
  );
}

export default History;
